// FIX: Add React import to resolve JSX namespace.
import React from 'react';
import { Theme } from '../App';

interface ThemeSwitcherProps {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
}

const SunIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
);

const MoonIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>
);

const SparklesIcon = () => (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M4 17v4M2 19h4M10 3v4M8 5h4M9 17v4M7 19h4m5-16v4m-2-2h4m-1 12v4m-3-2h4M19 5h4M17 3v4m-2 12h4m-4 2v-4"></path>
    </svg>
);

const themes: { name: Theme; icon: JSX.Element }[] = [
    { name: 'black', icon: <MoonIcon /> },
    { name: 'white', icon: <SunIcon /> },
    { name: 'pink', icon: <SparklesIcon /> },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
    const cycleTheme = () => {
        const currentIndex = themes.findIndex(t => t.name === currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex].name);
    };

    const currentIcon = themes.find(t => t.name === currentTheme)?.icon || <SunIcon />;

    return (
        <button
            onClick={cycleTheme}
            className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Switch theme"
        >
            {currentIcon}
        </button>
    );
};

export default ThemeSwitcher;