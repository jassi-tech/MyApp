import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define User Type
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'teacher' | 'admin';
  profileImage?: string;
  class?: string;
  rollNumber?: string;
  section?: string;
  dob?: string;
  bio?: string;
  authToken?: string;
  courses?: string[]; // IDs of purchased courses
}

export interface Device {
  id: string;
  name: string;
  location: string;
  lastActive: string;
  icon: string;
  isCurrent: boolean;
}

export interface NotificationPreferences {
  allNotifications: boolean;
  messages: boolean;
  assignments: boolean;
  grades: boolean;
  attendance: boolean;
  events: boolean;
  sound: boolean;
  vibration: boolean;
}

interface UserContextType {
  user: User | null;
  devices: Device[];
  preferences: NotificationPreferences;
  recoveryEmail: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  enrollCourse: (courseId: string) => Promise<void>;
  logoutDevice: (id: string) => Promise<void>;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<void>;
  updateRecoveryEmail: (email: string) => Promise<void>;
  submitProblemReport: (category: string, description: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'iPhone 15 Pro (This Device)', location: 'Mumbai, India', lastActive: 'Active now', icon: 'phone-portrait-outline', isCurrent: true },
  { id: '2', name: 'MacBook Pro 14"', location: 'Mumbai, India', lastActive: '2 hours ago', icon: 'laptop-outline', isCurrent: false },
  { id: '3', name: 'Windows PC - Chrome', location: 'London, UK', lastActive: 'Yesterday', icon: 'desktop-outline', isCurrent: false },
];

const INITIAL_PREFERENCES: NotificationPreferences = {
  allNotifications: true,
  messages: true,
  assignments: true,
  grades: true,
  attendance: false,
  events: true,
  sound: true,
  vibration: true,
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [preferences, setPreferences] = useState<NotificationPreferences>(INITIAL_PREFERENCES);
  const [recoveryEmail, setRecoveryEmail] = useState<string>("user@example.com");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking local storage for potential session
    const checkSession = async () => {
        // In a real app, check AsyncStorage or SecureStore here
        // For now, we start unauthenticated
        setIsLoading(false);
    };
    checkSession();
  }, []);

  const login = async (userData: User) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Default courses for testing
    const userWithCourses = { ...userData, courses: userData.courses || ['1', '3'] };
    setUser(userWithCourses);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setIsLoading(false);
    router.replace('/screens/onboarding/GetStarted'); 
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const enrollCourse = async (courseId: string) => {
    if (!user) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({ ...user, courses: [...(user.courses || []), courseId] });
    setIsLoading(false);
  };

  const logoutDevice = async (id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  };

  const updatePreferences = async (prefs: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const updateRecoveryEmail = async (email: string) => {
    setRecoveryEmail(email);
  };

  const submitProblemReport = async (category: string, description: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Report submitted:", { category, description });
    setIsLoading(false);
  };

  const value = {
    user,
    devices,
    preferences,
    recoveryEmail,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile,
    enrollCourse,
    logoutDevice,
    updatePreferences,
    updateRecoveryEmail,
    submitProblemReport,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
