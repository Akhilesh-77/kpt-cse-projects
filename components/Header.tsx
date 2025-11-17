import React from 'react';
import { Theme } from '../types';
import ActionMenu from './ActionMenu';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
    currentTheme: Theme;
    setTheme: (theme: Theme) => void;
    isAdmin: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onExportClick: () => void;
    onImportClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, setTheme, isAdmin, onLoginClick, onLogoutClick, onExportClick, onImportClick }) => {
    return (
        <header className="sticky top-0 bg-[var(--bg-secondary)]/80 backdrop-blur-sm p-4 md:p-6 shadow-lg z-40">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4 group cursor-pointer">
                    <img 
                        src="https://gpt.karnataka.gov.in/kptmangalore/public/uploads/dept_logo1755926888.jpg" 
                        alt="KPT Logo" 
                        className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:rotate-6"
                    />
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] transition-transform duration-300 group-hover:scale-105">
                        KPT Computer Science & Engineering
                        <span className="block text-lg md:text-xl font-normal text-[var(--text-secondary)] mt-1">CS Projects & Events Showcase</span>
                    </h1>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
                    <ActionMenu 
                        isAdmin={isAdmin}
                        onLoginClick={onLoginClick}
                        onLogoutClick={onLogoutClick}
                        onExportClick={onExportClick}
                        onImportClick={onImportClick}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;