// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  maxWorkers: "50%",
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/coverage/",
    "<rootDir>/docs/",
    "<rootDir>/public/"
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/coverage/",
    "<rootDir>/docs/",
    "<rootDir>/public/"
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/coverage/",
    "<rootDir>/docs/",
    "<rootDir>/public/"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@backend/(.*)$": "<rootDir>/backend/$1",
    "^@fp/(.*)$": "<rootDir>/fp/$1"
  }
};
