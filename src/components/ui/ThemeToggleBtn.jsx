import { useEffect, useState } from "react";

export default function ThemeToggleBtn() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const root = document.getElementById("app-root");
      return root && root.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const root = document.getElementById("app-root");
    if (!root) return;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (!saved) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
    } else {
      setIsDark(saved === "dark");
    }
  }, []);

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-2 p-2 rounded-full border border-accent bg-base-100 hover:bg-accent transition-colors text-xl focus:outline-none focus:ring-2 focus:ring-accent"
      onClick={() => setIsDark((d) => !d)}
      type="button"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      )}
    </button>
  );
}
