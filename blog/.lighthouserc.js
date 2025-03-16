module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],

      // 서버 시작 명령어 수정
      startServerCommand: "NODE_ENV=production npm run start",

      // 서버 준비 감지 설정
      startServerReadyPattern: "✓ Ready in",
      startServerReadyTimeout: 120000, // 타임아웃 증가

      // 테스트 실행 횟수
      numberOfRuns: 1,
      port: 3000, // 포트 명시적 지정

      // Chrome 설정
      chromeFlags: [
        "--no-sandbox",
        "--disable-gpu",
        "--headless", // 헤드리스 모드 추가
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
