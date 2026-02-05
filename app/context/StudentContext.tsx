import React, { createContext, useContext, useState } from 'react';

// ...existing imports...
// Note: I will replace the main parts of the file to include new data.

// Define Data Types
export interface AttendanceStats {
  present: number;
  absent: number;
  leave: number;
  holiday: number;
  totalDays: number;
  percentage: number;
}

export interface TimetableItem {
  day?: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  icon: string;
  color: string;
  iconColor: string;
}

export interface QuizSubject {
  id: string;
  label: string;
  icon: string;
  color: string;
  iconColor: string;
  questionCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export interface HomeworkAssignment {
  id: string;
  subject: string;
  title: string;
  description: string;
  deadline: string;
  status: 'Pending' | 'Start' | 'Submitted';
  icon: string;
  color: string;
  iconColor: string;
}

export interface SyllabusTopic {
  id: string;
  subject: string;
  topics: { title: string; completed: boolean }[];
  progress: number;
  color: string;
  iconColor: string;
  icon: string;
}

export interface ExamSchedule {
  id: string;
  title: string;
  date: string;
  time: string;
  subject: string;
  room: string;
  status: 'Upcoming' | 'Completed';
}

export interface LeaveRequest {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  appliedOn: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  time: string;
  type: 'academic' | 'transport' | 'event' | 'alert';
  read: boolean;
  icon?: string; // Enhanced for specific icons
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  date: string;
  size: string;
  format: 'PDF' | 'DOC' | 'PPT';
  url: string; // Mock URL
}

export interface ReportItem {
  id: string;
  name: string;
  status: "Completed" | "Pending" | "Review";
  date: string;
}

interface StudentContextType {
  attendance: AttendanceStats;
  timetable: Record<string, TimetableItem[]>;
  subjects: QuizSubject[];
  homework: HomeworkAssignment[];
  syllabus: SyllabusTopic[];
  exams: ExamSchedule[];
  leaveRequests: LeaveRequest[];
  notifications: NotificationItem[];
  notes: StudyNote[];
  reports: ReportItem[];
  quizQuestions: Record<string, QuizQuestion[]>;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => Promise<void>;
  getQuizQuestions: (subjectId: string) => QuizQuestion[];
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

// Mock Data
const MOCK_ATTENDANCE: AttendanceStats = {
  present: 145,
  absent: 5,
  leave: 2,
  holiday: 12,
  totalDays: 164,
  percentage: 88.4,
};

const MOCK_SUBJECTS: QuizSubject[] = [
  { id: "1", label: "Mathematics", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0ea5e9", questionCount: 15 },
  { id: "2", label: "Science", icon: "flask-outline", color: "#f0fdf4", iconColor: "#22c55e", questionCount: 20 },
  { id: "3", label: "English", icon: "book-outline", color: "#fff7ed", iconColor: "#f59e0b", questionCount: 10 },
  { id: "4", label: "History", icon: "earth-outline", color: "#fef2f2", iconColor: "#ef4444", questionCount: 12 },
  { id: "5", label: "Geography", icon: "map-outline", color: "#faf5ff", iconColor: "#a855f7", questionCount: 15 },
  { id: "6", label: "Computers", icon: "desktop-outline", color: "#f0f9ff", iconColor: "#06b6d4", questionCount: 18 },
];

const MOCK_TIMETABLE: Record<string, TimetableItem[]> = {
  Mon: [
    { time: "08:00 - 08:45 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0284c7" },
    { time: "08:45 - 09:30 AM", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 2", icon: "flash-outline", color: "#fef2f2", iconColor: "#dc2626" },
    { time: "09:30 - 10:15 AM", subject: "English", teacher: "Ms. Davis", room: "Room 204", icon: "book-outline", color: "#fff7ed", iconColor: "#ea580c" },
    { time: "10:15 - 10:45 AM", subject: "Break", teacher: "-", room: "Cafeteria", icon: "cafe-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "10:45 - 11:30 AM", subject: "History", teacher: "Mr. Miller", room: "Room 301", icon: "earth-outline", color: "#faf5ff", iconColor: "#9333ea" },
    { time: "11:30 - 12:15 PM", subject: "Computer Science", teacher: "Dr. Lee", room: "Lab 3", icon: "desktop-outline", color: "#f0f9ff", iconColor: "#0891b2" },
  ],
  Tue: [
    { time: "08:00 - 08:45 AM", subject: "Biology", teacher: "Dr. Wilson", room: "Bio Lab", icon: "leaf-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "08:45 - 09:30 AM", subject: "Chemistry", teacher: "Dr. Brown", room: "Chem Lab", icon: "flask-outline", color: "#ecfdf5", iconColor: "#059669" },
    { time: "09:30 - 10:15 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0284c7" },
    { time: "10:15 - 10:45 AM", subject: "Break", teacher: "-", room: "Cafeteria", icon: "cafe-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "10:45 - 11:30 AM", subject: "Geography", teacher: "Ms. Taylor", room: "Room 205", icon: "map-outline", color: "#fef3c7", iconColor: "#d97706" },
  ],
  Wed: [
    { time: "08:00 - 08:45 AM", subject: "English", teacher: "Ms. Davis", room: "Room 204", icon: "book-outline", color: "#fff7ed", iconColor: "#ea580c" },
    { time: "08:45 - 09:30 AM", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 2", icon: "flash-outline", color: "#fef2f2", iconColor: "#dc2626" },
    { time: "09:30 - 10:15 AM", subject: "Art", teacher: "Mr. Garcia", room: "Art Studio", icon: "color-palette-outline", color: "#fce7f3", iconColor: "#db2777" },
  ],
  Thu: [
    { time: "08:00 - 08:45 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", icon: "calculator-outline", color: "#e0f2fe", iconColor: "#0284c7" },
    { time: "08:45 - 09:30 AM", subject: "History", teacher: "Mr. Miller", room: "Room 301", icon: "earth-outline", color: "#faf5ff", iconColor: "#9333ea" },
    { time: "09:30 - 10:15 AM", subject: "Music", teacher: "Ms. Anderson", room: "Music Room", icon: "musical-notes-outline", color: "#fef3c7", iconColor: "#ca8a04" },
  ],
  Fri: [
    { time: "08:00 - 08:45 AM", subject: "Computer Science", teacher: "Dr. Lee", room: "Lab 3", icon: "desktop-outline", color: "#f0f9ff", iconColor: "#0891b2" },
    { time: "08:45 - 09:30 AM", subject: "Chemistry", teacher: "Dr. Brown", room: "Chem Lab", icon: "flask-outline", color: "#ecfdf5", iconColor: "#059669" },
    { time: "09:30 - 10:15 AM", subject: "Physical Education", teacher: "Coach Roberts", room: "Gym", icon: "fitness-outline", color: "#fef2f2", iconColor: "#dc2626" },
  ],
  Sat: [
    { time: "08:00 - 08:45 AM", subject: "Biology", teacher: "Dr. Wilson", room: "Bio Lab", icon: "leaf-outline", color: "#f0fdf4", iconColor: "#16a34a" },
    { time: "08:45 - 09:30 AM", subject: "English", teacher: "Ms. Davis", room: "Room 204", icon: "book-outline", color: "#fff7ed", iconColor: "#ea580c" },
  ],
};

const MOCK_HOMEWORK: HomeworkAssignment[] = [
  { id: '1', subject: 'Mathematics', title: 'Algebra Exercises', description: 'Complete Chapter 4, Ex 4.1 to 4.3', deadline: '2023-10-25', status: 'Pending', icon: 'calculator-outline', color: '#e0f2fe', iconColor: '#0284c7' },
  { id: '2', subject: 'Physics', title: 'Laws of Motion Project', description: 'Submit the project report on Newton\'s Laws', deadline: '2023-10-28', status: 'Start', icon: 'flash-outline', color: '#fef2f2', iconColor: '#dc2626' },
  { id: '3', subject: 'English', title: 'Essay Writing', description: 'Write an essay on "Global Warming"', deadline: '2023-10-22', status: 'Submitted', icon: 'book-outline', color: '#fff7ed', iconColor: '#ea580c' },
];

const MOCK_SYLLABUS: SyllabusTopic[] = [
  { id: '1', subject: 'Mathematics', topics: [{ title: 'Algebra', completed: true }, { title: 'Geometry', completed: false }, { title: 'Trigonometry', completed: false }], progress: 0.33, color: '#e0f2fe', iconColor: '#0284c7', icon: 'calculator-outline' },
  { id: '2', subject: 'Science', topics: [{ title: 'Matter', completed: true }, { title: 'Energy', completed: true }, { title: 'Living Organisms', completed: false }], progress: 0.66, color: '#f0fdf4', iconColor: '#16a34a', icon: 'flask-outline' },
];

const MOCK_EXAMS: ExamSchedule[] = [
  { id: '1', title: 'Mid-Term Maths', date: '2023-11-10', time: '09:00 AM', subject: 'Mathematics', room: 'Hall A', status: 'Upcoming' },
  { id: '2', title: 'Mid-Term Physics', date: '2023-11-12', time: '09:00 AM', subject: 'Physics', room: 'Hall B', status: 'Upcoming' },
  { id: '3', title: 'Unit Test 1', date: '2023-09-15', time: '10:00 AM', subject: 'English', room: 'Class 10-A', status: 'Completed' },
];

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: '1', type: 'Sick Leave', fromDate: '2023-09-10', toDate: '2023-09-12', reason: 'High fever', status: 'Approved', appliedOn: '2023-09-09' },
  { id: '2', type: 'Casual Leave', fromDate: '2023-10-05', toDate: '2023-10-06', reason: 'Family function', status: 'Pending', appliedOn: '2023-10-01' },
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'New Course Available!', message: 'Check out our new "React Native Masterclass" course.', date: '2023-10-25', time: '2h ago', type: 'academic', read: false, icon: 'book-outline' },
  { id: '2', title: 'Assignment Graded', message: 'Your assignment for "UI Design" has been graded. Good job!', date: '2023-10-24', time: '5h ago', type: 'academic', read: true, icon: 'school-outline' },
  { id: '3', title: 'Update Available', message: 'A new update for the app is available.', date: '2023-10-15', time: '1d ago', type: 'alert', read: true, icon: 'cloud-upload-outline' },
  { id: '4', title: 'Welcome to MyApp!', message: 'Thanks for joining us. Let\'s start learning!', date: '2023-10-01', time: '2d ago', type: 'event', read: true, icon: 'happy-outline' },
];

const MOCK_NOTES: StudyNote[] = [
  { id: '1', title: 'Algebra Formulas', subject: 'Mathematics', date: '2023-10-01', size: '2.5 MB', format: 'PDF', url: '#' },
  { id: '2', title: 'Newton Laws', subject: 'Physics', date: '2023-09-25', size: '1.2 MB', format: 'DOC', url: '#' },
  { id: '3', title: 'Organic Chemistry Basics', subject: 'Chemistry', date: '2023-09-20', size: '5.0 MB', format: 'PPT', url: '#' },
];

const MOCK_REPORTS: ReportItem[] = [
  { id: "1", name: "Medical Board Exam Result", status: "Completed", date: "2023-08-15" },
  { id: "2", name: "Semester 1 Transcript", status: "Review", date: "2023-09-01" },
  { id: "3", name: "Lab Report - Biology", status: "Pending", date: "2023-10-25" },
  { id: "4", name: "Vaccination Record", status: "Pending", date: "2023-10-26" },
  { id: "5", name: "ID Proof / Adhaar Card", status: "Pending", date: "2023-10-27" },
];

const MOCK_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  "1": [ // Maths
    { id: "q1", question: "What is 15 + 27?", options: ["32", "42", "52", "45"], correct: 1 },
    { id: "q2", question: "What is the value of Pi (to 2 decimal places)?", options: ["3.12", "3.16", "3.14", "3.18"], correct: 2 },
    { id: "q3", question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correct: 2 },
  ],
  "2": [ // Science
      { id: "q1", question: "What is the chemical symbol for Water?", options: ["H2O", "O2", "CO2", "HO2"], correct: 0 },
  ],
  // Fallback for others
  default: [
    { id: "qd1", question: "Sample Question 1?", options: ["Option A", "Option B", "Option C", "Option D"], correct: 0 },
  ],
};


export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attendance] = useState<AttendanceStats>(MOCK_ATTENDANCE);
  const [subjects] = useState<QuizSubject[]>(MOCK_SUBJECTS);
  const [timetable] = useState<Record<string, TimetableItem[]>>(MOCK_TIMETABLE);
  
  const [homework, setHomework] = useState<HomeworkAssignment[]>(MOCK_HOMEWORK);
  const [syllabus, setSyllabus] = useState<SyllabusTopic[]>(MOCK_SYLLABUS);
  const [exams, setExams] = useState<ExamSchedule[]>(MOCK_EXAMS);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [notes, setNotes] = useState<StudyNote[]>(MOCK_NOTES);
  const [reports, setReports] = useState<ReportItem[]>(MOCK_REPORTS);
  const [quizQuestions] = useState<Record<string, QuizQuestion[]>>(MOCK_QUIZ_QUESTIONS);

  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addLeaveRequest = async (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRequest: LeaveRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };
    setLeaveRequests(prev => [newRequest, ...prev]);
    setIsLoading(false);
  };

  const getQuizQuestions = (subjectId: string) => {
    return quizQuestions[subjectId] || quizQuestions.default;
  };

  const value = {
    attendance,
    timetable,
    subjects,
    homework,
    syllabus,
    exams,
    leaveRequests,
    notifications,
    notes,
    reports,
    quizQuestions,
    isLoading,
    refreshData,
    markNotificationAsRead,
    addLeaveRequest,
    getQuizQuestions,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};
