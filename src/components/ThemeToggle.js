import { useState, useEffect } from 'react';
import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';

function getTheme() {
  if (localStorage.getItem('theme')) return localStorage.getItem('theme');
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  function handleClickThemeToggle() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  document.documentElement.className = theme === 'dark' ? 'dark' : '';

  return (
    <button
      className="theme-toggle"
      onClick={handleClickThemeToggle}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <img src={sunIcon} alt="Sun Icon" />
      ) : (
        <img src={moonIcon} alt="Moon Icon" />
      )}
    </button>
  );
}

export default ThemeToggle;
