
import { Syllabus } from './types';

export const MOCK_SYLLABUS: Syllabus = {
  semester: 4,
  branch: 'Computer Science',
  subjects: [
    {
      id: 'cs401',
      name: 'Data Structures & Algorithms',
      code: 'CS-401',
      topics: [
        { id: 't1', title: 'Binary Search Trees', videoUrl: 'https://example.com/v1', durationMinutes: 45, isPremium: false, completed: true },
        { id: 't2', title: 'Graph Traversal (BFS/DFS)', videoUrl: 'https://example.com/v2', durationMinutes: 60, isPremium: true, completed: false },
        { id: 't3', title: 'Dynamic Programming Basics', videoUrl: 'https://example.com/v3', durationMinutes: 90, isPremium: true, completed: false }
      ]
    },
    {
      id: 'cs402',
      name: 'Database Management Systems',
      code: 'CS-402',
      topics: [
        { id: 't4', title: 'Normalization (1NF-3NF)', videoUrl: 'https://example.com/v4', durationMinutes: 30, isPremium: false, completed: true },
        { id: 't5', title: 'SQL Joins & Subqueries', videoUrl: 'https://example.com/v5', durationMinutes: 45, isPremium: false, completed: false },
        { id: 't6', title: 'Transaction Management', videoUrl: 'https://example.com/v6', durationMinutes: 50, isPremium: true, completed: false }
      ]
    }
  ]
};

export const PREP_MODULES = [
  { id: 'apt', name: 'Aptitude', icon: 'Calculator' },
  { id: 'reasons', name: 'Reasoning', icon: 'Brain' },
  { id: 'prob', name: 'Problem Solving', icon: 'Code' },
  { id: 'soft', name: 'Soft Skills', icon: 'Users' }
];

export const APP_THEME = {
  primary: '#2563eb', // Blue-600
  secondary: '#f59e0b', // Amber-500
};
