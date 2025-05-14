import { useState, useEffect } from 'react';
import { IoSunnySharp } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';

const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const DarkModeBtn = () => {
  const [isDark, setIsDark] = useState(false);

   useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === THEME_DARK) {
      setIsDark(true);
    } else if (storedTheme === THEME_LIGHT) {
      setIsDark(false);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemPrefersDark);
      localStorage.setItem('theme', systemPrefersDark ? THEME_DARK : THEME_LIGHT);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_DARK, isDark);
    localStorage.setItem('theme', isDark ? THEME_DARK : THEME_LIGHT);
  }, [isDark]);

  const handleSwitch = () => setIsDark(prev => !prev);

  return (
    <button
      onClick={handleSwitch}
      aria-label="Toggle dark mode"
      role="switch"
      aria-checked={isDark}
      className="relative cursor-pointer outline-none"
    >
      <div
        className={`h-6 w-12 flex items-center rounded-full border-2 transition-all shadow-inner
          ${isDark ? 'bg-gray-500 border-gray-500 opacity-90' : 'bg-gray-200 border-white-200'}`}
      >
        {isDark ? (
          <IoSunnySharp className="ml-1 text-white" />
        ) : (
          <MdDarkMode className="ml-5 w-full text-gray-800" />
        )}
      </div>
      <div
        className={`absolute top-0 h-6 w-6 rounded-full border-2 bg-white transition-all
          ${isDark ? 'left-6 border-gray-800 opacity-50' : 'left-0 border-gray-600'}`}
      />
    </button>
  );
};

export default DarkModeBtn;
