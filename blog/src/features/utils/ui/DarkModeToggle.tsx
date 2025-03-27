"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 다크모드 여부는 html이 파싱되는 동안 DarkModeInitializeScript에서 설정되므로
    // document.classList에 dark 클래스가 있는지 확인하면 된다.
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("abonglog-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <button onClick={toggleDarkMode} className="text-secondary">
      {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
};
