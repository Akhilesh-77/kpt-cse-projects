import React from 'react';

type Tab = 'home' | 'cohort-owners' | 'credits';

interface NavigationProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const navButtonClasses = "px-4 py-2 rounded-md font-semibold transition-colors duration-300";
    const activeClasses = "bg-[var(--accent)] text-white";
    const inactiveClasses = "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]";

    return (
        <nav className="bg-[var(--bg-secondary)] border-b-2 border-[var(--border-color)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-center space-x-4">
                    <button 
                        onClick={() => onTabChange('home')}
                        className={`${navButtonClasses} ${activeTab === 'home' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'home'}
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => onTabChange('cohort-owners')}
                        className={`${navButtonClasses} ${activeTab === 'cohort-owners' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'cohort-owners'}
                    >
                        Cohort Owners
                    </button>
                    <button 
                        onClick={() => onTabChange('credits')}
                        className={`${navButtonClasses} ${activeTab === 'credits' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'credits'}
                    >
                        Credits
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
