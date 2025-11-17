import { FacultyMember } from '../types';

const slugify = (name: string) => name.toLowerCase()
    .replace(/\./g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

export const hodData: FacultyMember = {
    id: slugify('Prof. Parashuram D Talwar'),
    name: 'Prof. Parashuram D Talwar',
    role: 'Head of Department of CS',
    department: 'Computer Science and Engineering Dept.',
    image: 'https://i.postimg.cc/SKMG7FyZ/parashuram-talawar-sir.png'
};

export const facultyData: FacultyMember[] = [
    {
        id: slugify('Mrs. Leelavathi R.'),
        name: 'Mrs. Leelavathi R.',
        role: 'Selection Grade Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://i.postimg.cc/N9R7ywb5/leelavathi-mam-jpg.png'
    },
    {
        id: slugify('Mr. Sathish S'),
        name: 'Mr. Sathish S',
        role: 'Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://i.postimg.cc/S2yQF6XM/sathish-sir.jpg'
    },
    {
        id: slugify('Mrs. Usha Naik'),
        name: 'Mrs. Usha Naik',
        role: 'Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://i.postimg.cc/Px4DZcrC/usha-mam.png'
    }
];

export const guestLecturersData: FacultyMember[] = [
    {
        id: slugify('Mrs. Akshitha'),
        name: 'Mrs. Akshitha',
        role: 'Guest Lecturer',
        image: 'https://i.postimg.cc/wMrPF143/akshitha.png',
        subjects: 'Software Engineering, DBMS'
    },
    {
        id: slugify('Mrs. Akshatha D'),
        name: 'Mrs. Akshatha D',
        role: 'Guest Lecturer',
        image: 'https://i.postimg.cc/N0xzSJPw/akshatha.png',
        subjects: 'FOC (Fundamentals of Computer)'
    },
    {
        id: slugify('Mrs. Likhitha'),
        name: 'Mrs. Likhitha',
        role: 'Guest Lecturer',
        image: 'https://i.postimg.cc/1zyWG0RG/likitha.png',
        subjects: 'IT Skills, Computer Hardware Management System'
    },
    {
        id: slugify('Mrs. Sheetal J Shet'),
        name: 'Mrs. Sheetal J Shet',
        role: 'Guest Lecturer',
        image: 'https://i.postimg.cc/9X4jw2nC/sheethal.png',
        subjects: 'Computer Networking'
    },
    {
        id: slugify('Bhoovika Salian'),
        name: 'Bhoovika Salian',
        role: 'Lab Instructor',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://i.postimg.cc/VN4WLR7Q/bhoovika.jpg'
    }
];

export const allFaculty: FacultyMember[] = [hodData, ...facultyData, ...guestLecturersData];