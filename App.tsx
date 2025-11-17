import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Student, Theme, SortOption, FacultyMember } from './types';
import { students as initialStudents } from './data/students';
import { allFaculty } from './data/faculty';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import StudentGrid from './components/StudentGrid';
import ProjectModal from './components/ProjectModal';
import AddStudentModal from './components/AddStudentModal';
import EditStudentModal from './components/EditStudentModal';
import Toast from './components/Toast';
import ScrollToTopButton from './components/ScrollToTopButton';
import AdminLoginModal from './components/AdminLoginModal';
import SortControl from './components/SortControl';
import Navigation from './components/Navigation';
import FacultySection from './components/FacultySection';
import CreditsSection from './components/CreditsSection';
import ProjectsSection from './components/ProjectsSection';
import EventsSection from './components/EventsSection';
import AddEventModal from './components/AddEventModal';
import FacultyModal from './components/FacultyModal';

type Tab = 'home' | 'projects' | 'cohort-owners' | 'events' | 'credits';

const App: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('name-asc');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState<Tab>('home');

    const [isAdmin, setIsAdmin] = useState<boolean>(() => {
        return sessionStorage.getItem('isAdmin') === 'true';
    });

    const [students, setStudents] = useState<Student[]>(initialStudents);

    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'black';
    });

    useEffect(() => {
        document.documentElement.className = `theme-${theme}`;
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        sessionStorage.setItem('isAdmin', String(isAdmin));
    }, [isAdmin]);

    // Effect for handling URL changes on initial load and back/forward navigation
    useEffect(() => {
        const handleRouteChange = () => {
            const path = window.location.pathname;
            const hash = window.location.hash.substring(1);

            // Priority 1: Check for student/faculty modal paths
            const studentMatch = path.match(/^\/student\/([\w-]+)$/);
            if (studentMatch) {
                const registerNumber = studentMatch[1];
                const studentFromUrl = students.find(s => s.register_number === registerNumber);
                setSelectedStudent(studentFromUrl || null);
                setSelectedFaculty(null);
                return;
            }
            
            const facultyMatch = path.match(/^\/faculty\/([\w-]+)$/);
            if (facultyMatch) {
                const facultyId = facultyMatch[1];
                const facultyFromUrl = allFaculty.find(f => f.id === facultyId);
                setSelectedFaculty(facultyFromUrl || null);
                setSelectedStudent(null);
                if (facultyFromUrl) setActiveTab('cohort-owners');
                return;
            }

            // Priority 2: If no modal path, clear modals and set tab from hash
            setSelectedStudent(null);
            setSelectedFaculty(null);
            const hashPart = hash.split('?')[0];
            if (['projects', 'cohort-owners', 'events', 'credits'].includes(hashPart)) {
                setActiveTab(hashPart as Tab);
            } else {
                setActiveTab('home');
            }
        };

        handleRouteChange(); // Handle initial route
        window.addEventListener('popstate', handleRouteChange); // Handle back/forward
        
        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, [students]);


    const sortedAndFilteredStudents = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        let filtered = students;
        if (query) {
            filtered = students.filter(student =>
                student.name.toLowerCase().includes(query) ||
                student.register_number.toLowerCase().includes(query)
            );
        }

        if (sortOption === 'latest-asc') {
            const reversed = [...filtered].reverse();
            return reversed;
        }

        if (sortOption === 'projects-desc') {
            return [...filtered].sort((a, b) => {
                const countA = new Set(a.projects.filter(p => p.link).map(p => p.link)).size;
                const countB = new Set(b.projects.filter(p => p.link).map(p => p.link)).size;
                return countB - countA;
            });
        }

        const [sortBy, sortOrder] = sortOption.split('-');
        
        return [...filtered].sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else { // 'reg'
                comparison = a.register_number.localeCompare(b.register_number);
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [searchQuery, students, sortOption]);

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        const url = `/student/${student.register_number}`;
        window.history.pushState({ studentId: student.register_number }, student.name, url);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        const url = activeTab === 'home' ? '/' : `/#${activeTab}`;
        window.history.pushState(null, '', url);
    };

    const handleSelectFaculty = (faculty: FacultyMember) => {
        setSelectedFaculty(faculty);
        const url = `/faculty/${faculty.id}`;
        window.history.pushState({ facultyId: faculty.id }, faculty.name, url);
    };

    const handleCloseFacultyModal = () => {
        setSelectedFaculty(null);
        const url = activeTab === 'home' ? '/' : `/#${activeTab}`;
        window.history.pushState(null, '', url);
    };

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        const url = tab === 'home' ? '/' : `/#${tab}`;
        window.history.pushState(null, '', url);
    };

    const handleAddStudent = (newStudent: Student) => {
        setStudents(prevStudents => [...prevStudents, newStudent]);
        setAddModalOpen(false);
        setToastMessage('Student added successfully!');
    };
    
    const handleEditStudent = (updatedStudent: Student) => {
        setStudents(prevStudents => 
            prevStudents.map(s => 
                s.register_number === updatedStudent.register_number ? updatedStudent : s
            )
        );
        setStudentToEdit(null);
        setToastMessage('Student updated successfully!');
    };

    const handleDeleteStudent = (registerNumber: string) => {
        if (window.confirm('Are you sure you want to delete this student record? This action cannot be undone.')) {
            setStudents(prevStudents => prevStudents.filter(s => s.register_number !== registerNumber));
            handleCloseModal();
            setToastMessage('Student deleted successfully!');
        }
    };
    
    const handleOpenEditModal = (student: Student) => {
        setSelectedStudent(null);
        setStudentToEdit(student);
    };

    const handleLogin = () => {
        setIsAdmin(true);
        setLoginModalOpen(false);
        setToastMessage('Admin login successful!');
    };
    
    const handleLogout = () => {
        setIsAdmin(false);
        setToastMessage('Logged out.');
    };
    
    const handleExport = () => {
        const dataStr = JSON.stringify(students, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'students.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        setToastMessage('Data exported successfully!');
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    const importedStudents = JSON.parse(text);
                    if (Array.isArray(importedStudents)) {
                        setStudents(importedStudents);
                        setToastMessage('Data imported successfully!');
                    } else {
                        throw new Error("Invalid JSON format");
                    }
                }
            } catch (error) {
                console.error("Failed to import and parse file:", error);
                setToastMessage('Error: Invalid JSON file.');
            }
        };
        reader.readAsText(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const triggerImport = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
            <Header 
                currentTheme={theme} 
                setTheme={setTheme}
                isAdmin={isAdmin}
                onLoginClick={() => setLoginModalOpen(true)}
                onLogoutClick={handleLogout}
                onExportClick={handleExport}
                onImportClick={triggerImport}
            />
            <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
            
            {activeTab === 'home' && (
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                        <SearchBar 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or register number..."
                        />
                        <SortControl sortOption={sortOption} setSortOption={setSortOption} />
                    </div>

                    {students.length > 0 ? (
                        <StudentGrid students={sortedAndFilteredStudents} onSelectStudent={handleSelectStudent} />
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold text-[var(--text-secondary)]">No Students Found</h2>
                            <p className="text-[var(--text-muted)] mt-2">
                                {isAdmin ? "Click the '+' button to add the first student!" : "Contact an admin to add student data."}
                            </p>
                        </div>
                    )}
                </main>
            )}

            {activeTab === 'projects' && <ProjectsSection students={students} />}

            {activeTab === 'cohort-owners' && <FacultySection onSelectFaculty={handleSelectFaculty} />}

            {activeTab === 'events' && <EventsSection onAddEventClick={() => setAddEventModalOpen(true)} />}

            {activeTab === 'credits' && <CreditsSection />}

            {isAdmin && activeTab === 'home' && (
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="fixed bottom-6 right-6 bg-[var(--accent)] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl font-bold hover:bg-[var(--accent-hover)] transition-all duration-300 transform hover:scale-110 z-30"
                    aria-label="Add Student"
                >
                    +
                </button>
            )}
            
            <ProjectModal 
                student={selectedStudent} 
                onClose={handleCloseModal}
                isAdmin={isAdmin}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteStudent}
                setToastMessage={setToastMessage}
            />

            <FacultyModal
                faculty={selectedFaculty}
                onClose={handleCloseFacultyModal}
                setToastMessage={setToastMessage}
            />
            
            {isAdmin && (
                <>
                    <AddStudentModal 
                        isOpen={isAddModalOpen} 
                        onClose={() => setAddModalOpen(false)} 
                        onAddStudent={handleAddStudent} 
                    />
                    <EditStudentModal
                        isOpen={!!studentToEdit}
                        onClose={() => setStudentToEdit(null)}
                        onEditStudent={handleEditStudent}
                        student={studentToEdit}
                    />
                </>
            )}

            <AdminLoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
                onLogin={handleLogin}
            />
            
            <AddEventModal
                isOpen={isAddEventModalOpen}
                onClose={() => setAddEventModalOpen(false)}
                setToastMessage={setToastMessage}
            />
            
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            <ScrollToTopButton />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/json"
                onChange={handleImport}
            />
        </div>
    );
};

export default App;