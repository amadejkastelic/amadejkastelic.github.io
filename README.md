# Personal Website

[![Deploy](https://img.shields.io/github/actions/workflow/status/amadejkastelic/amadejkastelic.github.io/checks.yml?branch=main)](https://github.com/amadejkastelic/amadejkastelic.github.io/actions/workflows/checks.yml)

**Website**: https://amadejk.com

Personal portfolio website built with SvelteKit, Bun, and Nix.

## Tech Stack

- **Framework**: SvelteKit 2
- **Language**: TypeScript
- **Runtime**: Bun
- **Package Management**: Bun
- **Build Tool**: Vite
- **Deployment**: Nix + GitHub Pages
- **Styling**: Catppuccin Palette, Flowbite + Flowbite Svelte
- **Linting/Formatting**: Biome

## Getting Started

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled
- [Bun](https://bun.sh/) (optional, Nix provides a dev shell)

### Development

#### Using Nix (Recommended)

```bash
# Enter the development environment
nix develop

# Start development server
bun run dev
```

#### Without Nix

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## Available Scripts

| Script                | Description                         |
| --------------------- | ----------------------------------- |
| `bun run dev`         | Start development server            |
| `bun run build`       | Build for production                |
| `bun run preview`     | Preview production build            |
| `bun run check`       | Run type checking with svelte-check |
| `bun run check:watch` | Watch mode for type checking        |
| `bun run format`      | Format code with Biome              |
| `bun run lint`        | Lint code with Biome                |

## Building with Nix

```bash
# Build the website
nix build

# Result will be in ./result

# Preview the built site
nix run .#serve

# Or without cloning
nix run github:amadejkastelic/amadejkastelic.github.io#serve
```

## Deployment

The website is automatically deployed to GitHub Pages via GitHub Actions:

1. **Checks workflow** (`.github/workflows/checks.yml`) runs `nix flake check` on PRs and pushes
2. **Deploy workflow** (`.github/workflows/deploy.yml`) builds and deploys on main branch after checks pass
3. **Nix workflow** (`.github/workflows/nix.yml`) reusable workflow for Nix commands with caching

## License

MIT
