import React from 'react';
import { Student } from '../types';

interface StudentCardProps {
    student: Student;
    onSelect: (student: Student) => void;
    className?: string;
    style?: React.CSSProperties;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onSelect, className, style }) => {
    const projectCount = new Set(student.projects.filter(p => p.link).map(p => p.link)).size;

    // FIX: Cast style object to React.CSSProperties to allow for custom CSS properties.
    const combinedStyle = {
        '--tw-shadow-color': 'var(--shadow-color)',
        boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)',
        ...style
    } as React.CSSProperties;

    return (
        <div
            onClick={() => onSelect(student)}
            className={`bg-[var(--bg-secondary)] rounded-lg shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[var(--accent)] ${className || ''}`}
            style={combinedStyle}
        >
            <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-full aspect-square object-contain bg-[var(--bg-tertiary)] group-hover:opacity-80 transition-opacity duration-300" 
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">{student.name}</h3>
                <p className="text-sm text-[var(--accent)] font-mono">{student.register_number}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">{projectCount} {projectCount === 1 ? 'Project' : 'Projects'}</p>
            </div>
        </div>
    );
};

export default StudentCard;