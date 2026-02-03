### Project Structure & Route Hierarchy

```text
app/
├── _layout.tsx                        # Root layout & ThemeProvider
├── index.tsx                          # Entry point
├── +not-found.tsx                     # 404 fallback
├── modal.tsx                          # Global modal
│
├── screens/                           # Main UI Screens
│   ├── _layout.tsx                    # Screens stack layout
│   ├── (tabs)/                        # Tab-based navigation
│   │   ├── _layout.tsx                # Tab configuration
│   │   ├── Home.tsx                   # Home tab
│   │   ├── Store.tsx                  # Store (Courses Marketplace)
│   │   └── reports.tsx                # Learning reports
│   │
│   ├── GetStarted.tsx                 # Onboarding / Hero Screen
│   ├── Course.tsx                     # Enrolled course overview
│   ├── course-details.tsx             # Lesson player & course info
│   ├── checkout.tsx                   # Enrollment / Payment flow
│   ├── payment-success.tsx            # Transaction confirmation
│   ├── profile.tsx                    # User profile & preferences
│   ├── settings.tsx                   # Main settings menu
│   ├── settings/                      # Settings sub-screens
│   │   ├── account.tsx                # Personal info
│   │   ├── appearance.tsx             # Theme selection
│   │   ├── language.tsx               # App localization
│   │   ├── push-notifications.tsx     # Alerts config
│   │   ├── email-notifications.tsx    # Email config
│   │   ├── change-password.tsx        # Security: update password
│   │   ├── manage-devices.tsx         # Security: sessions
│   │   ├── recovery-email.tsx         # Security: recovery options
│   │   ├── help-center.tsx            # Support resources
│   │   └── report-problem.tsx         # Feedback / Bug reporting
│   │
│   ├── timetable.tsx                  # Class schedule
│   ├── inbox.tsx                      # Student messages
│   ├── fees.tsx                       # Financial tracking
│   ├── notice.tsx                     # School announcements
│   ├── homework.tsx                   # Academic assignments
│   ├── syllabus.tsx                   # Course outlines
│   ├── circular.tsx                   # Official documents
│   ├── leave-request.tsx              # Absence management
│   ├── examination.tsx                # Results & schedules
│   │
│   ├── account-security.tsx           # Security settings
│   ├── activity-history.tsx           # User logs
│   ├── contact-us.tsx                 # Support form
│   ├── privacy-policy.tsx             # Legal docs
│   │
│   ├── notification.tsx               # App-wide alerts
│   ├── attendance.tsx                 # Attendance analytics
│   ├── quiz.tsx                       # Assessment listing
│   ├── quiz-details.tsx               # Assessment interface
│   │
│   └── marketing/                     # Sales & Conversion
│       └── lifetime-deal.tsx          # Promotional offers
│
├── components/                        # Reusable UI Library
│   ├── common/                        # Buttons, Headers, Containers
│   ├── ui/                            # Icons, Collapsibles
│   ├── security/                      # Auth-related UI (Modals)
│   └── marketing/                     # Banners, Promo items
│
├── context/                           # State Management
│   ├── ThemeContext.tsx               # Dynamic styling
│   ├── LanguageContext.tsx            # Multi-lingual support
│   └── CourseContext.tsx              # Learning state
│
├── constants/                         # App Configuration
│   ├── courses.ts                     # Mock data & types
│   ├── theme.ts                       # Color palettes
│   └── config.ts                      # API / App settings
│
├── services/                          # API & External Logic
├── store/                             # Global Persistent State
└── utils/                             # Helper functions
```
