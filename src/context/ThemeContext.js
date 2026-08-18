'use client';

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Restore saved theme after mount
  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") setMode(saved);
  }, []);

  // Update HTML tag class when mode changes and persist it
  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    window.localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};
