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
