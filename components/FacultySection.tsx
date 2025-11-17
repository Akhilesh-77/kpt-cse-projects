import React from 'react';
import { FacultyMember } from '../types';
import { hodData, facultyData, guestLecturersData } from '../data/faculty';

interface FacultySectionProps {
    onSelectFaculty: (faculty: FacultyMember) => void;
}

const FacultyCard: React.FC<{ faculty: FacultyMember; onSelect: (faculty: FacultyMember) => void; }> = ({ faculty, onSelect }) => (
    <div 
        onClick={() => onSelect(faculty)}
        className="bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 flex flex-col items-center text-center gap-6 w-full max-w-sm transform transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{ '--tw-shadow-color': 'var(--shadow-color)', boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)', minHeight: '380px' } as React.CSSProperties}
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

const FacultySection: React.FC<FacultySectionProps> = ({ onSelectFaculty }) => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-8 text-[var(--text-secondary)]">
                Head of Department
            </h2>
            <div className="flex justify-center items-center mb-16">
                <FacultyCard faculty={hodData} onSelect={onSelectFaculty} />
            </div>
            <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-secondary)]">
                Permanent Faculties
            </h2>
            <div className="flex flex-wrap gap-10 justify-center items-center mb-16">
                {facultyData.map(faculty => <FacultyCard key={faculty.name} faculty={faculty} onSelect={onSelectFaculty} />)}
            </div>

            <p className="text-center text-xl font-semibold text-[var(--text-muted)] mt-16">
                Subject: Full Stack Development
            </p>

            <h2 className="text-4xl font-bold text-center mt-8 mb-12 text-[var(--text-secondary)]">
                Guest Faculty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start mb-8">
                {guestLecturersData.map(faculty => <FacultyCard key={faculty.name} faculty={faculty} onSelect={onSelectFaculty} />)}
            </div>
            
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default FacultySection;