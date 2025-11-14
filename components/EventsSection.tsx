import React from 'react';

interface EventsSectionProps {
    onAddEventClick: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ onAddEventClick }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in text-center">

            <button
                onClick={onAddEventClick}
                className="fixed bottom-6 right-6 bg-[var(--accent)] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl font-bold hover:bg-[var(--accent-hover)] transition-all duration-300 transform hover:scale-110 z-50"
            >
                +
            </button>


            <h2 className="text-4xl font-bold text-center mb-4 text-[var(--text-secondary)]">
                Department Events
            </h2>
            <p className="text-lg text-[var(--text-muted)] mb-16">
                No events have been added yet. Stay tuned for updates!
            </p>
            
            <div className="text-9xl text-[var(--bg-tertiary)] opacity-50">
                📅
            </div>

            

            
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default EventsSection;