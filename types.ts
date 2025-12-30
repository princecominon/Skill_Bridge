
export interface User {
  name: string;
  college: string;
  branch: string;
  semester: string;
  isLoggedIn: boolean;
}

export interface Topic {
  id: string;
  title: string;
  videoUrl: string;
  durationMinutes: number;
  isPremium: boolean;
  completed: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  topics: Topic[];
}

export interface Syllabus {
  semester: number;
  branch: string;
  subjects: Subject[];
}

export enum NavigationTab {
  DASHBOARD = 'Dashboard',
  LEARNING = 'Learning',
  QUIZ = 'Quiz',
  PREP = 'Prep'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
