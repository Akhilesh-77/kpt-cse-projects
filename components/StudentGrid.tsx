import React from 'react';
import { Student } from '../types';
import StudentCard from './StudentCard';

interface StudentGridProps {
    students: Student[];
    onSelectStudent: (student: Student) => void;
}

const StudentGrid: React.FC<StudentGridProps> = ({ students, onSelectStudent }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {students.map((student, index) => (
                <StudentCard 
                    key={student.register_number} 
                    student={student} 
                    onSelect={onSelectStudent}
                    className="opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                />
            ))}
        </div>
    );
};

export default StudentGrid;