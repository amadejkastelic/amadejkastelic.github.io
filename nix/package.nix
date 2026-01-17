{
  bun2nix,
  gitignoreSource,
}:
bun2nix.mkDerivation {
  packageJson = ../package.json;
  src = gitignoreSource ../.;
  name = "portfolio-website";

  buildPhase = ''
    bun run build
  '';

  installPhase = ''
    cp -r build $out

    if [ -f CNAME ]; then
      cp CNAME $out/
    fi
  '';

  bunDeps = bun2nix.fetchBunDeps {
    bunNix = ./bun.nix;
  };
}
