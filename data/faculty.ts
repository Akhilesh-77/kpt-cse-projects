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
    image: 'https://ik.imagekit.io/akhileshu/parashuram%20talawar%20sir.png'
};

export const facultyData: FacultyMember[] = [
    {
        id: slugify('Mrs. Leelavathi R.'),
        name: 'Mrs. Leelavathi R.',
        role: 'Selection Grade Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://ik.imagekit.io/akhileshu/leelavathi.png'
    },
    {
        id: slugify('Mr. Sathish S'),
        name: 'Mr. Sathish S',
        role: 'Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://ik.imagekit.io/akhileshu/sathish%20sir.jpg'
    },
    {
        id: slugify('Mrs. Usha Naik'),
        name: 'Mrs. Usha Naik',
        role: 'Lecturer',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://ik.imagekit.io/akhileshu/usha%20mam.png'
    }
];

export const guestLecturersData: FacultyMember[] = [
    {
        id: slugify('Mrs. Akshitha'),
        name: 'Mrs. Akshitha',
        role: 'Guest Lecturer',
        image: 'https://ik.imagekit.io/akhileshu/akshitha.png',
        subjects: 'Software Engineering, Data Base Management System'
    },
    {
        id: slugify('Mrs. Akshatha D'),
        name: 'Mrs. Akshatha D',
        role: 'Guest Lecturer',
        image: 'https://ik.imagekit.io/akhileshu/akshatha.png',
        subjects: 'Fundamentals of Computer'
    },
    {
        id: slugify('Mrs. Likhitha'),
        name: 'Mrs. Likhitha',
        role: 'Guest Lecturer',
        image: 'https://ik.imagekit.io/akhileshu/likitha.png',
        subjects: 'IT Skills, Computer Hardware Management System'
    },
    {
        id: slugify('Mrs. Sheetal J Shet'),
        name: 'Mrs. Sheetal J Shet',
        role: 'Guest Lecturer',
        image: 'https://ik.imagekit.io/akhileshu/sheethal.png',
        subjects: 'Computer Networking'
    }
];

export const labInstructorsData: FacultyMember[] = [
    {
        id: slugify('Bhoovika Salian'),
        name: 'Bhoovika Salian',
        role: 'Lab Instructor',
        department: 'Computer Science and Engineering Dept.',
        image: 'https://ik.imagekit.io/akhileshu/bhoovika.jpg'
    }
];

export const allFaculty: FacultyMember[] = [hodData, ...facultyData, ...guestLecturersData, ...labInstructorsData];