const sonarqubeScanner = require("sonarqube-scanner");
require("dotenv").config();

sonarqubeScanner(
  {
    serverUrl: process.env.SONAR_SERVER_URL,
    options: {
      "sonar.sources": ".",
      "sonar.exclusions": "node_modules/**",
    },
  },
  () => {}
);
