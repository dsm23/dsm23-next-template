import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  coverageConfigDefaults,
  defaultExclude,
  defineConfig,
} from "vitest/config";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: false,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    exclude: [...defaultExclude, "**/e2e/**"],
    coverage: {
      include: ["src/**/*.[jt]s?(x)"],
      exclude: [
        "src/**/*.stories.[jt]s?(x)",
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        lines: 10,
        functions: 10,
        branches: 10,
        statements: 10,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
          exclude: [...defaultExclude, "**/e2e/**"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(import.meta.dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
