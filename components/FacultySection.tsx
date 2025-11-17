import React from 'react';
import { FacultyMember } from '../types';
import { hodData, facultyData, guestLecturersData, labInstructorsData } from '../data/faculty';

interface FacultySectionProps {
    onSelectFaculty: (faculty: FacultyMember) => void;
}

const FacultyCard: React.FC<{ faculty: FacultyMember; onSelect: (faculty: FacultyMember) => void; className?: string; style?: React.CSSProperties; }> = ({ faculty, onSelect, className, style }) => {
    const combinedStyles = {
        '--tw-shadow-color': 'var(--shadow-color)',
        boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)',
        minHeight: '380px',
        ...style
    };

    return (
        <div 
            onClick={() => onSelect(faculty)}
            className={`bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 flex flex-col items-center text-center gap-6 w-full max-w-sm transform transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
            style={combinedStyles as React.CSSProperties}
        >
            <img src={faculty.image} alt={`Profile of ${faculty.name}`} className="w-40 h-40 rounded-full object-cover border-4 border-[var(--border-color)]" />
            <div className="flex flex-col flex-grow justify-center">
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">{faculty.name}</h3>
                <p className="text-[var(--accent)] font-semibold text-lg">{faculty.role}</p>
                {faculty.department && <p className="text-md text-[var(--text-secondary)] mt-2">{faculty.department}</p>}
                {faculty.subjects && (
                    <div className="mt-4 text-center">
                        <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Subjects of Expertise</p>
                        <p className="text-md text-[var(--text-primary)] mt-1">{faculty.subjects}</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const FacultySection: React.FC<FacultySectionProps> = ({ onSelectFaculty }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-[var(--text-secondary)] opacity-0 animate-fade-in-up">
                Head of Department
            </h2>
            <div className="flex justify-center items-center mb-16">
                <FacultyCard faculty={hodData} onSelect={onSelectFaculty} className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms'}} />
            </div>
            <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-secondary)] opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms'}}>
                Permanent Faculties
            </h2>
            <div className="flex flex-wrap gap-10 justify-center items-center mb-16">
                {facultyData.map((faculty, index) => <FacultyCard key={faculty.name} faculty={faculty} onSelect={onSelectFaculty} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }} />)}
            </div>

            <p className="text-center text-xl font-semibold text-[var(--text-muted)] mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms'}}>
                Subject: Full Stack Development
            </p>

            <h2 className="text-4xl font-bold text-center mt-8 mb-12 text-[var(--text-secondary)] opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms'}}>
                Guest Faculty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start mb-8">
                {guestLecturersData.map((faculty, index) => <FacultyCard key={faculty.name} faculty={faculty} onSelect={onSelectFaculty} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${700 + index * 100}ms` }} />)}
            </div>
            
            <h2 className="text-4xl font-bold text-center mt-16 mb-8 text-[var(--text-secondary)] opacity-0 animate-fade-in-up" style={{ animationDelay: '900ms'}}>
                Lab Instructor
            </h2>
            <div className="flex justify-center items-center mb-16">
                {labInstructorsData.map((faculty, index) => <FacultyCard key={faculty.name} faculty={faculty} onSelect={onSelectFaculty} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${1000 + index * 100}ms` }}/>)}
            </div>
        </section>
    );
};

export default FacultySection;