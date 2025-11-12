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
            {students.map((student) => (
                <StudentCard 
                    key={student.register_number} 
                    student={student} 
                    onSelect={onSelectStudent} 
                />
            ))}
        </div>
    );
};

export default StudentGrid;
