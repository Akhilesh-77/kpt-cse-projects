import React, { useEffect } from 'react';
import { FacultyMember } from '../types';

interface FacultyModalProps {
    faculty: FacultyMember | null;
    onClose: () => void;
    setToastMessage: (message: string) => void;
}

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);

const FacultyModal: React.FC<FacultyModalProps> = ({ faculty, onClose, setToastMessage }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!faculty) return null;

    const handleShare = async () => {
        if (!faculty) return;
        
        const facultyUrl = `${window.location.origin}/faculty/${faculty.id}`;
        
        const shareData = {
            title: `KPT CSE Department: ${faculty.name}`,
            text: `Meet ${faculty.name}, ${faculty.role} at KPT Computer Science & Engineering.`,
            url: facultyUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log('Share action was cancelled or failed.', error);
            }
        } else {
            setToastMessage('Native sharing is not supported on this browser.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-[var(--bg-secondary)]/80 backdrop-blur-sm p-6 z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={faculty.image} alt={faculty.name} className="w-24 h-24 rounded-full object-cover border-4 border-[var(--accent)]" />
                            <div>
                                <h2 className="text-3xl font-bold text-[var(--text-primary)]">{faculty.name}</h2>
                                <p className="text-lg text-[var(--accent)] font-semibold mt-1">{faculty.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <button onClick={handleShare} className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label="Share faculty profile">
                                <ShareIcon />
                            </button>
                            <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" aria-label="Close">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-6 pb-8">
                     <div className="space-y-4 mt-6">
                        {faculty.department && (
                            <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Department</p>
                                <p className="text-lg text-[var(--text-primary)] mt-1">{faculty.department}</p>
                            </div>
                        )}
                        {faculty.subjects && (
                            <div className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Subjects of Expertise</p>
                                <p className="text-lg text-[var(--text-primary)] mt-1">{faculty.subjects}</p>
                            </div>
                        )}
                     </div>
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default FacultyModal;
