import React, { useState, useMemo, useEffect } from 'react';
import { Student, Project } from '../types';
import FloatingFacts from './FloatingFacts';

interface ProcessedProject {
    project: Project;
    students: Student[];
}

interface ProjectsSectionProps {
    students: Student[];
    onAddProjectClick: () => void;
}

const useCountUp = (end: number, duration: number = 1500) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease-out quad function for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            let currentCount = Math.round(end * easedProgress);
            
            // Prevent overshoot
            if (currentCount > end) {
                currentCount = end;
            }

            setCount(currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
                setCount(end);
            }
        }, frameRate);

        return () => {
            setCount(0); // Reset on unmount
            clearInterval(counter);
        }
    }, [end, duration]);

    return count;
};


const ProjectInfoCard: React.FC<{ processedProject: ProcessedProject; className?: string; style?: React.CSSProperties; }> = ({ processedProject, className, style }) => {
    const { project, students } = processedProject;
    const isGroupProject = students.length > 1;
    const isSpecialProject = project.title === 'Full Stack Development Lab Manual Website & Lab Manual';
    const isOfficialProject = project.title === 'KPT Mangalore College Website';

    const cardClasses = isSpecialProject
        ? `bg-[var(--bg-secondary)] rounded-lg shadow-lg p-6 flex flex-col justify-between border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-all duration-300 ${className}`
        : isOfficialProject
            ? `bg-[var(--bg-secondary)] rounded-lg shadow-lg p-6 flex flex-col justify-between border-2 border-[var(--accent)] shadow-[0_0_15px_var(--shadow-color)] hover:shadow-[0_0_25px_var(--shadow-color)] transition-all duration-300 ${className}`
            : `bg-[var(--bg-secondary)] rounded-lg shadow-lg p-6 flex flex-col justify-between border-2 border-transparent hover:border-[var(--accent)] transition-all duration-300 ${className}`;

    // Merge custom styles with shadow color logic, ensuring special/official project shadow takes precedence in class
    const combinedStyle = {
        '--tw-shadow-color': 'var(--shadow-color)',
        boxShadow: (isSpecialProject || isOfficialProject) ? undefined : '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)',
        ...style
    } as React.CSSProperties;

    return (
        <div 
            className={cardClasses}
            style={combinedStyle}
        >
            <div>
                <h4 className="text-xl font-bold text-[var(--accent)]">{project.title}</h4>
                {isGroupProject && (
                    <span className="inline-block bg-[var(--bg-tertiary)] text-[var(--accent)] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mt-2">
                        Group Project
                    </span>
                )}
                <p className="text-[var(--text-secondary)] mt-2 mb-4 h-24 overflow-y-auto">{project.description}</p>
                {project.contributor && (
                    <p className="text-sm text-[var(--text-muted)] mb-4 italic">
                         <span className="font-semibold">Contributor:</span> {project.contributor}
                    </p>
                )}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Created by:</p>
                    <div className="flex flex-wrap gap-2">
                        {students.map(s => (
                            <div key={s.register_number} className="flex items-center bg-[var(--bg-tertiary)] rounded-md pr-3 overflow-hidden">
                                <img src={s.avatar} alt={s.name} className="w-6 h-6 object-contain bg-[var(--bg-secondary)]" />
                                <span className="text-xs text-[var(--text-secondary)] ml-2">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 mt-auto bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-all duration-300 font-semibold transform hover:-translate-y-0.5 active:scale-95"
            >
                Visit Project
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    );
};

const CounterCard: React.FC<{ label: string; count: number; style?: React.CSSProperties }> = ({ label, count, style }) => {
    const animatedCount = useCountUp(count);
    return (
        <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-md border border-[var(--border-color)] text-center flex-1 min-w-[150px] opacity-0 animate-fade-in-up" style={style}>
            <p className="text-3xl font-bold text-[var(--accent)]">{animatedCount}</p>
            <p className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">{label}</p>
        </div>
    );
};

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);


const ProjectsSection: React.FC<ProjectsSectionProps> = ({ students, onAddProjectClick }) => {
    const [filter, setFilter] = useState<'all' | 'single' | 'group'>('all');

    const projectFacts = [
        "All projects are displayed using responsive cards.",
        "KPT projects are filtered automatically by keyword.",
        "Each project has its own redirect confirmation.",
        "Projects support individual sharing links.",
        "Projects counter auto-updates based on total cards.",
        "Each project can open an external live website.",
        "Project images follow 16:9 ratio standards.",
        "Projects can be grouped into categories.",
        "KPT project pages have their own QR share.",
        "This section is optimized for academic presentation."
    ];

    const processedProjects = useMemo(() => {
        const projectMap = new Map<string, ProcessedProject>();

        students.forEach(student => {
            const uniqueLinksInStudent = new Set<string>();
            student.projects.forEach(project => {
                if (project.link && !uniqueLinksInStudent.has(project.link)) {
                    uniqueLinksInStudent.add(project.link);
                    if (projectMap.has(project.link)) {
                        projectMap.get(project.link)!.students.push(student);
                    } else {
                        projectMap.set(project.link, { project, students: [student] });
                    }
                }
            });
        });
        
        return Array.from(projectMap.values()).sort((a, b) => {
            const titleA = a.project.title;
            const titleB = b.project.title;

            // Special ordering logic to keep Akhilesh U and Chaithanya together
            // Swap 'Personal Portfolio Website' (Akhilesh) and 'Personal Resume Portfolio' (Samradh)
            // so Akhilesh appears immediately before the 'Portfolio Website (Resume)' group.
            if (titleA === 'Personal Portfolio Website' && titleB === 'Personal Resume Portfolio') return 1;
            if (titleA === 'Personal Resume Portfolio' && titleB === 'Personal Portfolio Website') return -1;

            const comparison = titleA.localeCompare(titleB);
            if (comparison !== 0) return comparison;

            // Within identical titles (specifically 'Portfolio Website (Resume)'), place Chaithanya first
            const isChaithanyaA = a.students.some(s => s.name === 'CHAITHANYA');
            const isChaithanyaB = b.students.some(s => s.name === 'CHAITHANYA');
            
            if (isChaithanyaA && !isChaithanyaB) return -1;
            if (!isChaithanyaA && isChaithanyaB) return 1;

            return 0;
        });
    }, [students]);

    const projectCounts = useMemo(() => ({
        all: processedProjects.length,
        single: processedProjects.filter(p => p.students.length === 1).length,
        group: processedProjects.filter(p => p.students.length > 1).length
    }), [processedProjects]);

    const filteredProjects = useMemo(() => {
        switch(filter) {
            case 'single':
                return processedProjects.filter(p => p.students.length === 1);
            case 'group':
                return processedProjects.filter(p => p.students.length > 1);
            default: // 'all'
                return processedProjects;
        }
    }, [processedProjects, filter]);

    const handleShare = async () => {
        const shareData = {
            title: 'KPT CSE Projects Showcase',
            text: 'Check out all the unique projects submitted by students from KPT Computer Science & Engineering!',
            url: `${window.location.origin}/#projects`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Sharing failed:', error);
            }
        } else {
            console.log('Web Share API not supported in this browser.');
        }
    };

    const FilterButton: React.FC<{label: string, value: typeof filter, count: number}> = ({ label, value, count }) => {
        const isActive = filter === value;
        const baseClasses = "relative px-4 py-2 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95";
        const activeClasses = "bg-[var(--accent)] text-white";
        const inactiveClasses = "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/70 hover:text-[var(--text-primary)]";
        
        return (
            <button onClick={() => setFilter(value)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                {label}
                <span className={`absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full ${isActive ? 'bg-white text-[var(--accent)]' : 'bg-[var(--accent)] text-white'}`}>
                    {count}
                </span>
            </button>
        );
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
            <div className="flex justify-center items-center gap-4 text-center mb-4 opacity-0 animate-fade-in-up">
                <h2 className="text-4xl font-bold text-[var(--text-secondary)]">
                    Projects Showcase
                </h2>
                {navigator.share && (
                    <button 
                        onClick={handleShare}
                        className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]" 
                        aria-label="Share Projects Page"
                    >
                        <ShareIcon />
                    </button>
                )}
            </div>
            <p className="text-center text-lg text-[var(--text-muted)] mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                A collection of all unique projects submitted by students.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                <CounterCard label="All Projects" count={projectCounts.all} style={{ animationDelay: '200ms' }} />
                <CounterCard label="Single Projects" count={projectCounts.single} style={{ animationDelay: '300ms' }} />
                <CounterCard label="Group Projects" count={projectCounts.group} style={{ animationDelay: '400ms' }} />
            </div>

            <div className="flex justify-center items-center gap-4 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <FilterButton label="All Projects" value="all" count={projectCounts.all} />
                <FilterButton label="Single Projects" value="single" count={projectCounts.single} />
                <FilterButton label="Group Projects" value="group" count={projectCounts.group} />
            </div>

            {filteredProjects.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map(({ project }, index) => (
                        <ProjectInfoCard 
                            key={project.link} 
                            processedProject={processedProjects.find(p => p.project.link === project.link)!}
                            className="opacity-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 75}ms` }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 opacity-0 animate-fade-in-up">
                    <h2 className="text-2xl font-semibold text-[var(--text-secondary)]">No Projects Found</h2>
                    <p className="text-[var(--text-muted)] mt-2">
                        There are no projects in this category.
                    </p>
                </div>
            )}

            {/* Floating Facts for Projects Page - Above the Plus Button */}
            <FloatingFacts facts={projectFacts} className="bottom-40 right-6" alignment="right" />

            <button
                onClick={onAddProjectClick}
                title="Add New Project"
                aria-label="Add New Project"
                className="fixed bottom-6 right-6 bg-[var(--accent)] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold hover:bg-[var(--accent-hover)] transition-all duration-300 transform hover:scale-110 z-30"
            >
                +
            </button>
        </section>
    );
};

export default ProjectsSection;
