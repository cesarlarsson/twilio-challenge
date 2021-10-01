module.exports = {
  projects: [
    {
      displayName: "backend",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/**/*.test.js"],
      setupFilesAfterEnv: ["<rootDir>/testUtils/setupTests.js"]
    }
  ]
};
