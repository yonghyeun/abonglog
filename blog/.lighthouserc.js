module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "npm run start",
      startServerReadyPattern: "ready on",
      startServerReadyTimeout: 60000,
      numberOfRuns: 3
    },

    // TLS 인증서 오류를 무시하기 위한 Chrome 플래그 설정

    chromeFlags: [
      "--no-sandbox",
      "--ignore-certificate-errors",
      "--allow-insecure-localhost",
      "--disable-gpu"
    ],

    // TLS 인증서 오류를 무시하기 위한 Lighthouse 설정

    settings: {
      skipAudits: [
        "is-on-https",
        "redirects-http",
        "uses-http2",
        "uses-long-cache-ttl"
      ]
    },
    upload: {
      target: "filesystem",
      outputDir: "lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%"
    }
  }
};
