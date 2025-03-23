"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem("abonglog-theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("abonglog-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <button onClick={toggleDarkMode} className="text-secondary">
      {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
};
