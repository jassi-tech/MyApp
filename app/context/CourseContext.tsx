import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Course, courseService } from '../services/courseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CourseContextType {
  allCourses: Course[];
  purchasedCourseIds: string[];
  purchasedCourses: Course[];
  courseProgress: Record<string, number>;
  purchaseCourse: (id: string) => void;
  isCoursePurchased: (id: string) => boolean;
  loading: boolean;
  error: string | null;
  refreshCourses: () => Promise<void>;
  getCourseDetails: (id: string) => Promise<Course | null>;
  toggleLessonProgress: (courseId: string, lessonId: string, completed: boolean) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Start with no purchased courses - users must purchase from Store
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Always fetch all courses (public)
      const allData = await courseService.getAllCourses();
      setAllCourses(allData);

      // Attempt to fetch enrolled courses if we might be logged in
      try {
        const storedUser = await AsyncStorage.getItem('user_session');
        if (storedUser) {
          const enrolledData = await courseService.getEnrolledCourses();
          setPurchasedCourseIds(enrolledData.map(c => c.id));
          
          const progressMap: Record<string, number> = {};
          enrolledData.forEach(c => {
            progressMap[c.id] = c.userProgress ?? 0;
          });
          setCourseProgress(progressMap);
        } else {
          setPurchasedCourseIds([]);
          setCourseProgress({});
        }
      } catch (authErr) {
        // Silently fail auth-specific fetch - guest mode
        console.log('Guest mode or auth failed fetching enrolled courses:', authErr);
        setPurchasedCourseIds([]);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const purchaseCourse = async (id: string) => {
    try {
      await courseService.enrollInCourse(id);
      // Refresh everything to get updated enrollment status and progress from backend
      await fetchCourses();
    } catch (err) {
      console.error('Failed to enroll in course:', err);
    }
  };

  const isCoursePurchased = (id: string) => purchasedCourseIds.includes(id);

  const purchasedCourses = useMemo(() => {
    return allCourses.filter((course) => purchasedCourseIds.includes(course.id));
  }, [allCourses, purchasedCourseIds]);

  const getCourseDetails = async (id: string) => {
    try {
      const details = await courseService.getCourseById(id);
      if (!details) return null;
      
      // If logged in, attempt to fetch and merge progress
      try {
        const storedUser = await AsyncStorage.getItem('user_session');
        if (storedUser && details.lessons) {
          const progressData = await courseService.getLessonProgress(id);
          if (progressData && Array.isArray(progressData)) {
            const completedLessonIds = new Set(progressData.filter(p => p.isCompleted).map(p => p.lesson.id));
            
            details.lessons = details.lessons.map(lesson => ({
              ...lesson,
              completed: completedLessonIds.has(lesson.id)
            }));
          }
        }
      } catch (progressErr) {
        console.log('Failed to fetch lesson progress (possibly guest or expired session):', progressErr);
        // Continue anyway, just without progress highlights
      }
      
      return details;
    } catch (err) {
      console.error('Failed to fetch course details:', err);
      return null;
    }
  };

  const toggleLessonProgress = async (courseId: string, lessonId: string, completed: boolean) => {
    try {
      await courseService.updateLessonProgress(lessonId, completed);
      // Refresh to update progress bars elsewhere
      await fetchCourses();
    } catch (err) {
      console.error('Failed to update lesson progress:', err);
    }
  };

  const value = {
    allCourses,
    purchasedCourseIds,
    purchasedCourses,
    courseProgress,
    purchaseCourse,
    isCoursePurchased,
    loading,
    error,
    refreshCourses: fetchCourses,
    getCourseDetails,
    toggleLessonProgress,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
