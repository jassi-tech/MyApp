import api from './api';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: string;
  categoryColor?: string;
  authorName?: string;
  authorRole?: string;
  attachments?: string[];
  date: string;
}

export interface Homework {
  id: string;
  subject: string;
  subjectColor?: string;
  title: string;
  description?: string;
  dueDate: string;
  status: string;
  priority: string;
  attachments?: string[];
  assignedDate: string;
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  date: string;
  isRead: boolean;
  priority: string;
  content?: string;
}

export interface Fee {
  id: string;
  month: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  date?: string;
  dueDate?: string;
  breakdown?: { label: string; amount: string }[];
}

export interface ExamResult {
  id: string;
  subject: string;
  marks: number;
  total: number;
  grade: string;
  examTitle?: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher?: string;
  room?: string;
  icon?: string;
  color?: string;
}

export interface Attendance {
  present: number;
  absent: number;
  leave: number;
  holiday: number;
  totalDays: number;
  percentage: number;
}

export interface QuizSubject {
  id: string;
  label: string;
  icon: string;
  color: string;
  iconColor: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
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
  status: string;
}

export interface StudyNote {
  id: string;
  title: string;
  subject: string;
  date: string;
  size: string;
  format: string;
  url: string;
}

export interface Report {
  id: string;
  name: string;
  status: string;
  date: string;
}

export const studentContentService = {
  getNotices: async (): Promise<Notice[]> => {
    const response = await api.get('/content/notices');
    return response.data;
  },

  getHomework: async (): Promise<Homework[]> => {
    const response = await api.get('/content/homework');
    return response.data;
  },

  getTimetable: async (day?: string): Promise<TimetableEntry[]> => {
    const response = await api.get('/content/timetable', {
      params: { day },
    });
    return response.data;
  },

  getAttendance: async (): Promise<Attendance> => {
    const response = await api.get('/content/attendance');
    return response.data;
  },

  getQuizSubjects: async (): Promise<QuizSubject[]> => {
    const response = await api.get('/content/quiz-subjects');
    return response.data;
  },

  getQuizQuestions: async (subjectId: string): Promise<QuizQuestion[]> => {
    const response = await api.get(`/content/quiz-questions/${subjectId}`);
    return response.data;
  },

  getSyllabus: async (): Promise<SyllabusTopic[]> => {
    const response = await api.get('/content/syllabus');
    return response.data;
  },

  getExams: async (): Promise<ExamSchedule[]> => {
    const response = await api.get('/content/exams');
    return response.data;
  },

  getLeaveRequests: async (): Promise<any[]> => {
    const response = await api.get('/content/leave-requests');
    return response.data;
  },

  createLeaveRequest: async (data: any): Promise<any> => {
    const response = await api.post('/content/leave-requests', data);
    return response.data;
  },

  getNotes: async (): Promise<StudyNote[]> => {
    const response = await api.get('/content/notes');
    return response.data;
  },

  getReports: async (): Promise<Report[]> => {
    const response = await api.get('/content/reports');
    return response.data;
  },

  getMessages: async (): Promise<Message[]> => {
    const response = await api.get('/content/messages');
    return response.data;
  },

  getFees: async (): Promise<Fee[]> => {
    const response = await api.get('/content/fees');
    return response.data;
  },

  getExamResults: async (): Promise<ExamResult[]> => {
    const response = await api.get('/content/exam-results');
    return response.data;
  },
};
