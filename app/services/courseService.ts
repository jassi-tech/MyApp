import api from './api';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description?: string;
  order: number;
  videoUrl: string;
  thumbnail?: string;
  isFree: boolean;
  isPreview?: boolean;
  completed?: boolean; // Tracked via LessonProgress entity on backend
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  description: string;
  duration: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  level: string;
  studentsCount: number;
  reviewsCount: number;
  isTopAuthor?: boolean;
  lessons?: Lesson[];
  userProgress?: number; // Overall course progress percentage (0-100)
}

export const courseService = {
  getAllCourses: async (category?: string, search?: string): Promise<Course[]> => {
    const response = await api.get('/courses', {
      params: { category, search },
    });
    return response.data;
  },

  getCourseById: async (id: string): Promise<Course> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  getCourseLessons: async (id: string): Promise<Lesson[]> => {
    const response = await api.get(`/courses/${id}/lessons`);
    return response.data;
  },
  
  enrollInCourse: async (id: string): Promise<any> => {
    const response = await api.post(`/courses/${id}/enroll`);
    return response.data;
  },

  getEnrolledCourses: async (): Promise<Course[]> => {
    const response = await api.get('/courses/user/enrolled');
    return response.data;
  },

  updateLessonProgress: async (lessonId: string, isCompleted: boolean): Promise<any> => {
    const response = await api.post(`/courses/lessons/${lessonId}/progress`, { isCompleted });
    return response.data;
  },

  getLessonProgress: async (courseId: string): Promise<any[]> => {
    const response = await api.get(`/courses/${courseId}/progress`);
    return response.data;
  },
};
