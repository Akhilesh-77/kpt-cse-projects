import React, { useState, useEffect } from 'react';
import { Student, Project } from '../types';

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (student: Student) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAddProject }) => {
    const [name, setName] = useState('');
    const [registerNumber, setRegisterNumber] = useState('');
    const [projects, setProjects] = useState<{ title: string; link: string; description: string }[]>([{ title: '', link: '', description: '' }]);

    const resetForm = () => {
        setName('');
        setRegisterNumber('');
        setProjects([{ title: '', link: '', description: '' }]);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const handleProjectChange = (index: number, field: keyof typeof projects[0], value: string) => {
        const newProjects = projects.map((project, i) => {
            if (i === index) {
                return { ...project, [field]: value };
            }
            return project;
        });
        setProjects(newProjects);
    };

    const addProjectField = () => {
        setProjects([...projects, { title: '', link: '', description: '' }]);
    };

    const removeProjectField = (index: number) => {
        if (projects.length > 1) {
            const newProjects = projects.filter((_, i) => i !== index);
            setProjects(newProjects);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!name.trim() || !registerNumber.trim()) {
            alert('Please enter your Name and Register Number.');
            return;
        }

        const validProjects = projects.filter(p => p.title.trim() && p.link.trim());
        if (validProjects.length === 0) {
            alert('Please add at least one valid project with a Title and Link.');
            return;
        }

        const newStudent: Student = {
            name: name.trim(),
            register_number: registerNumber.trim(),
            // Generate a default avatar based on initials
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256`,
            projects: validProjects.map(p => ({
                title: p.title.trim(),
                link: p.link.trim(),
                description: p.description.trim() || 'No description provided.'
            }))
        };

        // WhatsApp Integration
        // Using '91' for India as KPT is in India, and the number provided was 6363027032.
        const phoneNumber = '916363027032';
        let whatsappMessage = `*New Project Submission*\n\n`;
        whatsappMessage += `*Student Name:* ${name.trim()}\n`;
        whatsappMessage += `*Register Number:* ${registerNumber.trim()}\n\n`;
        whatsappMessage += `*Projects:*\n`;
        
        validProjects.forEach((p, i) => {
             whatsappMessage += `\n${i+1}. *Title:* ${p.title.trim()}\n`;
             if (p.description.trim()) {
                whatsappMessage += `   *Description:* ${p.description.trim()}\n`;
             }
             whatsappMessage += `   *Link:* ${p.link.trim()}\n`;
        });
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        onAddProject(newStudent);
    };

    if (!isOpen) return null;

    const inputClasses = "w-full mt-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition";
    const buttonClasses = "px-4 py-2 rounded-md font-semibold transition-colors";

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Submit Your Projects</h2>
                        <p className="text-[var(--text-secondary)] mb-6">Add your details and project links below.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="font-semibold text-[var(--text-primary)]">Student Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClasses} placeholder="Ex: John Doe" required />
                            </div>
                            <div>
                                <label className="font-semibold text-[var(--text-primary)]">Register Number</label>
                                <input type="text" value={registerNumber} onChange={e => setRegisterNumber(e.target.value)} className={inputClasses} placeholder="Ex: 103CS23001" required />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 mb-4">Project Details</h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4 p-4 border border-[var(--border-color)] rounded-lg relative bg-[var(--bg-tertiary)]/30">
                                {projects.length > 1 && (
                                    <button type="button" onClick={() => removeProjectField(index)} className="absolute top-2 right-2 text-2xl font-bold text-[var(--text-muted)] hover:text-red-500 leading-none" title="Remove Project">&times;</button>
                                )}
                                <div className="mb-3">
                                    <label className="font-semibold text-[var(--text-primary)] text-sm">Project Title</label>
                                    <input type="text" value={project.title} onChange={e => handleProjectChange(index, 'title', e.target.value)} className={inputClasses} placeholder="Ex: Portfolio Website" required />
                                </div>
                                <div className="mb-3">
                                    <label className="font-semibold text-[var(--text-primary)] text-sm">Project Link</label>
                                    <input type="url" value={project.link} onChange={e => handleProjectChange(index, 'link', e.target.value)} className={inputClasses} placeholder="https://..." required />
                                </div>
                                <div>
                                    <label className="font-semibold text-[var(--text-primary)] text-sm">Description (Optional)</label>
                                    <textarea value={project.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} className={inputClasses} rows={2} placeholder="Brief details..."></textarea>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addProjectField} className={`${buttonClasses} w-full border border-dashed border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white mt-2`}>
                            + Add Another Project
                        </button>
                    </div>
                    <div className="bg-[var(--bg-primary)] p-4 flex justify-end space-x-4 rounded-b-xl">
                        <button type="button" onClick={onClose} className={`${buttonClasses} bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)]`}>Cancel</button>
                        <button type="submit" className={`${buttonClasses} bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--shadow-color)]`}>Submit Projects</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;