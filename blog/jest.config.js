// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@backend/(.*)$": "<rootDir>/backend/$1",
    "^@fp/(.*)$": "<rootDir>/fp/$1"
  }
};
