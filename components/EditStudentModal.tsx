import React, { useState, useEffect } from 'react';
import { Student, Project } from '../types';

interface EditStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEditStudent: (student: Student) => void;
    student: Student | null;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, onEditStudent, student }) => {
    const [name, setName] = useState('');
    const [registerNumber, setRegisterNumber] = useState('');
    // FIX: Typed `projects` state as an array of project-like objects to fix multiple type errors.
    const [projects, setProjects] = useState<(Omit<Project, 'description'> & { description?: string })[]>([{ title: '', link: '', description: '' }]);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarData, setAvatarData] = useState<string>('');

    useEffect(() => {
        if (isOpen && student) {
            setName(student.name);
            setRegisterNumber(student.register_number);
            setProjects(student.projects.length > 0 ? student.projects : [{ title: '', link: '', description: '' }]);
            setAvatarPreview(student.avatar);
            setAvatarData(student.avatar);
        }
    }, [isOpen, student]);

    const handleProjectChange = (index: number, field: keyof Project, value: string) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
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
    
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setAvatarData(reader.result as string);
            };
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !registerNumber || !avatarData || projects.some(p => !p.title || !p.link)) {
            alert('Please fill in all required fields, including the profile photo.');
            return;
        }
        onEditStudent({
            name,
            register_number: registerNumber,
            avatar: avatarData,
            projects: projects.map(p => ({ ...p, description: p.description || 'No description provided.' })),
        });
    };

    if (!isOpen) return null;

    const inputClasses = "w-full mt-1 p-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent)] focus:outline-none transition";
    const buttonClasses = "px-4 py-2 rounded-md font-semibold transition-colors";

    return (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Edit Student</h2>
                        <p className="text-[var(--text-secondary)] mb-6">Update student and project details.</p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                            <div className="flex-shrink-0">
                                <label htmlFor="avatar-upload-edit" className="cursor-pointer">
                                    <div className="w-28 h-28 rounded-full bg-[var(--bg-tertiary)] border-2 border-dashed border-[var(--border-color)] flex items-center justify-center text-center text-xs text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span>Click to Upload Photo</span>
                                        )}
                                    </div>
                                </label>
                                <input id="avatar-upload-edit" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                            </div>
                            <div className="w-full">
                                <div className="mb-4">
                                    <label className="font-semibold">Student Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
                                </div>
                                <div>
                                    <label className="font-semibold">Register Number</label>
                                    <input type="text" value={registerNumber} className={`${inputClasses} opacity-70 cursor-not-allowed`} disabled />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2 mb-4">Projects</h3>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4 p-4 border border-[var(--border-color)] rounded-lg relative">
                                {projects.length > 1 && (
                                    <button type="button" onClick={() => removeProjectField(index)} className="absolute top-2 right-2 text-2xl font-bold text-[var(--text-muted)] hover:text-red-500 leading-none">&times;</button>
                                )}
                                <div className="mb-2">
                                    <label className="font-semibold">Project Title</label>
                                    <input type="text" value={project.title} onChange={e => handleProjectChange(index, 'title', e.target.value)} className={inputClasses} required />
                                </div>
                                <div className="mb-2">
                                    <label className="font-semibold">Project Link</label>
                                    <input type="url" value={project.link} onChange={e => handleProjectChange(index, 'link', e.target.value)} className={inputClasses} required />
                                </div>
                                <div>
                                    <label className="font-semibold">Project Description</label>
                                    <textarea value={project.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} className={inputClasses} rows={2}></textarea>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addProjectField} className={`${buttonClasses} w-full border border-dashed border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white`}>
                            + Add Another Project
                        </button>
                    </div>
                    <div className="bg-[var(--bg-primary)] p-4 flex justify-end space-x-4 rounded-b-xl">
                        <button type="button" onClick={onClose} className={`${buttonClasses} bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)]`}>Cancel</button>
                        <button type="submit" className={`${buttonClasses} bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]`}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudentModal;