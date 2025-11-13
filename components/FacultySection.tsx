import React from 'react';

const facultyData = [
    {
        name: 'Mrs. Leelavathi R.',
        role: 'Selection Grade Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://i.postimg.cc/N9R7ywb5/leelavathi-mam-jpg.png'
    },
    {
        name: 'Mr. Sathish S',
        role: 'Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://i.postimg.cc/S2yQF6XM/sathish-sir.jpg'
    }
];

const FacultyCard: React.FC<{ faculty: typeof facultyData[0] }> = ({ faculty }) => (
    <div 
        className="bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 flex flex-col items-center text-center gap-6 w-full max-w-sm transform transition-all duration-300 hover:scale-105"
        style={{ '--tw-shadow-color': 'var(--shadow-color)', boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)' } as React.CSSProperties}
    >
        <img src={faculty.image} alt={`Profile of ${faculty.name}`} className="w-32 h-32 rounded-full object-cover border-4 border-[var(--border-color)]" />
        <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{faculty.name}</h3>
            <p className="text-[var(--accent)] font-semibold text-lg mt-1">{faculty.role}</p>
            <p className="text-md text-[var(--text-secondary)] mt-2">{faculty.department}</p>
        </div>
    </div>
);

const FacultySection: React.FC = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
             <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-secondary)]">
                Cohort Owners / Faculty
            </h2>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-8">
                {facultyData.map(faculty => <FacultyCard key={faculty.name} faculty={faculty} />)}
            </div>
            <p className="text-center text-xl font-semibold text-[var(--text-muted)] mt-10">
                Subject: Full Stack Development
            </p>
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