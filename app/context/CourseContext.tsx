import { COURSES, Course } from '@/constants/courses';
import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

interface CourseContextType {
  allCourses: Course[];
  purchasedCourseIds: string[];
  purchasedCourses: Course[];
  purchaseCourse: (id: string) => void;
  isCoursePurchased: (id: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  // Start with no purchased courses - users must purchase from Store
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);

  const purchaseCourse = (id: string) => {
    setPurchasedCourseIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const isCoursePurchased = (id: string) => purchasedCourseIds.includes(id);

  const purchasedCourses = useMemo(() => {
    return COURSES.filter((course) => purchasedCourseIds.includes(course.id));
  }, [purchasedCourseIds]);

  const value = {
    allCourses: COURSES,
    purchasedCourseIds,
    purchasedCourses,
    purchaseCourse,
    isCoursePurchased,
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
