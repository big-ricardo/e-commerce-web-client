import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      deps: {
        inline: ["vitest-canvas-mock"],
      },
      environmentOptions: {
        jsdom: {
          resources: "usable",
        },
      },
      setupFiles: ["./src/test/setupTests.ts"],
      include: ["**/*(*.)?{test,spec}.{ts,tsx}"],
      exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    },
  }),
);
