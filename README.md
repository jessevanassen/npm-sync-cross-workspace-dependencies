# @jessevanassen/sync-cross-workspace-dependencies

When you execute `npm run --workspaces version $newVersion`, NPM updates the package versions in the workspaces, but doesn't fix the `dependencies` / `devDependencies` / `peerDependencies` between the workspaces.

This script syncs those dependencies.
