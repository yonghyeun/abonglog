module.exports = {
  ci: {
    collect: {
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
