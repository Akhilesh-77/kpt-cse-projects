import React, { useState, useRef, useEffect } from 'react';

interface FloatingFactsProps {
    facts: string[];
    className?: string;
    alignment?: 'left' | 'right';
}

const ZIA_FACT_MESSAGES = [
    "Thinking about something cool...",
    "Searching a mind-blowing detail...",
    "Digging through the archives...",
    "Analyzing the fun levels...",
    "Almost got a fun fact for you...",
    "Connecting to the knowledge base...",
    "Filtering for pure interest...",
    "Looking for a hidden gem..."
];

const FloatingFacts: React.FC<FloatingFactsProps> = ({ facts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(ZIA_FACT_MESSAGES[0]);
    const [currentFact, setCurrentFact] = useState<string | null>(null);
    const loadingIntervalRef = useRef<number | null>(null);

    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
        };
    }, []);

    const startZiaProcess = () => {
        setIsOpen(true);
        setIsLoading(true);
        setCurrentFact(null);
        
        // Randomize loading time between 2.5s and 3.5s
        const duration = 2500 + Math.random() * 1000;
        
        // Initial message
        setLoadingMessage(ZIA_FACT_MESSAGES[Math.floor(Math.random() * ZIA_FACT_MESSAGES.length)]);

        if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
        
        // Rotate messages every 800ms
        loadingIntervalRef.current = window.setInterval(() => {
            setLoadingMessage(ZIA_FACT_MESSAGES[Math.floor(Math.random() * ZIA_FACT_MESSAGES.length)]);
        }, 800);

        setTimeout(() => {
            if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
            pickRandomFact();
            setIsLoading(false);
        }, duration);
    };

    const pickRandomFact = () => {
        if (!facts || facts.length === 0) return;
        const randomIndex = Math.floor(Math.random() * facts.length);
        setCurrentFact(facts[randomIndex]);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsLoading(false);
        if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    };

    // Unified position class matches original placement
    const positionClass = "bottom-40 right-6";

    return (
        <>
            {/* Floating Button */}
            <div className={`fixed z-30 ${positionClass}`}>
                <button
                    onClick={startZiaProcess}
                    className={`w-12 h-12 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] border-2 border-[var(--accent)] shadow-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'rotate-180 bg-[var(--accent)] text-white' : ''}`}
                    aria-label="Ask Zia for a Fact"
                    title="Ask Zia (Fun Facts)"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </button>
            </div>

            {/* Zia Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={handleClose}>
                    <div 
                        className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up border border-[var(--border-color)] relative"
                        onClick={e => e.stopPropagation()}
                    >
                         {/* Loading State: Zia Chatbot Feel */}
                         {isLoading ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                                <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-6 relative">
                                    <span className="text-4xl animate-bounce">🤖</span>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-[var(--bg-secondary)] animate-pulse"></div>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--accent)] mb-2 animate-pulse">Zia is finding an interesting fact...</h3>
                                <div className="bg-[var(--bg-tertiary)] px-4 py-3 rounded-2xl rounded-tr-none border border-[var(--border-color)] max-w-[80%]">
                                    <p className="text-[var(--text-secondary)] text-sm typing-effect">
                                        {loadingMessage}
                                    </p>
                                </div>
                                <div className="flex gap-1 mt-6">
                                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        ) : (
                            /* Result State */
                            currentFact && (
                                <>
                                    <div className="bg-[var(--bg-tertiary)] p-4 text-center border-b border-[var(--border-color)]">
                                        <h3 className="text-[var(--accent)] font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                                            <span>🤖</span> Zia found this for you!
                                        </h3>
                                    </div>
                                    
                                    <div className="p-8 text-center">
                                        <div className="w-16 h-16 mx-auto bg-[var(--bg-primary)] rounded-full flex items-center justify-center mb-6 border-2 border-[var(--accent)] shadow-md text-3xl">
                                            💡
                                        </div>
                                        
                                        <h2 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">Fun Fact About This Website</h2>
                                        
                                        <p className="text-[var(--text-primary)] text-lg font-medium mb-8 leading-relaxed">
                                            "{currentFact}"
                                        </p>

                                        <div className="space-y-3">
                                            <button 
                                                onClick={startZiaProcess}
                                                className="block w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:bg-[var(--accent-hover)] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                            >
                                                🔁 Another Fact
                                            </button>
                                            
                                            <button 
                                                onClick={handleClose}
                                                className="block w-full py-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                            >
                                                ❌ Close
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingFacts;
