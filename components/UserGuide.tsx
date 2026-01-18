import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Step {
    target: string | string[];
    title: string;
    content: string;
}

const steps: Step[] = [
    {
        target: 'nav-home',
        title: 'Dashboard',
        content: 'Welcome to the KPT CSE Portal. This is your main dashboard.'
    },
    {
        target: 'nav-events',
        title: 'Events',
        content: 'Explore department events and interact by liking posts.'
    },
    {
        target: 'nav-projects',
        title: 'Projects',
        content: 'View all Computer Science projects and innovations here.'
    },
    {
        target: 'nav-credits',
        title: 'Credits',
        content: 'See the people who guided and supported this platform.'
    },
    {
        target: 'header-theme-toggle',
        title: 'Themes',
        content: 'Switch between Light and Dark mode anytime.'
    },
    {
        target: 'header-action-menu',
        title: 'Settings',
        content: 'Manage app preferences and options from here.'
    },
    {
        target: ['btn-visit-csc-desktop', 'btn-visit-csc-mobile'],
        title: 'New CSE Website',
        content: 'Did you know? We now have a dedicated CSE website! Click here to explore the new KPT Computer Science portal.'
    },
    {
        target: 'header-qr-code',
        title: 'QR Code',
        content: 'Scan this QR code to open the official CSE website quickly. It is safe and only for website access.'
    },
    {
        target: 'finish',
        title: "You're all set!",
        content: 'Enjoy exploring KPT CSE.'
    }
];

const UserGuide: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const resizeTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const completed = localStorage.getItem('userGuideCompleted');
        if (!completed) {
            setIsVisible(true);
        }
    }, []);

    const updateRect = useCallback(() => {
        const step = steps[currentStep];
        let element: HTMLElement | null = null;

        if (Array.isArray(step.target)) {
            // Find the first visible element from the list
            for (const id of step.target) {
                const el = document.getElementById(id);
                if (el && el.offsetParent !== null) {
                    element = el;
                    break;
                }
            }
        } else if (step.target !== 'finish') {
            element = document.getElementById(step.target);
        }

        if (element) {
            const r = element.getBoundingClientRect();
            // Add padding
            const padding = 8;
            setRect({
                ...r,
                top: r.top - padding,
                left: r.left - padding,
                width: r.width + (padding * 2),
                height: r.height + (padding * 2),
                bottom: r.bottom + padding,
                right: r.right + padding,
                x: r.x - padding,
                y: r.y - padding,
                toJSON: r.toJSON
            });
            // Ensure element is in view
            element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        } else {
            setRect(null); // 'finish' step or element not found
        }
    }, [currentStep]);

    useEffect(() => {
        if (isVisible) {
            // Small delay to ensure UI is ready
            const timer = setTimeout(updateRect, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, currentStep, updateRect]);

    useEffect(() => {
        const handleResize = () => {
            if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
            resizeTimeoutRef.current = window.setTimeout(updateRect, 100);
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', updateRect, true); // Capture scrolling
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', updateRect, true);
        };
    }, [updateRect]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        localStorage.setItem('userGuideCompleted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const step = steps[currentStep];
    const isFinishStep = step.target === 'finish';

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop with hole */}
            {rect && !isFinishStep ? (
                <div className="absolute inset-0 transition-all duration-300 ease-in-out">
                    <div className="absolute inset-0 bg-black/70" style={{ clipPath: `polygon(0% 0%, 0% 100%, ${rect.left}px 100%, ${rect.left}px ${rect.top}px, ${rect.right}px ${rect.top}px, ${rect.right}px ${rect.bottom}px, ${rect.left}px ${rect.bottom}px, ${rect.left}px 100%, 100% 100%, 100% 0%)` }}></div>
                    {/* Highlight Border */}
                    <div 
                        className="absolute border-2 border-[var(--accent)] rounded-lg shadow-[0_0_20px_var(--accent)] transition-all duration-300 ease-in-out pointer-events-none"
                        style={{
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height,
                        }}
                    />
                </div>
            ) : (
                 <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500"></div>
            )}

            {/* Tooltip / Modal */}
            <div 
                className={`absolute transition-all duration-500 ease-out flex justify-center items-center ${isFinishStep ? 'inset-0' : ''}`}
                style={!isFinishStep && rect ? {
                    top: rect.bottom + 20 > window.innerHeight - 200 ? rect.top - 200 : rect.bottom + 20, // Flip if too close to bottom
                    left: 0, 
                    right: 0,
                    pointerEvents: 'none'
                } : {}}
            >
                <div 
                    className={`bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-2xl p-6 max-w-sm w-[90%] mx-auto pointer-events-auto flex flex-col items-center text-center animate-fade-in-up`}
                    style={isFinishStep ? { transform: 'scale(1.1)' } : {}}
                >
                    {isFinishStep && (
                        <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mb-4 shadow-lg text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-6 text-sm leading-relaxed">{step.content}</p>
                    
                    <div className="flex justify-between w-full items-center gap-4">
                        {!isFinishStep && (
                            <button 
                                onClick={handleFinish} 
                                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2"
                            >
                                Skip
                            </button>
                        )}
                         
                        <div className="flex gap-2 ml-auto">
                            {!isFinishStep && currentStep > 0 && (
                                <button 
                                    onClick={handleBack} 
                                    className="px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] text-sm font-semibold transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            <button 
                                onClick={handleNext} 
                                className="px-5 py-2 rounded-lg bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] text-sm font-bold shadow-lg shadow-[var(--shadow-color)] transition-all transform hover:scale-105"
                            >
                                {isFinishStep ? 'Start Exploring' : 'Next'}
                            </button>
                        </div>
                    </div>
                    
                    {!isFinishStep && (
                         <div className="flex gap-1 mt-4">
                            {steps.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-[var(--accent)]' : 'w-1.5 bg-[var(--border-color)]'}`} />
                            ))}
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserGuide;
