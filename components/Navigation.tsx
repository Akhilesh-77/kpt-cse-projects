import React from 'react';

type Tab = 'home' | 'projects' | 'cohort-owners' | 'events' | 'credits';

interface NavigationProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const navButtonClasses = "px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95";
    const activeClasses = "bg-[var(--accent)] text-white";
    const inactiveClasses = "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]";

    return (
        <nav className="bg-[var(--bg-secondary)] border-b-2 border-[var(--border-color)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    <button 
                        onClick={() => onTabChange('home')}
                        className={`${navButtonClasses} ${activeTab === 'home' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'home'}
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => onTabChange('projects')}
                        className={`${navButtonClasses} ${activeTab === 'projects' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'projects'}
                    >
                        Projects
                    </button>
                    <button 
                        onClick={() => onTabChange('cohort-owners')}
                        className={`${navButtonClasses} ${activeTab === 'cohort-owners' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'cohort-owners'}
                    >
                        CS DEPT
                    </button>
                    <button 
                        onClick={() => onTabChange('events')}
                        className={`${navButtonClasses} ${activeTab === 'events' ? activeClasses : inactiveClasses}`}
                        aria-pressed={activeTab === 'events'}
                    >
                        Events
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