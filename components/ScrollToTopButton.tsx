import React, { useState, useEffect } from 'react';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-24 right-6 bg-[var(--accent)] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-[var(--accent-hover)] transition-all duration-300 z-30 transform hover:scale-110 hover:rotate-12
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            aria-label="Scroll to top"
        >
            &uarr;
        </button>
    );
};

export default ScrollToTopButton;