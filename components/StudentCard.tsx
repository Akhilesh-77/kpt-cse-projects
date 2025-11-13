import React from 'react';
import { Student } from '../types';

interface StudentCardProps {
    student: Student;
    onSelect: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(student)}
            className="bg-[var(--bg-secondary)] rounded-lg shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[var(--accent)]"
            // FIX: Cast style object to React.CSSProperties to allow custom CSS properties.
            style={{ '--tw-shadow-color': 'var(--shadow-color)', boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)' } as React.CSSProperties}
        >
            <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity duration-300" 
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">{student.name}</h3>
                <p className="text-sm text-[var(--accent)] font-mono">{student.register_number}</p>
            </div>
        </div>
    );
};

export default StudentCard;