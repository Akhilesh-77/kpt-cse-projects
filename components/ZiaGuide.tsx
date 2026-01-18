import React, { useState, useEffect } from 'react';

const ZiaGuide: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has seen the guide
        const hasSeenGuide = localStorage.getItem('ziaFeatureGuideSeen');
        
        // If not seen, show it after a short delay to let the page load
        if (!hasSeenGuide) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000); // 2s delay for a smooth entrance after initial page render
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('ziaFeatureGuideSeen', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100] flex items-end sm:items-center justify-center p-4 sm:p-0 animate-fade-in">
            <div 
                className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-6 max-w-sm w-full relative overflow-hidden animate-slide-in-up sm:animate-fade-in-up mx-auto mb-24 sm:mb-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative background elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-4 border-2 border-[var(--accent)] shadow-lg relative">
                        <span className="text-3xl animate-bounce">🤖</span>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)] animate-pulse"></div>
                    </div>

                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                        Hi! I'm Zia.
                    </h3>
                    
                    <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
                        I live in the bottom-right corner! ↘️
                        <br/><br/>
                        🎲 <b>Feeling lucky?</b> Tap the <span className="text-[var(--accent)] font-semibold">Dice</span>, and I'll pick a random project for you.
                        <br/><br/>
                        💡 <b>Curious?</b> Tap the <span className="text-[var(--accent)] font-semibold">Floating Button</span> to hear some secret fun facts about this site!
                    </p>

                    <button
                        onClick={handleDismiss}
                        className="w-full py-3 bg-[var(--accent)] text-white rounded-xl font-bold hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--shadow-color)] transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                        <span>Cool, let's go!</span> 🚀
                    </button>
                </div>
            </div>
            
            <style>{`
                @keyframes slide-in-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in-up {
                    animation: slide-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default ZiaGuide;
