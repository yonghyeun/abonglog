module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "npm run start",
      startServerReadyTimeout: 60000,
      numberOfRuns: 3
    },
    upload: {
      target: "filesystem",
      outputDir: "lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%"
    }
  }
};
