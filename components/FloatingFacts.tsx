import React, { useState } from 'react';

interface FloatingFactsProps {
    facts: string[];
    className?: string; // Kept for compatibility, but we will enforce specific positioning
    alignment?: 'left' | 'right';
}

const FloatingFacts: React.FC<FloatingFactsProps> = ({ facts, className, alignment = 'right' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIndex((prev) => (prev + 1) % facts.length);
    };

    // Unified position class: bottom-40 right-6
    // This ensures it sits above the 'Scroll To Top' (bottom-24) and 'Add' buttons (bottom-6)
    const positionClass = "bottom-40 right-6";

    return (
        <div className={`fixed z-30 ${positionClass}`}>
            {isOpen && (
                <div 
                    className={`absolute bottom-16 mb-2 w-72 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl p-5 animate-fade-in-up origin-bottom-right right-0`}
                >
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Did You Know?
                        </span>
                        <button onClick={() => setIsOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <p className="text-[var(--text-primary)] text-sm leading-relaxed min-h-[4rem] font-medium">
                        {facts[index]}
                    </p>

                    <div className="flex justify-end mt-2">
                         <button 
                            onClick={handleNext}
                            className="bg-[var(--bg-tertiary)] hover:bg-[var(--accent)] hover:text-white text-[var(--text-primary)] text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 shadow-sm"
                        >
                            Next Fact
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] border-2 border-[var(--accent)] shadow-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'rotate-180 bg-[var(--accent)] text-white' : ''}`}
                aria-label="Interesting Facts"
                title="Interesting Facts"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            </button>
        </div>
    );
};

export default FloatingFacts;
