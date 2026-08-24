'use client';

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [bgMode, setBgMode] = useState("realistic");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleBgMode = () => {
    setBgMode((prev) => (prev === "realistic" ? "animated" : "realistic"));
  };

  // Restore saved theme after mount
  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") setMode(saved);
    const savedBg = window.localStorage.getItem("bgMode");
    if (savedBg === "realistic" || savedBg === "animated") setBgMode(savedBg);
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

  // Persist bgMode
  useEffect(() => {
    window.localStorage.setItem("bgMode", bgMode);
  }, [bgMode]);

  return (
    <ThemeContext.Provider value={{ toggle, mode, toggleBgMode, bgMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
