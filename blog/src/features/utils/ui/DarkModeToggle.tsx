"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("abonglog-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <button onClick={toggleDarkMode} className="text-secondary">
      {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
};
