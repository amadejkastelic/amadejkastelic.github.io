{
  pkgs,
  bun2nixPackage,
  pre-commit-check,
}:
pkgs.mkShell {
  packages = with pkgs; [
    bun
    bun2nixPackage
    typescript
    biome
    pre-commit
    svelte-language-server
    svelte-check
  ];

  shellHook = ''
    ${pre-commit-check.shellHook}
  '';
}
