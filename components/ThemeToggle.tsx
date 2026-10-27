"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { THEME_KEY } from "@/lib/theme";


type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    // Switch every color at once instead of letting some elements fade and others snap
    root.classList.add("theme-switching");
    if (next === "dark") root.dataset.theme = "dark";
    else delete root.dataset.theme;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    setTheme(next);
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-raised text-fg transition-colors duration-300 ease-brand hover:bg-hover active:scale-[0.98]"
    >
      <Sun
        size={20}
        weight="bold"
        aria-hidden
        className={`absolute transition-[translate,rotate,opacity] duration-500 ease-brand ${
          dark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-6 rotate-90 opacity-0"
        }`}
      />
      <Moon
        size={20}
        weight="bold"
        aria-hidden
        className={`absolute transition-[translate,rotate,opacity] duration-500 ease-brand ${
          dark ? "-translate-y-6 -rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
        }`}
      />
    </button>
  );
}
