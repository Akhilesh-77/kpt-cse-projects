import React, { useEffect } from 'react';
import { Student } from '../types';

interface ProjectModalProps {
    student: Student | null;
    onClose: () => void;
    isAdmin: boolean;
    onEdit: (student: Student) => void;
    onDelete: (registerNumber: string) => void;
    setToastMessage: (message: string) => void;
}

const PencilIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const TrashIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);


const ProjectModal: React.FC<ProjectModalProps> = ({ student, onClose, isAdmin, onEdit, onDelete, setToastMessage }) => {
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

    if (!student) return null;
    
    const handleShare = async () => {
        if (!student) return;

        const shareData = {
            title: `KPT Project Showcase: ${student.name}`,
            text: `Check out the projects by ${student.name} from KPT CSE!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                // Log error but don't show a toast, as it's likely the user cancelled the share.
                console.log('Share action was cancelled or failed.', error);
            }
        } else {
            setToastMessage('Native sharing is not supported on this browser.');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-[var(--bg-secondary)]/80 backdrop-blur-sm p-6 z-10">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]" />
                            <div>
                                <h2 className="text-3xl font-bold text-[var(--text-primary)]">{student.name}</h2>
                                <p className="text-md text-[var(--accent)] font-mono mt-1">{student.register_number}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={handleShare} className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label="Share">
                                <ShareIcon />
                            </button>
                             {isAdmin && (
                                <>
                                    <button onClick={() => onEdit(student)} className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label="Edit student">
                                        <PencilIcon />
                                    </button>
                                    <button onClick={() => onDelete(student.register_number)} className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-red-500" aria-label="Delete student">
                                        <TrashIcon />
                                    </button>
                                </>
                            )}
                            <button
                                onClick={onClose}
                                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                aria-label="Close"
                            >
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-8">
                    <h3 className="text-xl font-semibold text-[var(--text-secondary)] mt-4 mb-4 border-b border-[var(--border-color)] pb-2">Projects</h3>
                    <div className="space-y-6">
                        {student.projects.length > 0 ? (
                            student.projects.map((project, index) => (
                                <div key={index} className="bg-[var(--bg-tertiary)] p-4 rounded-lg border border-[var(--border-color)]">
                                    <h4 className="text-lg font-bold text-[var(--accent)]">{project.title}</h4>
                                    <p className="text-[var(--text-secondary)] mt-2 mb-4">{project.description}</p>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-all duration-300 font-semibold transform hover:-translate-y-0.5 active:scale-95"
                                    >
                                        Visit Project
                                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-[var(--text-muted)]">No projects to display.</p>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95) translateY(15px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default ProjectModal;