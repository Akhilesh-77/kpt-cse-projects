import React, { useState, useMemo, useEffect } from 'react';
import { Student, Project } from '../types';

interface ProcessedProject {
    project: Project;
    students: Student[];
}

interface ProjectsSectionProps {
    students: Student[];
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


const ProjectInfoCard: React.FC<{ processedProject: ProcessedProject }> = ({ processedProject }) => {
    const { project, students } = processedProject;
    const isGroupProject = students.length > 1;

    return (
        <div 
            className="bg-[var(--bg-secondary)] rounded-lg shadow-lg p-6 flex flex-col justify-between border-2 border-transparent hover:border-[var(--accent)] transition-all duration-300"
            style={{ '--tw-shadow-color': 'var(--shadow-color)', boxShadow: '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)' } as React.CSSProperties}
        >
            <div>
                <h4 className="text-xl font-bold text-[var(--accent)]">{project.title}</h4>
                {isGroupProject && (
                    <span className="inline-block bg-[var(--bg-tertiary)] text-[var(--accent)] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full mt-2">
                        Group Project
                    </span>
                )}
                <p className="text-[var(--text-secondary)] mt-2 mb-4 h-24 overflow-y-auto">{project.description}</p>
                <div className="mb-4">
                    <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Created by:</p>
                    <div className="flex flex-wrap gap-2">
                        {students.map(s => (
                            <div key={s.register_number} className="flex items-center bg-[var(--bg-tertiary)] rounded-full pr-3">
                                <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
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
                className="inline-flex items-center justify-center px-4 py-2 mt-auto bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors duration-300 font-semibold"
            >
                Visit Project
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
    );
};

const CounterCard: React.FC<{ label: string; count: number }> = ({ label, count }) => {
    const animatedCount = useCountUp(count);
    return (
        <div className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-md border border-[var(--border-color)] text-center flex-1 min-w-[150px]">
            <p className="text-3xl font-bold text-[var(--accent)]">{animatedCount}</p>
            <p className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">{label}</p>
        </div>
    );
};


const ProjectsSection: React.FC<ProjectsSectionProps> = ({ students }) => {
    const [filter, setFilter] = useState<'all' | 'single' | 'group'>('all');

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
        return Array.from(projectMap.values()).sort((a,b) => a.project.title.localeCompare(b.project.title));
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

    const FilterButton: React.FC<{label: string, value: typeof filter, count: number}> = ({ label, value, count }) => {
        const isActive = filter === value;
        const baseClasses = "relative px-4 py-2 rounded-md font-semibold transition-colors duration-300";
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-center mb-4 text-[var(--text-secondary)]">
                Projects Showcase
            </h2>
            <p className="text-center text-lg text-[var(--text-muted)] mb-8">
                A collection of all unique projects submitted by students.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                <CounterCard label="All Projects" count={projectCounts.all} />
                <CounterCard label="Single Projects" count={projectCounts.single} />
                <CounterCard label="Group Projects" count={projectCounts.group} />
            </div>

            <div className="flex justify-center items-center gap-4 mb-12">
                <FilterButton label="All Projects" value="all" count={projectCounts.all} />
                <FilterButton label="Single Projects" value="single" count={projectCounts.single} />
                <FilterButton label="Group Projects" value="group" count={projectCounts.group} />
            </div>

            {filteredProjects.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects.map(({ project }) => (
                        <ProjectInfoCard key={project.link} processedProject={processedProjects.find(p => p.project.link === project.link)!} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-[var(--text-secondary)]">No Projects Found</h2>
                    <p className="text-[var(--text-muted)] mt-2">
                        There are no projects in this category.
                    </p>
                </div>
            )}
           
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

export default ProjectsSection;