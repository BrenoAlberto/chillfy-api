const sonarqubeScanner = require("sonarqube-scanner");
require("dotenv").config();

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_SERVER_URL,
    options: {
      "sonar.sources": ".",
      "sonar.exclusions": "tests/**, node_modules/**, coverage/**",
      "sonar.test.inclusions": "test/**",
      "sonar.tests": "./tests",
      "sonar.coverage.exclusions": "test/**, models/**",
    },
  },
  () => {}
);
