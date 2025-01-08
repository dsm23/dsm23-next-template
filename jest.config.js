import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
const customJestConfig = {
  collectCoverageFrom: [
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  coveragePathIgnorePatterns: [".next/", "dist/", "node_modules/", "stories/"],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

const config = createJestConfig(customJestConfig);

export default config;
