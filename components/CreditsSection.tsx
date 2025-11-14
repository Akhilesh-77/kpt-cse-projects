import React from 'react';

const creatorData = {
    name: 'Akhilesh U',
    details: [
        '5th Semester',
        'Third Year CSE',
        'Karnataka (Govt.) Polytechnic Mangalore'
    ],
    image: 'https://i.postimg.cc/0Mm4fF5Y/akhilesh.jpg'
};

const guidanceData = [
    {
        name: 'Prof. Parashuram D Talwar',
        role: 'Head of Department of CS',
    },
    {
        name: 'Mrs. Leelavathi R.',
        role: 'Selection Grade Lecturer (CS)',
    },
    {
        name: 'Mr. Sathish S',
        role: 'Lecturer (CS)',
    }
];

const CreatorCard: React.FC<{ creator: typeof creatorData }> = ({ creator }) => (
    <div
        className="bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 flex flex-col items-center text-center gap-6 w-full max-w-sm transform transition-all duration-300 hover:scale-105"
        style={{ '--tw-shadow-color': 'var(--shadow-color)', boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)' } as React.CSSProperties}
    >
        <img src={creator.image} alt={`Profile of ${creator.name}`} className="w-32 h-32 rounded-full object-cover border-4 border-[var(--border-color)]" />
        <div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{creator.name}</h3>
            {creator.details.map((detail, index) => (
                 <p key={index} className="text-md text-[var(--text-secondary)] mt-2">{detail}</p>
            ))}
        </div>
    </div>
);


const CreditsSection: React.FC = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
             <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-secondary)]">
                Creator
            </h2>
            <div className="flex justify-center items-center mb-12">
                <CreatorCard creator={creatorData} />
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-secondary)]">
                Under the Guidance of
            </h2>
            <div className="text-center space-y-4 max-w-lg mx-auto">
                 {guidanceData.map((faculty) => (
                    <div key={faculty.name} className="bg-[var(--bg-tertiary)] p-4 rounded-lg">
                        <p className="text-xl font-semibold text-[var(--text-primary)]">
                            {faculty.name}
                            <span className="block text-base font-normal text-[var(--text-secondary)]">{faculty.role}</span>
                        </p>
                    </div>
                ))}
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

export default CreditsSection;