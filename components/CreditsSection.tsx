import React, { useState } from 'react';

const creatorData = {
    name: 'Akhilesh U',
    details: [
        'Sixth Semester',
        'Final Year Computer Science & Engg.',
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

const CreatorCard: React.FC<{ creator: typeof creatorData; onClick: () => void }> = ({ creator, onClick }) => (
    <div
        onClick={onClick}
        className="bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 flex flex-col items-center text-center gap-6 w-full max-w-sm transform transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in-up cursor-pointer hover:ring-2 hover:ring-[var(--accent)]"
        style={{ '--tw-shadow-color': 'var(--shadow-color)', boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)' } as React.CSSProperties}
        title="Click to visit portfolio"
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
    const [showRedirectModal, setShowRedirectModal] = useState(false);

    const handleRedirect = () => {
        window.open('https://akhileshhub.vercel.app/#/', '_blank');
        setShowRedirectModal(false);
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-secondary)] opacity-0 animate-fade-in-up">
                Creator
            </h2>
            <div className="flex justify-center items-center mb-12">
                <CreatorCard creator={creatorData} onClick={() => setShowRedirectModal(true)} />
            </div>

            <h2 className="text-3xl font-bold text-center mb-8 text-[var(--text-secondary)] opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Under the Guidance of
            </h2>
            <div className="text-center space-y-4 max-w-lg mx-auto">
                 {guidanceData.map((faculty, index) => (
                    <div 
                        key={faculty.name} 
                        className="bg-[var(--bg-tertiary)] p-4 rounded-lg opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${300 + index * 100}ms` }}
                    >
                        <p className="text-xl font-semibold text-[var(--text-primary)]">
                            {faculty.name}
                            <span className="block text-base font-normal text-[var(--text-secondary)]">{faculty.role}</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Redirect Confirmation Modal */}
            {showRedirectModal && (
                <div 
                    className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 animate-fade-in"
                    onClick={() => setShowRedirectModal(false)}
                >
                    <div 
                        className="bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border border-[var(--border-color)] transform transition-all scale-100"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Visit Portfolio?</h3>
                        <p className="text-[var(--text-secondary)] mb-8">
                            Do you want to be redirected to Akhilesh U's personal portfolio website?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => setShowRedirectModal(false)}
                                className="px-6 py-2 rounded-lg font-semibold bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-colors"
                            >
                                No
                            </button>
                            <button 
                                onClick={handleRedirect}
                                className="px-6 py-2 rounded-lg font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-[var(--shadow-color)]"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CreditsSection;
