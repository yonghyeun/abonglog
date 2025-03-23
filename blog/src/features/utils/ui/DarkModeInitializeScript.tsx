export const DarkModeInitializeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        const localStorageSavedTheme = localStorage.getItem("abonglog-theme");
        const userPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      
        const isDarkMode = localStorageSavedTheme === "dark" || userPrefersDark;
      
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        }
      `
      }}
    />
  );
};
