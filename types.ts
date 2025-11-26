
export interface Project {
  title: string;
  description: string;
  link: string;
  contributor?: string;
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

export interface Event {
  id: number;
  title: string;
  description: string;
  images: string[];
  timestamp: string;
}

export type Theme = 'black' | 'white' | 'pink' | 'yellow';

export type SortOption = 'name-asc' | 'name-desc' | 'reg-asc' | 'reg-desc' | 'latest-asc' | 'projects-desc';
