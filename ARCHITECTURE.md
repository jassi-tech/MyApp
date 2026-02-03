# App Architecture Documentation
eas build --profile preview --platform android

## Table of Contents
1. [Routing System](#routing-system)
2. [API Workflow](#api-workflow)
3. [API Data Schemas](#api-data-schemas)
4. [Authentication Flow](#authentication-flow)

---

## Routing System

### Route Structure

The application uses **Expo Router** with a file-based routing system. All screens are registered in `app/screens/_layout.tsx`.

### Route Hierarchy

```
app/
├── screens/
│   ├── _layout.tsx                    # Root router configuration
│   ├── (tabs)/                        # Tab-based navigation
│   │   ├── Home.tsx                   # Home screen (/)
│   │   ├── Course.tsx                 # Courses listing
│   │   ├── Profile.tsx                # User profile
│   │   └── _layout.tsx                # Tab layout config
│   │
│   ├── GetStarted.tsx                 # Onboarding screen
│   ├── Login.tsx                      # Login screen
│   ├── register.tsx                   # Registration screen
│   │
│   ├── settings.tsx                   # Main settings screen
│   ├── settings/                      # Settings module screens
│   │   ├── account.tsx                # Account management
│   │   ├── appearance.tsx             # Theme settings
│   │   ├── language.tsx               # Language selection
│   │   ├── push-notifications.tsx     # Push notification settings
│   │   ├── email-notifications.tsx    # Email notification settings
│   │   ├── help-center.tsx            # Help & FAQ
│   │   └── report-problem.tsx         # Issue reporting
│   │
│   ├── categories.tsx                 # Categories overview
│   ├── categories/                    # Category module screens
│   │   ├── timetable.tsx              # Class schedule
│   │   ├── inbox.tsx                  # Messages
│   │   ├── fees.tsx                   # Fee management
│   │   ├── notice.tsx                 # Announcements
│   │   ├── homework.tsx               # Assignments
│   │   ├── syllabus.tsx               # Course syllabus
│   │   ├── circular.tsx               # Official documents
│   │   ├── leave-request.tsx          # Leave applications
│   │   └── examination.tsx            # Exam schedule/results
│   │
│   ├── attendance.tsx                 # Attendance tracking
│   ├── quiz.tsx                       # Quiz subject selection
│   ├── quiz-details.tsx               # Quiz MCQ interface
│   ├── course-details.tsx             # Course detail with video player
│   ├── details.tsx                    # Generic details screen
│   ├── notification.tsx               # Notifications list
│   │
│   └── Other screens/
│       ├── account-security.tsx       # Security settings
│       ├── activity-history.tsx       # User activity log
│       ├── contact-us.tsx             # Contact support
│       └── privacy-policy.tsx         # Privacy policy
```

### Navigation Patterns

#### 1. **Tab Navigation** (Bottom Tabs)
```typescript
Home → Course → Profile
```

#### 2. **Stack Navigation** (Push/Pop)
```typescript
// Example flows:
Home → Categories → Timetable
Home → Quiz → Quiz Details
Course → Course Details (with video player)
Settings → Account/Appearance/Language/etc.
```

#### 3. **Modal Navigation**
```typescript
// Used for overlays and temporary screens
Any Screen → Notification
```

### Route Registration

All routes are registered in `_layout.tsx`:

```typescript
<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="(tabs)" />
  <Stack.Screen name="GetStarted" />
  <Stack.Screen name="Login" />
  <Stack.Screen name="register" />
  <Stack.Screen name="settings" />
  <Stack.Screen name="settings/account" />
  // ... more routes
</Stack>
```

---

## API Workflow

### API Architecture Overview

```mermaid
graph TB
    A[Mobile App] -->|HTTP Requests| B[API Gateway]
    B --> C[Authentication Service]
    B --> D[User Service]
    B --> E[Course Service]
    B --> F[Notification Service]
    B --> G[Content Service]
    
    C --> H[(Auth DB)]
    D --> I[(User DB)]
    E --> J[(Course DB)]
    F --> K[(Notification DB)]
    G --> L[(Content DB)]
```

### API Endpoints Structure

#### Base URL
```
Production: https://api.yourapp.com/v1
Development: http://localhost:3000/api/v1
```

#### Endpoint Categories

##### 1. **Authentication Endpoints**
```
POST   /auth/login              # User login
POST   /auth/register           # User registration
POST   /auth/logout             # User logout
POST   /auth/refresh-token      # Refresh access token
POST   /auth/forgot-password    # Password reset request
POST   /auth/reset-password     # Password reset confirmation
GET    /auth/verify-email       # Email verification
```

##### 2. **User Endpoints**
```
GET    /users/profile           # Get user profile
PUT    /users/profile           # Update user profile
GET    /users/stats             # Get user statistics
PUT    /users/avatar            # Update profile picture
GET    /users/activity          # Get activity history
```

##### 3. **Course Endpoints**
```
GET    /courses                 # List all courses
GET    /courses/:id             # Get course details
GET    /courses/:id/lessons     # Get course lessons
POST   /courses/:id/enroll      # Enroll in course
PUT    /courses/:id/progress    # Update course progress
GET    /courses/my-courses      # Get enrolled courses
```

##### 4. **Content Endpoints**
```
GET    /timetable               # Get class schedule
GET    /inbox                   # Get messages
GET    /fees                    # Get fee details
POST   /fees/pay                # Process payment
GET    /notices                 # Get announcements
GET    /homework                # Get assignments
POST   /homework/:id/submit     # Submit assignment
GET    /syllabus                # Get syllabus
GET    /circulars               # Get official documents
POST   /leave-request           # Submit leave request
GET    /examinations            # Get exam schedule
GET    /examinations/results    # Get exam results
```

##### 5. **Notification Endpoints**
```
GET    /notifications           # Get all notifications
PUT    /notifications/:id/read  # Mark as read
DELETE /notifications/:id       # Delete notification
PUT    /notifications/settings  # Update notification preferences
```

##### 6. **Quiz Endpoints**
```
GET    /quiz/subjects           # Get available subjects
GET    /quiz/:subject/questions # Get quiz questions
POST   /quiz/:id/submit         # Submit quiz answers
GET    /quiz/results            # Get quiz results
```

---

## API Data Schemas

This section documents the exact data structures (request/response) for all API endpoints.

### Environment Variables

```env
# API Configuration
API_BASE_URL=https://api.yourapp.com/v1
API_TIMEOUT=30000

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Database
DATABASE_URL=mongodb://localhost:27017/myapp
# or
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Storage
STORAGE_TYPE=s3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name
```

---

### 1. Authentication APIs

#### POST /auth/login
**Purpose:** User login with email and password

**Request:**
```json
{
  "email": "student@example.com",
  "password": "SecurePass123!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_123456789",
      "email": "student@example.com",
      "name": "John Doe",
      "role": "student",
      "avatar": "https://cdn.example.com/avatars/user123.jpg",
      "phone": "+1234567890",
      "dateOfBirth": "2005-01-15",
      "class": "10th Grade",
      "section": "A",
      "rollNumber": "2024-A-101",
      "isEmailVerified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-02-02T12:00:00Z"
    }
  }
}
```

#### POST /auth/register
**Purpose:** Create new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "student@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "phone": "+1234567890",
  "dateOfBirth": "2005-01-15",
  "role": "student"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "usr_123456789",
    "email": "student@example.com"
  }
}
```

---

### 2. User Profile APIs

#### GET /users/profile
**Purpose:** Get current user's profile information

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "usr_123456789",
    "name": "John Doe",
    "email": "student@example.com",
    "phone": "+1234567890",
    "avatar": "https://cdn.example.com/avatars/user123.jpg",
    "dateOfBirth": "2005-01-15",
    "role": "student",
    "class": "10th Grade",
    "section": "A",
    "rollNumber": "2024-A-101",
    "stats": {
      "attendance": 85,
      "grade": "A+",
      "achievements": 12
    }
  }
}
```

#### PUT /users/profile
**Purpose:** Update user profile

**Request:**
```json
{
  "name": "John Doe Updated",
  "phone": "+1234567890",
  "dateOfBirth": "2005-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "usr_123456789",
    "name": "John Doe Updated",
    "phone": "+1234567890",
    "dateOfBirth": "2005-01-15"
  }
}
```

---

### 3. Course APIs

#### GET /courses
**Purpose:** Get list of all available courses

**Query Parameters:**
```
?page=1&limit=10&category=programming&search=react
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "crs_001",
        "title": "Mastering React Native Animation",
        "instructor": "Sarah Johnson",
        "instructorAvatar": "https://cdn.example.com/instructors/sarah.jpg",
        "description": "Learn advanced animation techniques in React Native",
        "thumbnail": "https://cdn.example.com/courses/react-animation.jpg",
        "category": "Mobile Development",
        "level": "Advanced",
        "duration": "8 hours",
        "lessonsCount": 24,
        "studentsCount": 1234,
        "rating": 4.8,
        "reviewsCount": 456,
        "price": 49.99,
        "currency": "USD",
        "tags": ["React Native", "Animation", "Mobile"],
        "isEnrolled": false,
        "progress": 0,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-02-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### GET /courses/:id
**Purpose:** Get detailed information about a specific course

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "crs_001",
    "title": "Mastering React Native Animation",
    "instructor": {
      "id": "inst_001",
      "name": "Sarah Johnson",
      "avatar": "https://cdn.example.com/instructors/sarah.jpg",
      "bio": "Senior Mobile Developer with 10+ years experience",
      "rating": 4.9,
      "studentsCount": 5000
    },
    "description": "Learn advanced animation techniques in React Native to create stunning user experiences.",
    "thumbnail": "https://cdn.example.com/courses/react-animation.jpg",
    "previewVideo": "https://cdn.example.com/videos/preview.mp4",
    "category": "Mobile Development",
    "level": "Advanced",
    "duration": "8 hours",
    "lessonsCount": 24,
    "studentsCount": 1234,
    "rating": 4.8,
    "reviewsCount": 456,
    "price": 49.99,
    "currency": "USD",
    "requirements": [
      "Basic React Native knowledge",
      "JavaScript ES6+",
      "Node.js installed"
    ],
    "whatYouWillLearn": [
      "Advanced animation techniques",
      "Gesture-based interactions",
      "Performance optimization"
    ],
    "tags": ["React Native", "Animation", "Mobile"],
    "isEnrolled": true,
    "progress": 65,
    "enrolledAt": "2024-01-15T00:00:00Z",
    "lastAccessedAt": "2024-02-02T10:00:00Z"
  }
}
```

#### GET /courses/:id/lessons
**Purpose:** Get all lessons for a specific course

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "crs_001",
    "lessons": [
      {
        "id": "lsn_001",
        "title": "Introduction to Animations",
        "description": "Overview of animation concepts",
        "duration": "12:30",
        "order": 1,
        "videoUrl": "https://cdn.example.com/videos/lesson1.mp4",
        "thumbnail": "https://cdn.example.com/thumbnails/lesson1.jpg",
        "resources": [
          {
            "type": "pdf",
            "title": "Lesson Notes",
            "url": "https://cdn.example.com/resources/lesson1.pdf"
          },
          {
            "type": "code",
            "title": "Source Code",
            "url": "https://github.com/example/lesson1"
          }
        ],
        "isCompleted": true,
        "completedAt": "2024-01-20T00:00:00Z",
        "isFree": true
      },
      {
        "id": "lsn_002",
        "title": "Understanding Animated API",
        "description": "Deep dive into React Native Animated API",
        "duration": "18:45",
        "order": 2,
        "videoUrl": "https://cdn.example.com/videos/lesson2.mp4",
        "thumbnail": "https://cdn.example.com/thumbnails/lesson2.jpg",
        "resources": [],
        "isCompleted": true,
        "completedAt": "2024-01-22T00:00:00Z",
        "isFree": false
      }
    ],
    "totalLessons": 24,
    "completedLessons": 2
  }
}
```

#### GET /courses/my-courses
**Purpose:** Get user's enrolled courses

**Response:**
```json
{
  "success": true,
  "data": {
    "activeCourses": [
      {
        "id": "crs_001",
        "title": "Mastering React Native Animation",
        "instructor": "Sarah Johnson",
        "thumbnail": "https://cdn.example.com/courses/react-animation.jpg",
        "progress": 65,
        "status": "Active",
        "enrolledAt": "2024-01-15T00:00:00Z",
        "lastAccessedAt": "2024-02-02T10:00:00Z",
        "nextLesson": {
          "id": "lsn_003",
          "title": "Spring Animations",
          "duration": "15:20"
        }
      }
    ],
    "completedCourses": [
      {
        "id": "crs_003",
        "title": "TypeScript for Beginners",
        "instructor": "Elena Rodriguez",
        "thumbnail": "https://cdn.example.com/courses/typescript.jpg",
        "progress": 100,
        "status": "Completed",
        "completedAt": "2024-01-30T00:00:00Z",
        "certificate": {
          "id": "cert_001",
          "url": "https://cdn.example.com/certificates/cert001.pdf"
        }
      }
    ]
  }
}
```

---

### 4. Content APIs

#### GET /timetable
**Purpose:** Get class schedule/timetable

**Response:**
```json
{
  "success": true,
  "data": {
    "schedule": {
      "Mon": [
        {
          "id": "tt_001",
          "time": "08:00 - 08:45 AM",
          "subject": "Mathematics",
          "teacher": "Dr. Smith",
          "room": "Room 101",
          "icon": "calculator-outline",
          "color": "#e0f2fe"
        }
      ],
      "Tue": [],
      "Wed": [],
      "Thu": [],
      "Fri": [],
      "Sat": []
    },
    "currentDay": "Mon",
    "academicYear": "2023-2024",
    "semester": "Spring"
  }
}
```

#### GET /inbox
**Purpose:** Get user messages

**Query Parameters:**
```
?filter=unread&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_001",
        "sender": {
          "id": "usr_teacher_001",
          "name": "Dr. Sarah Johnson",
          "avatar": "https://cdn.example.com/avatars/teacher1.jpg",
          "role": "teacher"
        },
        "subject": "Assignment Submission Reminder",
        "preview": "Please submit your assignment by Friday...",
        "body": "Full message content here...",
        "date": "2024-02-02T10:00:00Z",
        "isRead": false,
        "priority": "high",
        "category": "Academic",
        "attachments": [
          {
            "type": "pdf",
            "name": "assignment_guidelines.pdf",
            "url": "https://cdn.example.com/attachments/file1.pdf",
            "size": 245678
          }
        ]
      }
    ],
    "unreadCount": 5,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45
    }
  }
}
```

#### GET /fees
**Purpose:** Get fee details and payment history

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalFees": 5000,
      "paidAmount": 3000,
      "pendingAmount": 2000,
      "currency": "USD"
    },
    "breakdown": [
      {
        "id": "fee_001",
        "category": "Tuition Fee",
        "amount": 3000,
        "dueDate": "2024-03-01",
        "status": "Paid",
        "paidDate": "2024-01-15"
      },
      {
        "id": "fee_002",
        "category": "Library Fee",
        "amount": 500,
        "dueDate": "2024-03-01",
        "status": "Pending"
      }
    ],
    "paymentHistory": [
      {
        "id": "pay_001",
        "amount": 3000,
        "category": "Tuition Fee",
        "method": "Credit Card",
        "transactionId": "TXN123456",
        "date": "2024-01-15T10:00:00Z",
        "status": "Success",
        "receipt": "https://cdn.example.com/receipts/receipt001.pdf"
      }
    ]
  }
}
```

#### GET /notices
**Purpose:** Get announcements and notices

**Response:**
```json
{
  "success": true,
  "data": {
    "notices": [
      {
        "id": "ntc_001",
        "title": "School Holiday Announcement",
        "content": "School will be closed on February 15th for national holiday...",
        "category": "Important",
        "categoryColor": "#ef4444",
        "date": "2024-02-01T00:00:00Z",
        "author": {
          "name": "Principal Office",
          "role": "Administration"
        },
        "isExpanded": false,
        "attachments": []
      }
    ]
  }
}
```

#### GET /homework
**Purpose:** Get assignments/homework

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "pending": 5,
      "submitted": 12,
      "upcoming": 3
    },
    "assignments": [
      {
        "id": "hw_001",
        "subject": "Mathematics",
        "subjectColor": "#3b82f6",
        "title": "Algebra Problems Set 1",
        "description": "Solve problems 1-20 from chapter 5",
        "dueDate": "2024-02-10T23:59:59Z",
        "assignedDate": "2024-02-01T00:00:00Z",
        "status": "Pending",
        "priority": "High",
        "attachments": [
          {
            "type": "pdf",
            "name": "problems.pdf",
            "url": "https://cdn.example.com/homework/hw001.pdf"
          }
        ],
        "submission": null
      },
      {
        "id": "hw_002",
        "subject": "English",
        "subjectColor": "#8b5cf6",
        "title": "Essay Writing",
        "description": "Write a 500-word essay on climate change",
        "dueDate": "2024-02-08T23:59:59Z",
        "assignedDate": "2024-01-30T00:00:00Z",
        "status": "Submitted",
        "priority": "Medium",
        "attachments": [],
        "submission": {
          "submittedAt": "2024-02-05T10:00:00Z",
          "file": "https://cdn.example.com/submissions/sub002.pdf",
          "grade": "A",
          "feedback": "Excellent work!"
        }
      }
    ]
  }
}
```

#### GET /syllabus
**Purpose:** Get course syllabus

**Response:**
```json
{
  "success": true,
  "data": {
    "subjects": [
      {
        "id": "sub_001",
        "name": "Mathematics",
        "color": "#3b82f6",
        "teacher": "Dr. Smith",
        "totalChapters": 12,
        "completedChapters": 8,
        "progress": 67,
        "chapters": [
          {
            "id": "ch_001",
            "number": 1,
            "title": "Algebra Basics",
            "topics": ["Variables", "Equations", "Functions"],
            "isCompleted": true
          }
        ]
      }
    ]
  }
}
```

#### GET /circulars
**Purpose:** Get official documents/circulars

**Response:**
```json
{
  "success": true,
  "data": {
    "circulars": [
      {
        "id": "cir_001",
        "title": "Annual Exam Schedule 2024",
        "category": "Examination",
        "categoryColor": "#f59e0b",
        "date": "2024-01-15T00:00:00Z",
        "fileSize": "2.4 MB",
        "fileType": "PDF",
        "downloadUrl": "https://cdn.example.com/circulars/exam_schedule.pdf",
        "description": "Complete schedule for annual examinations"
      }
    ]
  }
}
```

#### POST /leave-request
**Purpose:** Submit leave application

**Request:**
```json
{
  "startDate": "2024-02-15",
  "endDate": "2024-02-17",
  "reason": "Family function",
  "type": "Casual Leave"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Leave request submitted successfully",
  "data": {
    "id": "lv_001",
    "startDate": "2024-02-15",
    "endDate": "2024-02-17",
    "days": 3,
    "reason": "Family function",
    "type": "Casual Leave",
    "status": "Pending",
    "submittedAt": "2024-02-02T10:00:00Z"
  }
}
```

#### GET /examinations
**Purpose:** Get exam schedule and results

**Response:**
```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "id": "exam_001",
        "subject": "Mathematics",
        "date": "2024-03-15",
        "time": "09:00 AM - 12:00 PM",
        "room": "Hall A",
        "totalMarks": 100,
        "duration": "3 hours",
        "syllabus": ["Chapter 1-5"]
      }
    ],
    "results": [
      {
        "id": "res_001",
        "examName": "Mid-Term Exam 2024",
        "subject": "Mathematics",
        "marksObtained": 85,
        "totalMarks": 100,
        "percentage": 85,
        "grade": "A",
        "rank": 5,
        "date": "2024-01-20T00:00:00Z"
      }
    ],
    "analytics": {
      "averagePercentage": 82,
      "highestScore": 95,
      "lowestScore": 65,
      "totalExams": 6
    }
  }
}
```

---

### 5. Attendance APIs

#### GET /attendance
**Purpose:** Get attendance records

**Query Parameters:**
```
?month=2024-02&subject=all
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalDays": 20,
      "present": 17,
      "absent": 2,
      "leave": 1,
      "percentage": 85
    },
    "records": [
      {
        "date": "2024-02-01",
        "status": "Present",
        "subjects": [
          {
            "name": "Mathematics",
            "status": "Present"
          },
          {
            "name": "English",
            "status": "Present"
          }
        ]
      },
      {
        "date": "2024-02-02",
        "status": "Absent",
        "reason": "Sick leave",
        "subjects": []
      }
    ],
    "monthlyTrend": [
      { "month": "Jan", "percentage": 90 },
      { "month": "Feb", "percentage": 85 }
    ]
  }
}
```

---

### 6. Quiz APIs

#### GET /quiz/subjects
**Purpose:** Get available quiz subjects

**Response:**
```json
{
  "success": true,
  "data": {
    "subjects": [
      {
        "id": "qz_sub_001",
        "name": "Mathematics",
        "icon": "calculator-outline",
        "color": "#3b82f6",
        "totalQuizzes": 15,
        "completedQuizzes": 8,
        "averageScore": 85,
        "lastAttempt": "2024-02-01T00:00:00Z"
      }
    ]
  }
}
```

#### GET /quiz/:subject/questions
**Purpose:** Get quiz questions for a subject

**Response:**
```json
{
  "success": true,
  "data": {
    "quizId": "quiz_001",
    "subject": "Mathematics",
    "title": "Algebra Quiz 1",
    "duration": 1800,
    "totalQuestions": 10,
    "questions": [
      {
        "id": "q_001",
        "questionNumber": 1,
        "question": "What is 2 + 2?",
        "type": "multiple-choice",
        "options": [
          { "id": "opt_a", "text": "3", "label": "A" },
          { "id": "opt_b", "text": "4", "label": "B" },
          { "id": "opt_c", "text": "5", "label": "C" },
          { "id": "opt_d", "text": "6", "label": "D" }
        ],
        "correctAnswer": "opt_b",
        "marks": 1,
        "difficulty": "Easy"
      }
    ]
  }
}
```

#### POST /quiz/:id/submit
**Purpose:** Submit quiz answers

**Request:**
```json
{
  "quizId": "quiz_001",
  "answers": [
    {
      "questionId": "q_001",
      "selectedOption": "opt_b"
    },
    {
      "questionId": "q_002",
      "selectedOption": "opt_a"
    }
  ],
  "timeSpent": 1200
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "quizId": "quiz_001",
    "score": 8,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "wrongAnswers": 2,
    "percentage": 80,
    "grade": "B+",
    "timeTaken": 1200,
    "results": [
      {
        "questionId": "q_001",
        "isCorrect": true,
        "selectedOption": "opt_b",
        "correctOption": "opt_b"
      }
    ],
    "submittedAt": "2024-02-02T10:00:00Z"
  }
}
```

---

### 7. Notification APIs

#### GET /notifications
**Purpose:** Get user notifications

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_001",
        "type": "assignment",
        "title": "New Assignment Posted",
        "message": "Mathematics homework has been assigned",
        "icon": "document-text",
        "iconColor": "#3b82f6",
        "isRead": false,
        "createdAt": "2024-02-02T10:00:00Z",
        "data": {
          "assignmentId": "hw_001",
          "subject": "Mathematics"
        }
      },
      {
        "id": "notif_002",
        "type": "grade",
        "title": "Grade Published",
        "message": "Your English essay has been graded: A",
        "icon": "star",
        "iconColor": "#f59e0b",
        "isRead": true,
        "createdAt": "2024-02-01T15:00:00Z",
        "data": {
          "assignmentId": "hw_002",
          "grade": "A"
        }
      }
    ],
    "unreadCount": 3
  }
}
```

---

### Error Response Format

All API errors follow this standard format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "email",
      "reason": "Email already exists"
    }
  }
}
```

**Common Error Codes:**
- `INVALID_CREDENTIALS` - Login failed
- `UNAUTHORIZED` - No/invalid token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Input validation failed
- `SERVER_ERROR` - Internal server error
- `RATE_LIMIT_EXCEEDED` - Too many requests


---

## Authentication Flow

### Login Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant App
    participant API
    participant DB
    participant Storage

    User->>App: Enter credentials
    App->>App: Validate input
    App->>API: POST /auth/login
    API->>DB: Verify credentials
    
    alt Credentials Valid
        DB-->>API: User data
        API->>API: Generate JWT tokens
        API-->>App: {accessToken, refreshToken, user}
        App->>Storage: Store tokens securely
        App->>Storage: Store user data
        App-->>User: Navigate to Home
    else Credentials Invalid
        DB-->>API: Error
        API-->>App: {error: "Invalid credentials"}
        App-->>User: Show error message
    end
```

### Detailed Authentication Workflow

#### 1. **Login Process**

**Screen:** `app/screens/Login.tsx`

**Steps:**
1. User enters email and password
2. App validates input (client-side)
3. App sends POST request to `/auth/login`
4. API validates credentials
5. API generates JWT tokens (access + refresh)
6. App stores tokens in secure storage
7. App navigates to Home screen

**Request:**
```typescript
POST /auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```typescript
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "student@example.com",
      "name": "John Doe",
      "role": "student",
      "avatar": "https://..."
    }
  }
}
```

**Response (Error):**
```typescript
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

#### 2. **Registration Process**

**Screen:** `app/screens/register.tsx`

**Steps:**
1. User fills registration form
2. App validates input
3. App sends POST request to `/auth/register`
4. API creates user account
5. API sends verification email
6. User redirected to login or auto-login

**Request:**
```typescript
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "student@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "role": "student"
}
```

#### 3. **Token Management**

**Access Token:**
- Short-lived (15 minutes)
- Used for API requests
- Stored in memory/secure storage

**Refresh Token:**
- Long-lived (7 days)
- Used to get new access token
- Stored in secure storage only

**Token Refresh Flow:**
```mermaid
sequenceDiagram
    participant App
    participant API
    
    App->>API: Request with expired access token
    API-->>App: 401 Unauthorized
    App->>API: POST /auth/refresh-token {refreshToken}
    API-->>App: {newAccessToken, newRefreshToken}
    App->>App: Update stored tokens
    App->>API: Retry original request
    API-->>App: Success response
```

#### 4. **Protected Routes**

All authenticated requests include the access token:

```typescript
// Request headers
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
```

#### 5. **Logout Process**

**Steps:**
1. User clicks logout
2. App sends POST to `/auth/logout`
3. API invalidates refresh token
4. App clears local storage
5. App navigates to GetStarted/Login

**Request:**
```typescript
POST /auth/logout
Authorization: Bearer {accessToken}

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Security Best Practices

1. **Token Storage:**
   - Use `expo-secure-store` for tokens
   - Never store tokens in AsyncStorage
   - Clear tokens on logout

2. **Password Security:**
   - Minimum 8 characters
   - Hash passwords (bcrypt)
   - Never log passwords

3. **API Security:**
   - Use HTTPS only
   - Implement rate limiting
   - Validate all inputs
   - Use CORS properly

4. **Error Handling:**
   - Don't expose sensitive info in errors
   - Log errors server-side
   - Show user-friendly messages

### API Request Flow Example

```typescript
// Example: Fetching user courses
async function fetchMyCourses() {
  try {
    // 1. Get access token from storage
    const accessToken = await SecureStore.getItemAsync('accessToken');
    
    // 2. Make API request
    const response = await fetch('https://api.yourapp.com/v1/courses/my-courses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    // 3. Handle response
    if (response.status === 401) {
      // Token expired, refresh it
      await refreshAccessToken();
      return fetchMyCourses(); // Retry
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}
```

---

## Implementation Checklist

### Backend Requirements
- [ ] Set up authentication service
- [ ] Implement JWT token generation
- [ ] Create user database schema
- [ ] Implement password hashing
- [ ] Set up email verification
- [ ] Create API endpoints
- [ ] Implement rate limiting
- [ ] Set up CORS
- [ ] Add request validation
- [ ] Implement error handling

### Frontend Requirements
- [ ] Install `expo-secure-store`
- [ ] Create API service layer
- [ ] Implement token management
- [ ] Add authentication context
- [ ] Create protected route wrapper
- [ ] Implement auto-refresh logic
- [ ] Add error handling
- [ ] Create loading states
- [ ] Add form validation
- [ ] Implement logout functionality

---

## Next Steps

1. **Backend Development:**
   - Set up Node.js/Express server
   - Configure database (MongoDB/PostgreSQL)
   - Implement authentication endpoints
   - Add middleware for auth verification

2. **Frontend Integration:**
   - Create API service utilities
   - Implement authentication context
   - Add token management
   - Connect all screens to API

3. **Testing:**
   - Unit tests for API endpoints
   - Integration tests for auth flow
   - E2E tests for critical paths
   - Security testing

4. **Deployment:**
   - Set up production environment
   - Configure environment variables
   - Deploy backend API
   - Build and deploy mobile app
