import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" = relative asset paths, so the site works on GitHub Pages
// whatever the repository is called (username.github.io/any-repo-name/).
export default defineConfig({ base: "./", plugins: [react()] });
