import React, { createContext, useContext, useEffect, useState } from 'react';
import { studentContentService, Notice, Homework, TimetableEntry, Attendance, QuizSubject, QuizQuestion, SyllabusTopic, ExamSchedule, StudyNote, Report, Message, Fee, ExamResult } from '../services/studentContentService';

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
  id?: string;
  day?: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  icon: string;
  color: string;
  iconColor: string;
}

export { QuizSubject, QuizQuestion, SyllabusTopic, ExamSchedule, StudyNote, Report as ReportItem, Message, Fee, ExamResult };

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
  icon?: string;
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
  reports: Report[];
  quizQuestions: Record<string, QuizQuestion[]>;
  messages: Message[];
  fees: Fee[];
  examResults: ExamResult[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => Promise<void>;
  getQuizQuestions: (subjectId: string) => Promise<QuizQuestion[]>;
  markMessageAsRead: (id: string) => Promise<void>;
  submitFeePayment: (id: string) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [attendance, setAttendance] = useState<AttendanceStats>({ present: 0, absent: 0, leave: 0, holiday: 0, totalDays: 0, percentage: 0 });
  const [subjects, setSubjects] = useState<QuizSubject[]>([]);
  const [timetable, setTimetable] = useState<Record<string, TimetableItem[]>>({});
  const [homework, setHomework] = useState<HomeworkAssignment[]>([]);
  const [syllabus, setSyllabus] = useState<SyllabusTopic[]>([]);
  const [exams, setExams] = useState<ExamSchedule[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [quizQuestionsCache, setQuizQuestionsCache] = useState<Record<string, QuizQuestion[]>>({});

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [
        backendHomework,
        backendNotices,
        backendAttendance,
        backendSubjects,
        backendSyllabus,
        backendExams,
        backendLeave,
        backendNotes,
        backendReports,
        backendTimetable,
        backendMessages,
        backendFees,
        backendResults
      ] = await Promise.all([
        studentContentService.getHomework(),
        studentContentService.getNotices(),
        studentContentService.getAttendance(),
        studentContentService.getQuizSubjects(),
        studentContentService.getSyllabus(),
        studentContentService.getExams(),
        studentContentService.getLeaveRequests(),
        studentContentService.getNotes(),
        studentContentService.getReports(),
        studentContentService.getTimetable(),
        studentContentService.getMessages(),
        studentContentService.getFees(),
        studentContentService.getExamResults(),
      ]);

      if (backendAttendance) setAttendance(backendAttendance);
      if (backendSubjects) setSubjects(backendSubjects);
      if (backendSyllabus) setSyllabus(backendSyllabus);
      if (backendExams) setExams(backendExams);
      if (backendNotes) setNotes(backendNotes);
      if (backendReports) setReports(backendReports);
      if (backendMessages) setMessages(backendMessages);
      if (backendFees) setFees(backendFees);
      if (backendResults) setExamResults(backendResults);
      
      if (backendLeave) {
        setLeaveRequests(backendLeave.map(l => ({
          ...l,
          appliedOn: new Date(l.appliedOn).toISOString().split('T')[0]
        })));
      }

      if (backendHomework) {
        setHomework(backendHomework.map(hw => ({
          id: hw.id,
          subject: hw.subject,
          title: hw.title,
          description: hw.description || '',
          deadline: new Date(hw.dueDate).toISOString().split('T')[0],
          status: hw.status as any,
          icon: 'calendar-outline',
          color: hw.subjectColor || '#e0f2fe',
          iconColor: '#0284c7',
        })));
      }

      if (backendNotices) {
        setNotifications(backendNotices.map(notice => ({
          id: notice.id,
          title: notice.title,
          message: notice.content,
          date: new Date(notice.date).toISOString().split('T')[0],
          time: 'Recently',
          type: (notice.category?.toLowerCase() === 'important' ? 'alert' : 'academic') as any,
          read: false,
          icon: notice.category === 'Important' ? 'alert-circle-outline' : 'notifications-outline',
        })));
      }

      if (backendTimetable) {
        const grouped: Record<string, TimetableItem[]> = {};
        backendTimetable.forEach(item => {
          if (!grouped[item.day]) grouped[item.day] = [];
          grouped[item.day].push({
            id: item.id,
            time: item.time,
            subject: item.subject,
            teacher: item.teacher || '-',
            room: item.room || '-',
            icon: item.icon || 'book-outline',
            color: item.color || '#e0f2fe',
            iconColor: '#0284c7',
          });
        });
        setTimetable(grouped);
      }
    } catch (error) {
      console.error('Failed to fetch student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    await fetchData();
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addLeaveRequest = async (request: Omit<LeaveRequest, 'id' | 'status' | 'appliedOn'>) => {
    setIsLoading(true);
    try {
      const newRequest = await studentContentService.createLeaveRequest(request);
      setLeaveRequests(prev => [{
        ...newRequest,
        appliedOn: new Date(newRequest.appliedOn).toISOString().split('T')[0]
      }, ...prev]);
    } catch (error) {
      console.error('Failed to add leave request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getQuizQuestions = async (subjectId: string) => {
    if (quizQuestionsCache[subjectId]) return quizQuestionsCache[subjectId];
    try {
      const questions = await studentContentService.getQuizQuestions(subjectId);
      setQuizQuestionsCache(prev => ({ ...prev, [subjectId]: questions }));
      return questions;
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error);
      return [];
    }
  };

  const markMessageAsRead = async (id: string) => {
    // Optimistic update
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    // In a real app we would call an API here
  };

  const submitFeePayment = async (id: string) => {
    setIsLoading(true);
    try {
      // Mock payment success
      setFees(prev => prev.map(f => f.id === id ? { ...f, status: 'paid', date: new Date().toLocaleDateString() } : f));
    } finally {
      setIsLoading(false);
    }
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
    messages,
    fees,
    examResults,
    quizQuestions: quizQuestionsCache,
    isLoading,
    refreshData,
    markNotificationAsRead,
    addLeaveRequest,
    getQuizQuestions,
    markMessageAsRead,
    submitFeePayment,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};
