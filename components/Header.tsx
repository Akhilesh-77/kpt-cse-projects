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
    onQRCodeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, setTheme, isAdmin, onLoginClick, onLogoutClick, onExportClick, onImportClick, onQRCodeClick }) => {
    return (
        <header className="sticky top-0 bg-[var(--bg-secondary)]/80 backdrop-blur-sm p-4 md:p-6 shadow-lg z-40 app-header">
            <div className="container mx-auto flex items-center justify-between">
                <div id="header-title" className="flex items-center space-x-4 group cursor-pointer">
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
                    {/* Visit CSE Website Button (Desktop) */}
                    <a
                        id="btn-visit-csc-desktop"
                        href="https://gpt.karnataka.gov.in/kptmangalore/public/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center px-4 py-1.5 border border-[var(--accent)] text-[var(--accent)] rounded-lg text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                        Visit CSE Website
                    </a>
                    
                    {/* Visit CSE Website Icon (Mobile) */}
                    <a
                        id="btn-visit-csc-mobile"
                        href="https://gpt.karnataka.gov.in/kptmangalore/public/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:hidden inline-flex items-center justify-center w-10 h-10 border border-[var(--accent)] text-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                        title="Visit CSE Website"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>

                    {/* QR Code Button */}
                    <button
                        id="header-qr-code"
                        onClick={onQRCodeClick}
                        className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-300 transform hover:scale-110"
                        title="Scan Website QR Code"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-2h-4v2H4v-4h2m6 2h4m6-4H2m12-3.99A4 4 0 0013.99 9M18 13.99A4 4 0 0113.99 9M9 13.99A4 4 0 0013.99 18M9 9.01A4 4 0 0113.99 4M8 8a2 2 0 11-4 0 2 2 0 014 0zm0 10a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm0-10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>

                    <div id="header-theme-toggle">
                        <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
                    </div>
                    <div id="header-action-menu">
                        <ActionMenu 
                            isAdmin={isAdmin}
                            onLoginClick={onLoginClick}
                            onLogoutClick={onLogoutClick}
                            onExportClick={onExportClick}
                            onImportClick={onImportClick}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
