import React, { useState, useEffect, useRef } from 'react';

interface ActionMenuProps {
    isAdmin: boolean;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onExportClick: () => void;
    onImportClick: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ isAdmin, onLoginClick, onLogoutClick, onExportClick, onImportClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogin = () => {
        onLoginClick();
        setIsOpen(false);
    }
    
    const handleLogout = () => {
        onLogoutClick();
        setIsOpen(false);
    }

    const handleExport = () => {
        onExportClick();
        setIsOpen(false);
    }
    
    const handleImport = () => {
        onImportClick();
        setIsOpen(false);
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                aria-label="Open actions menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 p-2">
                    <div className="p-2">
                         <p className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Admin</p>
                         {isAdmin ? (
                            <>
                                <button onClick={handleImport} className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors">Import from JSON</button>
                                <button onClick={handleExport} className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors">Export to JSON</button>
                                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors">Logout</button>
                            </>
                         ) : (
                            <button onClick={handleLogin} className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-md transition-colors">Admin Login</button>
                         )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default ActionMenu;
