import React, { useEffect } from 'react';
import { Project, Student } from '../types';

interface SingleProjectModalProps {
    project: Project;
    student: Student;
    onClose: () => void;
}

const SingleProjectModal: React.FC<SingleProjectModalProps> = ({ project, student, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--accent)] leading-tight">{project.title}</h2>
                        <p className="text-[var(--text-muted)] text-sm mt-1">by {student.name}</p>
                    </div>
                    <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6">
                    <p className="text-[var(--text-secondary)] text-lg mb-6 leading-relaxed">
                        {project.description}
                    </p>
                    
                    <div className="flex flex-col gap-3">
                         <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-bold text-center hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--shadow-color)] flex items-center justify-center gap-2"
                        >
                            Visit Project
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <button 
                            onClick={onClose}
                            className="w-full py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-semibold hover:bg-[var(--border-color)] transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProjectModal;
