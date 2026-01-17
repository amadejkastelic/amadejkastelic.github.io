{
  description = "Personal website - SvelteKit static site with Bun";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";

    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    bun2nix = {
      url = "github:nix-community/bun2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-substituters = [
      "https://cache.nixos.org"
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      gitignore,
      bun2nix,
      git-hooks,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        pkgsWithOverlay = import nixpkgs {
          inherit system;
          overlays = [ bun2nix.overlays.default ];
        };

        gitignoreSource = gitignore.lib.gitignoreSource;
      in
      {
        checks = {
          pre-commit-check = import ./nix/pre-commit.nix {
            inherit gitignoreSource;
            preCommitHooks = git-hooks.lib.${system};
          };
        };

        packages = rec {
          website = pkgsWithOverlay.callPackage ./nix/package.nix {
            inherit gitignoreSource;
          };

          default = website;

          serve = pkgs.writeShellApplication {
            name = "serve-website";

            runtimeInputs = [
              pkgs.static-web-server
              website
            ];

            text = ''
              PORT="''${1:-8080}"
              static-web-server --root ${website} --port "$PORT" --host 0.0.0.0
            '';
          };
        };

        apps = rec {
          serve = {
            type = "app";
            program = "${self.packages.${system}.serve}/bin/serve-website";
          };

          default = serve;
        };

        devShells = {
          default = import ./nix/shell.nix {
            inherit pkgs;
            bun2nixPackage = bun2nix.packages.${system}.default;
            pre-commit-check = self.checks.${system}.pre-commit-check;
          };
        };
      }
    );
}
