module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      // 빌드 후 서버 시작 명령어 수정
      startServerCommand: "npm run start",
      // Next.js 실제 출력 메시지와 일치하도록 수정
      startServerReadyPattern: "✓ Ready in",
      startServerReadyTimeout: 60000,
      numberOfRuns: 1,

      // Chrome 플래그 최적화
      chromeFlags: [
        "--no-sandbox",
        "--disable-gpu",
        "--ignore-certificate-errors",
        "--allow-insecure-localhost"
      ],

      settings: {
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo"
        ],
        skipAudits: [
          "redirects-http",
          "uses-http2",
          "uses-long-cache-ttl",
          "is-on-https"
        ],
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        }
      }
    },

    upload: {
      target: "filesystem",
      outputDir: "lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%"
    },
    assert: {
      // 검사 기준 완화
      preset: "lighthouse:no-pwa",
      assertions: {
        "csp-xss": "off",
        "uses-http2": "off",
        canonical: "off",
        "is-on-https": "off"
      }
    }
  }
};
