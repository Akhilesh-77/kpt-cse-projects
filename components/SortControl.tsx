import React from 'react';

export type SortOption = 'name-asc' | 'name-desc' | 'reg-asc' | 'reg-desc';

interface SortControlProps {
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
}

const SortControl: React.FC<SortControlProps> = ({ sortOption, setSortOption }) => {
    return (
        <div className="relative flex-shrink-0">
            <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full sm:w-auto appearance-none bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] rounded-full text-[var(--text-primary)] pl-5 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-300 cursor-pointer"
                aria-label="Sort students"
            >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="reg-asc">Register No. (Asc)</option>
                <option value="reg-desc">Register No. (Desc)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                 <svg className="h-5 w-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                </svg>
            </div>
        </div>
    );
};

export default SortControl;
