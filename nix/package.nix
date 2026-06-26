{
  bun2nix,
  gitignoreSource,
  cvSvg,
  cvPdf,
}:
bun2nix.mkDerivation {
  packageJson = ../package.json;
  src = gitignoreSource ../.;
  name = "portfolio-website";

  buildPhase = ''
    mkdir -p src/cv-pages
    cp ${cvSvg}/*.svg src/cv-pages/
    cp ${cvPdf}/resume.pdf static/cv.pdf
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
