import React, { useEffect } from 'react';
import { Student } from '../types';

interface ProjectModalProps {
    student: Student | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ student, onClose }) => {
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
                                        className="inline-flex items-center px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors duration-300 font-semibold"
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

export default ProjectModal;
