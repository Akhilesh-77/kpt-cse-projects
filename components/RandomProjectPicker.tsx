import React, { useState, useRef, useEffect } from 'react';
import { Student, Project } from '../types';
import { generateProjectSlug } from '../utils';

interface RandomProjectPickerProps {
    students: Student[];
}

const ZIA_MESSAGES = [
    "Searching for an interesting project...",
    "Analyzing creativity levels...",
    "Finding something special for you...",
    "Scanning the digital showcase...",
    "Consulting the code oracle...",
    "Picking a hidden gem...",
    "Looking for the wow factor...",
    "Connecting to the creative matrix...",
    "Filtering for pure awesomeness..."
];

const RandomProjectPicker: React.FC<RandomProjectPickerProps> = ({ students }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(ZIA_MESSAGES[0]);
    const [selected, setSelected] = useState<{ project: Project; student: Student } | null>(null);
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
        setSelected(null);
        
        // Randomize loading time between 2.5s and 3.5s
        const duration = 2500 + Math.random() * 1000;
        
        // Initial message
        setLoadingMessage(ZIA_MESSAGES[Math.floor(Math.random() * ZIA_MESSAGES.length)]);

        if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
        
        // Rotate messages every 800ms
        loadingIntervalRef.current = window.setInterval(() => {
            setLoadingMessage(ZIA_MESSAGES[Math.floor(Math.random() * ZIA_MESSAGES.length)]);
        }, 800);

        setTimeout(() => {
            if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
            pickRandomProject();
            setIsLoading(false);
        }, duration);
    };

    const pickRandomProject = () => {
        const allProjects = students.flatMap(student => 
            student.projects
                .filter(p => p.link) // Ensure project has a link
                .map(project => ({ student, project }))
        );

        if (allProjects.length === 0) return;

        const randomIndex = Math.floor(Math.random() * allProjects.length);
        setSelected(allProjects[randomIndex]);
    };

    const handleVisitUserProfile = () => {
        if (!selected) return;
        const url = `/student/${selected.student.register_number}`;
        window.history.pushState({ studentId: selected.student.register_number }, selected.student.name, url);
        window.dispatchEvent(new PopStateEvent('popstate'));
        setIsOpen(false);
    };

    const handleVisitProjectProfile = () => {
        if (!selected) return;
        const slug = generateProjectSlug(selected.project.title, selected.student.name);
        const url = `/project/${slug}`;
        window.history.pushState(null, '', url);
        window.dispatchEvent(new PopStateEvent('popstate'));
        setIsOpen(false);
    };

    const handleVisitLiveWebsite = () => {
        if (!selected || !selected.project.link) return;
        window.open(selected.project.link, '_blank');
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsLoading(false);
        if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    };

    return (
        <>
            {/* Floating Button - Positioned above Floating Facts (bottom-40) */}
            <div className="fixed z-30 bottom-56 right-6">
                <button
                    onClick={startZiaProcess}
                    className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] text-[var(--accent)] border-2 border-[var(--accent)] shadow-lg hover:bg-[var(--accent)] hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
                    aria-label="Pick Random Project"
                    title="Ask Zia (Random Project)"
                >
                    <span className="text-xl group-hover:rotate-12 transition-transform duration-300">🎲</span>
                </button>
            </div>

            {/* Modal */}
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
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[var(--bg-secondary)] animate-pulse"></div>
                                </div>
                                <h3 className="text-xl font-bold text-[var(--accent)] mb-2 animate-pulse">Zia is thinking...</h3>
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
                            selected && (
                                <>
                                    <div className="bg-[var(--bg-tertiary)] p-4 text-center border-b border-[var(--border-color)]">
                                        <h3 className="text-[var(--accent)] font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                                            <span>🤖</span> Zia picked this for you!
                                        </h3>
                                    </div>
                                    
                                    <div className="p-6 text-center">
                                        <div className="w-20 h-20 mx-auto bg-[var(--bg-primary)] rounded-full flex items-center justify-center mb-4 border-2 border-[var(--accent)] shadow-md p-1">
                                            <img 
                                                src={selected.student.avatar} 
                                                alt={selected.student.name} 
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-tight">{selected.project.title}</h2>
                                        <p className="text-sm text-[var(--text-muted)] mb-4">by {selected.student.name}</p>
                                        
                                        <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-3 bg-[var(--bg-tertiary)] p-3 rounded-lg italic">
                                            "{selected.project.description.substring(0, 100)}{selected.project.description.length > 100 ? '...' : ''}"
                                        </p>

                                        <div className="space-y-3">
                                            <button 
                                                onClick={handleVisitUserProfile}
                                                className="block w-full py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-bold hover:bg-[var(--border-color)] transition-colors shadow-sm"
                                            >
                                                🔹 Visit User Profile
                                            </button>
                                            
                                            <button 
                                                onClick={handleVisitProjectProfile}
                                                className="block w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold hover:bg-[var(--accent-hover)] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                            >
                                                🔹 Visit Project Profile
                                            </button>
                                            
                                            <button 
                                                onClick={handleVisitLiveWebsite}
                                                className="block w-full py-2.5 border border-[var(--accent)] text-[var(--accent)] rounded-lg font-semibold hover:bg-[var(--accent)] hover:text-white transition-colors"
                                            >
                                                🌐 Visit Live Website
                                            </button>

                                            <button 
                                                onClick={startZiaProcess}
                                                className="block w-full py-2.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-semibold hover:bg-[var(--border-color)] transition-colors mt-2"
                                            >
                                                🔁 Pick Another
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

export default RandomProjectPicker;
