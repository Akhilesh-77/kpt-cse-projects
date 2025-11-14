export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface Student {
  name: string;
  register_number: string;
  avatar: string;
  projects: Project[];
}

export interface FacultyMember {
    id: string;
    name: string;
    role: string;
    image: string;
    department?: string;
    subjects?: string;
}

export type Theme = 'black' | 'white' | 'pink';

export type SortOption = 'name-asc' | 'name-desc' | 'reg-asc' | 'reg-desc' | 'latest-asc' | 'projects-desc';