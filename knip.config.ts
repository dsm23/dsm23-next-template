import type { KnipConfig } from "knip";

const config: KnipConfig = {
  tags: ["-knipignore"],
  entry: ["src/**/*.d.ts"],
  ignoreDependencies: [
    "import-in-the-middle",
    "require-in-the-middle",
    "eslint-plugin-storybook",
    "eslint-plugin-better-tailwindcss",
    // TODO: update this after implementing semantic-release propertly
    // https://github.com/webpro-nl/knip/blob/main/packages/knip/src/plugins/semantic-release/index.ts
    "@semantic-release/commit-analyzer",
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/release-notes-generator",
  ],
  oxlint: {
    config: ["oxlint.config.ts"],
  },
  playwright: {
    config: ["playwright.config.ts", "playwright.prod.config.ts"],
    entry: ["**/playwright-tests/*.@(spec|test).?(c|m)[jt]s?(x)"],
  },
  "semantic-release": {
    config: ["package.json", ".releaserc"],
  },
};

export default config;
