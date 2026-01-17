{
  preCommitHooks,
  gitignoreSource,
}:
preCommitHooks.run {
  src = gitignoreSource ../.;

  hooks = {
    nixfmt.enable = true;

    biome = {
      enable = true;
      files = "^src/";
      pass_filenames = true;
    };
  };
}
