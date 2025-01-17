/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/Test_/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
};