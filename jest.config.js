const nextJest = require("next/jest");
const dotenv = require("dotenv");

// Carregar o arquivo .env.development
dotenv.config({ path: ".env.development" });
const createJestConfig = nextJest({
  path: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
