{
  pkgs,
  bun2nixPackage,
  pre-commit-check,
  cvSvg,
  cvPdf,
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

    mkdir -p src/cv-pages
    rm -f src/cv-pages/*.svg
    cp -fL ${cvSvg}/*.svg src/cv-pages/
    cp -fL ${cvPdf}/resume.pdf static/cv.pdf
  '';
}
