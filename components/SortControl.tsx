import React, { useState, useRef, useEffect } from 'react';
import { SortOption } from '../types';

interface SortControlProps {
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
}

const SortIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
    </svg>
);

const sortOptions: { label: string; value: SortOption }[] = [
    { label: 'Latest Upload', value: 'latest-asc' },
    { label: 'Name (Ascending)', value: 'name-asc' },
    { label: 'Reg No. (Ascending)', value: 'reg-asc' },
    { label: 'Projects (High-Low)', value: 'projects-desc' },
];

const SortControl: React.FC<SortControlProps> = ({ sortOption, setSortOption }) => {
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

    const handleSelectOption = (option: SortOption) => {
        setSortOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative flex-shrink-0" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-full text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-300 cursor-pointer transform hover:scale-110"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Sort options"
            >
                <SortIcon />
            </button>
            {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-56 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg shadow-xl z-50 p-2 animate-fade-in-down"
                    role="menu"
                >
                    {sortOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleSelectOption(option.value)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${sortOption === option.value ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'}`}
                            role="menuitem"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default SortControl;