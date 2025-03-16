module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "NODE_ENV=production npm run start",
      startServerReadyPattern: "/ready - started server on/i",
      startServerReadyTimeout: 60000,
      numberOfRuns: 3,

      // TLS 인증서 오류를 무시하기 위한 Chrome 플래그 설정

      chromeFlags: [
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--ignore-certificate-errors",
        "--allow-insecure-localhost",
        "--disable-web-security", // 웹 보안 비활성화
        "--disable-features=IsolateOrigins,site-per-process" // 크로스 오리진 격리 비활성화
      ],

      // TLS 인증서 오류를 무시하기 위한 Lighthouse 설정

      settings: {
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo"
        ]
      }
    },

    upload: {
      target: "filesystem",
      outputDir: "lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%"
    }
  }
};
