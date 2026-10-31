---
title: "Upgrading PostgreSQL 15 to 18 on NixOS"
description: "The config change is one line. The data directory is the other ninety percent: an obsolete pgvecto.rs extension, glibc collation drift, and pg_upgrade run by hand."
date: "2026-10-31"
tags: ["nix", "nixos", "postgresql", "homelab"]
---

The declarative part of upgrading PostgreSQL on NixOS is one line:

```nix
services.postgresql.package = pkgs.postgresql_18;
```

That's the whole [commit](https://github.com/amadejkastelic/infra/commit/70612e98546b73ee03a3a3dbab25bf2b2bda1b23). The other ninety percent is the data. PostgreSQL refuses to open a data directory from a different major version, and no amount of Nix will migrate it for you — that's still `pg_upgrade`, run by hand, old cluster against new.

The official [`pg_upgrade` documentation](https://www.postgresql.org/docs/current/pgupgrade.html) describes the general procedure; this is an account of what it looked like on my box, which runs Immich (on pgvector and VectorChord), Jellyseerr, and Forgejo against PostgreSQL 15.19.

## The ingredients

NixOS keeps every PostgreSQL major side by side in the store, and `nix-build` produces either of them on demand. My databases use pgvector and VectorChord, so both versions go through `.withPackages` — the extensions must be baked in, because `pg_upgrade` loads every extension library in every database it touches:

```bash
PG_15=$(nix-build --no-out-link -E "with import <nixpkgs> {}; postgresgresql_15.withPackages (p: [ p.pgvector p.vectorchord ])")
PG_18=$(nix-build --no-out-link -E "with import <nixpkgs> {}; postgresgresql_18.withPackages (p: [ p.pgvector p.vectorchord ])")
```

That leaves `PG_15` and `PG_18` pointing at two store paths ending in `postgresql-and-plugins-15.19` and `postgresql-and-plugins-18.6`. And it's exactly where the first problem showed up.

## The ghost of pgvecto.rs

The first `pg_upgrade --check` died like this:

```text
could not load library "$libdir/vectors":
ERROR:  could not access file "$libdir/vectors": No such file or directory
In database: immich
```

Immich used pgvecto.rs once; these days it's on pgvector plus VectorChord, but the old `vectors` extension was still registered in the database. My PostgreSQL 18 package ships `vector.so` and `vchord.so` and will never ship `vectors.so` — and copying an old extension binary into a new major version's libdir is not a thing you do. The extension had to go.

Before dropping it, I made PostgreSQL prove nothing depended on it, inside a transaction I threw away:

```sql
BEGIN;
DROP EXTENSION vectors RESTRICT;
ROLLBACK;
```

`RESTRICT` fails loudly if anything still uses the extension; the `ROLLBACK` guarantees the test leaves no trace. It passed — Immich's embedding columns are `public.vector` and its `face_index`/`clip_index` use the `vchordrq` access method — so then for real:

```sql
DROP EXTENSION vectors RESTRICT;
DROP SCHEMA vectors RESTRICT;
ALTER DATABASE immich SET search_path TO "$user", public;
```

That last setting only applies to new sessions, so reconnect before running `SHOW search_path` and concluding it didn't take.

## Collation drift

Along the way PostgreSQL mentioned that several databases were created with collation version 2.42 while the system now provides 2.44 — glibc had been upgraded underneath it at some point. Refreshing the recorded version alone would be a lie: locale-sensitive indexes may still be sorted by the old rules. So per database, in that order:

```sql
REINDEX DATABASE immich;
ALTER DATABASE immich REFRESH COLLATION VERSION;
```

For `template1`, connect to `postgres` first. The cluster had opinions about `immich`, `jellyseerr`, `forgejo`, and `template1`; check yours instead of guessing.

## The upgrade

The new cluster doesn't exist yet, so create it — with checksums off, because the old cluster never had them and `pg_upgrade` requires the two to agree:

```bash
"$PG_18/bin/initdb" -D /var/lib/postgresql/18 --username=postgres --encoding=UTF8 --no-data-checksums
```

Then the check, with the old server still running on 5432 and the would-be new one on 5433:

```bash
"$PG_18/bin/pg_upgrade" --check \
  --old-bindir="$PG_15/bin" --new-bindir="$PG_18/bin" \
  --old-datadir=/var/lib/postgresql/15 --new-datadir=/var/lib/postgresql/18 \
  --username=postgres --old-port=5432 --new-port=5433 \
  --old-options="-c shared_preload_libraries=vchord.so" \
  --new-options="-c shared_preload_libraries=vchord.so"
```

`*Clusters are compatible*` — the go-ahead. Take a backup you can actually restore, and check you have room for a second copy of the cluster:

```bash
"$PG_15/bin/pg_dumpall" | zstd -T0 > /mnt/nas-backups/postgresql/all.pre-pg18.sql.zstd
zstd -t /mnt/nas-backups/postgresql/all.pre-pg18.sql.zstd
du -sh /var/lib/postgresql/15; df -h /var/lib/postgresql
```

Cutover: stop `postgresql.service`, make sure `/var/run/postgresql` exists and belongs to `postgres`, and run the same command minus `--check` — spelled out here so nobody has to scroll up:

```bash
"$PG_18/bin/pg_upgrade" \
  --old-bindir="$PG_15/bin" --new-bindir="$PG_18/bin" \
  --old-datadir=/var/lib/postgresql/15 --new-datadir=/var/lib/postgresql/18 \
  --username=postgres --old-port=5432 --new-port=5433 \
  --old-options="-c shared_preload_libraries=vchord.so" \
  --new-options="-c shared_preload_libraries=vchord.so"
```

Then `nixos-rebuild switch` and confirm:

```bash
psql -d postgres -c 'SELECT version();'
```

## Aftermath

`pg_upgrade` leaves two scripts in `/var/lib/postgresql`: `update_extensions.sql` (review it, then run it — mine bumped the retained extensions) and `delete_old_cluster.sh` (don't. Not until the new cluster has earned trust and the backup has been restored at least once in anger).

Total downtime: however long the copy takes. The git diff is still one line.
