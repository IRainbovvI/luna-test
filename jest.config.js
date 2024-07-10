module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@bundled-es-modules/statuses|@bundled-es-modules/cookie|axios)/)",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
