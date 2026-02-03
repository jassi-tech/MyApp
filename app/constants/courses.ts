export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  lessons: number;
  rating: number;
  students: string | number;
  lastUpdated: string;
  image: string;
  price: string;
  originalPrice: string;
  category: string;
  isTopAuthor?: boolean;
  lessons_list: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: "1",
    title: "Mastering React Native Animation",
    instructor: "Sarah Johnson",
    description: "Learn advanced animation techniques in React Native to create stunning user experiences. This course covers everything from simple transitions to complex gesture-based interactions.",
    duration: "8h 15m",
    lessons: 5,
    rating: 4.8,
    students: "1,234",
    lastUpdated: "Feb 2024",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    price: "$10.99",
    originalPrice: "$32",
    category: "Development",
    isTopAuthor: true,
    lessons_list: [
      {
        id: "1",
        title: "Introduction to Animations",
        duration: "12:30",
        completed: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "2",
        title: "Understanding Animated API",
        duration: "18:45",
        completed: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "3",
        title: "Spring Animations",
        duration: "15:20",
        completed: false,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        id: "4",
        title: "Timing Animations",
        duration: "20:10",
        completed: false,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      },
      {
        id: "5",
        title: "Gesture-Based Animations",
        duration: "25:30",
        completed: false,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      },
    ],
  },
  {
    id: "2",
    title: "Fullstack Development with Expo",
    instructor: "Michael Chen",
    description: "Build complete mobile applications with Expo and modern backend technologies. A comprehensive guide to building scalable apps.",
    duration: "12h 45m",
    lessons: 36,
    rating: 4.9,
    students: "2,156",
    lastUpdated: "Jan 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    price: "$10.99",
    originalPrice: "$32",
    category: "Development",
    isTopAuthor: true,
    lessons_list: [
      {
        id: "1",
        title: "Getting Started with Expo",
        duration: "10:00",
        completed: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "2",
        title: "Setting Up Backend",
        duration: "22:15",
        completed: false,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "3",
        title: "API Integration",
        duration: "18:30",
        completed: false,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
  },
  {
    id: "3",
    title: "TypeScript for Beginners",
    instructor: "Elena Rodriguez",
    description: "Master TypeScript fundamentals and advanced concepts for modern development. Essential for any React Native developer.",
    duration: "6h",
    lessons: 18,
    rating: 4.7,
    students: "3,421",
    lastUpdated: "Mar 2024",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2728&auto=format&fit=crop",
    price: "$59.99",
    originalPrice: "$89",
    category: "Development",
    isTopAuthor: false,
    lessons_list: [
      {
        id: "1",
        title: "TypeScript Basics",
        duration: "14:20",
        completed: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: "2",
        title: "Types and Interfaces",
        duration: "16:45",
        completed: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        id: "3",
        title: "Generics",
        duration: "19:30",
        completed: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
  },
  {
    id: "4",
    title: "JavaScript for Modern Web",
    instructor: "Robert Fox",
    description: "Master JavaScript ES6+ and build interactive web applications with ease.",
    duration: "10h",
    lessons: 25,
    rating: 4.5,
    students: "2,980",
    lastUpdated: "Dec 2023",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2670&auto=format&fit=crop",
    price: "$10.99",
    originalPrice: "$32",
    category: "Development",
    isTopAuthor: true,
    lessons_list: [
      {
        id: "1",
        title: "Variables and Scope",
        duration: "11:00",
        completed: false,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
  },
];
