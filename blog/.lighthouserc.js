module.exports = {
  ci: {
    collect: {
      // 서버 준비 대기 시간 증가
      startServerReadyTimeout: 60000,
      // Next.js 서버 준비 메시지 패턴
      startServerReadyPattern: "- ready started server on",
      startServerCommand: "npm run start",
      url: ["http://localhost:3000"]
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%"
    }
  }
};
