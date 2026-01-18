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
        <header className="sticky top-0 bg-[var(--bg-secondary)]/80 backdrop-blur-sm p-4 md:p-6 shadow-lg z-40 app-header transition-all duration-300">
            <div className="container mx-auto flex items-center justify-between">
                
                {/* Branding Section */}
                <div id="header-title" className="flex items-center gap-3 group cursor-pointer max-w-[65%] sm:max-w-none">
                    <img 
                        src="https://gpt.karnataka.gov.in/kptmangalore/public/uploads/dept_logo1755926888.jpg" 
                        alt="KPT Logo" 
                        className="w-10 h-10 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:rotate-6 flex-shrink-0"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-sm sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] leading-tight">
                            KPT Computer Science & Engineering
                        </h1>
                        <span className="text-xs sm:text-lg md:text-xl font-normal text-[var(--text-secondary)] mt-0.5 md:mt-1 leading-tight">
                            CSE Projects & Events Showcase
                        </span>
                    </div>
                </div>
                
                {/* Actions Section */}
                
                {/* Desktop View (Single Row) */}
                <div className="hidden md:flex items-center space-x-4">
                    <a
                        id="btn-visit-csc-desktop"
                        href="https://kptcs.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-1.5 border border-[var(--accent)] text-[var(--accent)] rounded-lg text-sm font-semibold hover:bg-[var(--accent)] hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                        Visit CSE Website
                    </a>

                    <button
                        id="header-qr-code"
                        onClick={onQRCodeClick}
                        className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-300 transform hover:scale-110"
                        title="Scan Website QR Code"
                    >
                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm8 6h6v-6h-6v6zm2-2v2h2v-2h-2v2zm2-2h2v-2h-2v2zm-2-2h2v-2h-2v2zm2 0h2v-2h-2v2z"/>
                            <path d="M10 10h4v4h-4zm-7 0h4v4H3z" opacity="0.5"/>
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

                {/* Mobile View (Two Small Rows) */}
                <div className="md:hidden flex flex-col items-end gap-2">
                    {/* Row 1: Visit Icon + QR Icon */}
                    <div className="flex items-center gap-2">
                         <a
                            id="btn-visit-csc-mobile"
                            href="https://kptcs.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 border border-[var(--accent)] text-[var(--accent)] rounded-full hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                            title="Visit CSE Website"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <button
                            onClick={onQRCodeClick}
                            className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-300"
                        >
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm8 6h6v-6h-6v6zm2-2v2h2v-2h-2v2zm2-2h2v-2h-2v2zm-2-2h2v-2h-2v2zm2 0h2v-2h-2v2z"/>
                                <path d="M10 10h4v4h-4zm-7 0h4v4H3z" opacity="0.5"/>
                             </svg>
                        </button>
                    </div>

                    {/* Row 2: Theme + Menu */}
                    <div className="flex items-center gap-2">
                        <div className="scale-90 origin-right">
                             <ThemeSwitcher currentTheme={currentTheme} setTheme={setTheme} />
                        </div>
                        <div className="scale-90 origin-right">
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

            </div>
        </header>
    );
};

export default Header;
