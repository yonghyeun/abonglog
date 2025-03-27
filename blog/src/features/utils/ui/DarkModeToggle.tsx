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

    // 컨텍스트를 유지 할 수 있도록 안젆게 nextIsDarkMode를 사용한다.
    const nextIsDarkMode = !isDarkMode;
    localStorage.setItem("abonglog-theme", nextIsDarkMode ? "dark" : "light");
  };

  return (
    <button onClick={toggleDarkMode} className="text-secondary">
      {isDarkMode ? <FaMoon size={18} /> : <FaSun size={18} />}
    </button>
  );
};
