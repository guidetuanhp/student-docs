export interface PortalStudentData {
  fullName: string;
  studentId: string;
  universityName: string;
  universityLogo: string;
  universityAddress: string;
  faculty: string;
  major: string;
  nationality: string;
  dateOfBirth: string;
  enrollmentYear: string;
  expectedGraduation: string;
  status: string;
  photoUrl: string;
  currentSemester: string;
  gpa: string;
  creditsCompleted: string;
  totalCredits: string;
  academicStanding: string;
  academicAdvisor: string;
  semesterTuition: string;
  paymentStatus: string;
  paymentDeadline: string;
}

export interface PortalTemplate {
  id: string;
  name: string;
  style: string;
  description: string;
}

export const defaultPortalData: PortalStudentData = {
  fullName: "Nguyen Van A",
  studentId: "20251234",
  universityName: "Global Tech University",
  universityLogo: "",
  universityAddress: "",
  faculty: "Faculty of Engineering",
  major: "Computer Science",
  nationality: "Vietnamese",
  dateOfBirth: "2003-05-15",
  enrollmentYear: "2025",
  expectedGraduation: "2029",
  status: "Active",
  photoUrl: "/photos/student-01.png",
  currentSemester: "Fall 2025",
  gpa: "3.42",
  creditsCompleted: "84",
  totalCredits: "140",
  academicStanding: "Good Standing",
  academicAdvisor: "Dr. James Wilson",
  semesterTuition: "$5,500.00",
  paymentStatus: "Paid",
  paymentDeadline: "2025-08-15",
};

export const portalTemplates: PortalTemplate[] = [
  { id: "classic", name: "Classic University", style: "Traditional", description: "Traditional academic system with formal table-based layout" },
  { id: "modern-dashboard", name: "Modern Dashboard", style: "SaaS Dashboard", description: "Modern card-and-widget dashboard layout" },
  { id: "government", name: "Government Style", style: "Official", description: "Official government-style interface with formal typography" },
  { id: "korean", name: "Korean University", style: "Dense Info", description: "Dense information layout inspired by Korean portals" },
  { id: "minimal", name: "Minimal Modern", style: "Clean", description: "Clean minimal interface with large cards" },
  { id: "academic-table", name: "Academic Table", style: "Data Tables", description: "Focus on structured data tables" },
  { id: "card-based", name: "Card Based", style: "Cards", description: "All information displayed in card widgets" },
  { id: "sidebar", name: "Sidebar Portal", style: "Left Nav", description: "Portal with left navigation sidebar" },
  { id: "top-nav", name: "Top Navigation", style: "Top Nav", description: "Portal using top horizontal navigation" },
  { id: "mobile-first", name: "Mobile First", style: "Compact", description: "Compact layout optimized for mobile screens" },
];

export const sampleCourses = [
  { code: "CS101", name: "Introduction to Programming", instructor: "Dr. Smith", credits: 3, schedule: "Mon/Wed 9:00-10:30", room: "A-301" },
  { code: "CS201", name: "Data Structures & Algorithms", instructor: "Dr. Johnson", credits: 4, schedule: "Tue/Thu 10:00-11:30", room: "B-205" },
  { code: "MATH101", name: "Calculus I", instructor: "Prof. Williams", credits: 3, schedule: "Mon/Wed 13:00-14:30", room: "C-102" },
  { code: "ENG101", name: "Academic English", instructor: "Ms. Brown", credits: 2, schedule: "Fri 9:00-11:00", room: "D-401" },
  { code: "PHY101", name: "Physics for Engineers", instructor: "Dr. Davis", credits: 3, schedule: "Tue/Thu 14:00-15:30", room: "E-110" },
];

export const sampleFees = [
  { item: "Tuition Fee", amount: "$4,500.00" },
  { item: "Laboratory Fee", amount: "$350.00" },
  { item: "Library & Technology", amount: "$200.00" },
  { item: "Student Activity Fee", amount: "$150.00" },
  { item: "Health Insurance", amount: "$300.00" },
];

export const sampleDocuments = [
  { name: "Enrollment Certificate", date: "Sep 1, 2025", type: "PDF" },
  { name: "Admission Letter", date: "Jul 15, 2025", type: "PDF" },
  { name: "Academic Transcript", date: "Jan 15, 2026", type: "PDF" },
  { name: "Tuition Invoice", date: "Aug 1, 2025", type: "PDF" },
  { name: "Student ID Card", date: "Sep 5, 2025", type: "PNG" },
];

export const sampleAnnouncements = [
  { title: "Fall 2025 Registration Open", date: "Aug 1, 2025", desc: "Course registration for Fall 2025 is now available." },
  { title: "Library Hours Extended", date: "Sep 10, 2025", desc: "The main library will be open 24/7 during midterms." },
  { title: "Career Fair -- Oct 15", date: "Sep 20, 2025", desc: "Annual career fair with 50+ companies on campus." },
];
