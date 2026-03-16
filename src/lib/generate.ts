import fs from "fs";
import path from "path";
import { getSemesterLabel, getAcademicYear } from "./semester";
import University from "@/models/University";
import type {
  GeneratedCourse,
  FeeItem,
  TranscriptData,
  SemesterRecord,
  TranscriptCourse,
  Announcement,
} from "./validation";

// --- Photo and Signature Randomization ---

function listFilesInDir(dirName: string): string[] {
  const dir = path.join(process.cwd(), "public", dirName);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
  } catch {
    return [];
  }
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function pickRandomPhoto(): string {
  const files = listFilesInDir("photos");
  if (files.length === 0) return "/photos/placeholder.png";
  return `/photos/${pickRandom(files)}`;
}

export function pickRandomSignature(): string {
  const files = listFilesInDir("signatures");
  if (files.length === 0) return "/signatures/placeholder.png";
  return `/signatures/${pickRandom(files)}`;
}

// --- Faculty, Major & Student ID Randomization ---

const FACULTY_MAJORS: { faculty: string; majors: string[] }[] = [
  {
    faculty: "Faculty of Engineering",
    majors: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering"],
  },
  {
    faculty: "Faculty of Science",
    majors: ["Physics", "Mathematics", "Chemistry", "Biology", "Environmental Science"],
  },
  {
    faculty: "Faculty of Business",
    majors: ["Business Administration", "Finance", "Marketing", "Accounting", "International Business"],
  },
  {
    faculty: "Faculty of Arts & Humanities",
    majors: ["Literature", "History", "Philosophy", "Fine Arts", "Linguistics"],
  },
  {
    faculty: "Faculty of Medicine",
    majors: ["Medicine", "Nursing", "Pharmacy", "Public Health", "Biomedical Science"],
  },
  {
    faculty: "Faculty of Law",
    majors: ["Law", "International Law", "Criminal Justice", "Legal Studies"],
  },
  {
    faculty: "Faculty of Education",
    majors: ["Education", "Psychology", "Counseling", "Curriculum Design"],
  },
  {
    faculty: "Faculty of Information Technology",
    majors: ["Software Engineering", "Data Science", "Cybersecurity", "Artificial Intelligence", "Information Systems"],
  },
];

export function generateFacultyMajor(): { faculty: string; major: string } {
  const entry = pickRandom(FACULTY_MAJORS);
  return { faculty: entry.faculty, major: pickRandom(entry.majors) };
}

export function generateStudentId(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(1000 + Math.random() * 9000));
  return `${year}${seq}`;
}

// --- Email Randomization ---

const FIRST_NAMES = ["nguyen", "tran", "le", "pham", "hoang", "vu", "vo", "dang", "bui", "do", "ho", "ngo", "duong", "ly", "james", "john", "robert", "michael", "david", "sarah", "emily", "anna", "maria", "lisa"];
const LAST_NAMES = ["van", "thi", "minh", "duc", "hong", "anh", "huong", "smith", "johnson", "williams", "brown", "jones", "kim", "park", "chen", "wang", "kumar", "ali"];

export function generateEmail(emailSuffix: string): string {
  const first = pickRandom(FIRST_NAMES);
  const last = pickRandom(LAST_NAMES);
  const num = Math.floor(100 + Math.random() * 900);
  const domain = emailSuffix || "university.edu";
  return `${first}.${last}${num}@${domain}`;
}

// --- Random University ---

export async function pickRandomUniversity(): Promise<{ name: string; emailSuffix: string; logoUrl: string; address: string }> {
  const universities = await University.find().lean();
  if (universities.length === 0) {
    return { name: "Global Tech University", emailSuffix: "gtu.edu", logoUrl: "", address: "" };
  }
  const uni = pickRandom(universities);
  return { name: uni.name, emailSuffix: uni.emailSuffix || "university.edu", logoUrl: uni.logoUrl || "", address: uni.address || "" };
}

// --- Course Randomization ---

interface DbCourse {
  code: string;
  name: string;
  credits: number;
  instructor?: string;
  schedule?: string;
  room?: string;
  faculty?: string;
}

export async function generateCourses(
  courseModel: { find: () => { lean: () => Promise<DbCourse[]> } }
): Promise<GeneratedCourse[]> {
  const allCourses: DbCourse[] = await courseModel.find().lean();
  if (allCourses.length === 0) return [];
  const selected = pickRandomN(allCourses, Math.min(5, allCourses.length));
  return selected.map((c) => ({
    code: c.code,
    name: c.name,
    credits: c.credits,
    instructor: c.instructor,
    schedule: c.schedule,
    room: c.room,
    faculty: c.faculty,
  }));
}

// --- Transcript Randomization ---

const GRADE_TABLE: { grade: string; points: number; weight: number }[] = [
  { grade: "A", points: 4.0, weight: 15 },
  { grade: "A-", points: 3.7, weight: 10 },
  { grade: "B+", points: 3.3, weight: 15 },
  { grade: "B", points: 3.0, weight: 20 },
  { grade: "B-", points: 2.7, weight: 10 },
  { grade: "C+", points: 2.3, weight: 10 },
  { grade: "C", points: 2.0, weight: 10 },
  { grade: "D", points: 1.0, weight: 5 },
  { grade: "F", points: 0.0, weight: 5 },
];

function weightedRandomGrade(): { grade: string; points: number } {
  const totalWeight = GRADE_TABLE.reduce((s, g) => s + g.weight, 0);
  let r = Math.random() * totalWeight;
  for (const g of GRADE_TABLE) {
    r -= g.weight;
    if (r <= 0) return { grade: g.grade, points: g.points };
  }
  return { grade: "C", points: 2.0 };
}

const COURSE_NAMES_POOL = [
  "Introduction to Computer Science",
  "Data Structures",
  "Calculus I",
  "Linear Algebra",
  "General Physics",
  "Operating Systems",
  "Database Systems",
  "Software Engineering",
  "Computer Networks",
  "Technical Writing",
  "Discrete Mathematics",
  "Probability and Statistics",
  "Algorithms",
  "Web Development",
  "Mobile Computing",
  "Digital Logic Design",
  "Circuit Analysis",
  "Engineering Mechanics",
  "Microeconomics",
  "English Composition",
  "World History",
  "General Chemistry",
  "Organic Chemistry",
  "General Biology",
];

export function generateTranscript(createdAt: Date): TranscriptData {
  const year = createdAt.getFullYear();
  const semesterNames = [
    `Fall ${year - 2}`,
    `Spring ${year - 1}`,
    `Fall ${year - 1}`,
  ];

  const usedCourses = new Set<string>();
  const semesters: SemesterRecord[] = semesterNames.map((semName) => {
    const courses: TranscriptCourse[] = [];
    for (let i = 0; i < 4; i++) {
      let courseName: string;
      do {
        courseName = pickRandom(COURSE_NAMES_POOL);
      } while (usedCourses.has(courseName));
      usedCourses.add(courseName);

      const { grade, points } = weightedRandomGrade();
      const credits = pickRandom([3, 3, 3, 4]);
      const codePrefix = pickRandom(["CS", "MATH", "PHY", "ENG", "BUS"]);
      const codeNum = 100 + Math.floor(Math.random() * 400);
      courses.push({
        code: `${codePrefix}${codeNum}`,
        name: courseName,
        credits,
        grade,
        points,
      });
    }

    const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
    const totalPoints = courses.reduce(
      (s, c) => s + c.points * c.credits,
      0
    );
    const semesterGpa = Math.round((totalPoints / totalCredits) * 100) / 100;

    return { name: semName, courses, semesterGpa };
  });

  const allCredits = semesters.reduce(
    (s, sem) => s + sem.courses.reduce((cs, c) => cs + c.credits, 0),
    0
  );
  const allPoints = semesters.reduce(
    (s, sem) =>
      s + sem.courses.reduce((cs, c) => cs + c.points * c.credits, 0),
    0
  );
  const cumulativeGpa = Math.round((allPoints / allCredits) * 100) / 100;

  return { semesters, cumulativeGpa };
}

// --- Fee Randomization ---

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateFees(): FeeItem[] {
  return [
    { item: "Tuition", amount: randBetween(8000, 15000) },
    { item: "Laboratory Fee", amount: randBetween(200, 800) },
    { item: "Library Fee", amount: randBetween(100, 300) },
    { item: "Technology Fee", amount: randBetween(150, 400) },
    { item: "Activity Fee", amount: randBetween(50, 200) },
  ];
}

// --- Date Randomization ---

function randomDateWithinMonths(baseDate: Date, months: number): string {
  const start = new Date(baseDate);
  const end = new Date(baseDate);
  end.setMonth(end.getMonth() + months);
  const ts = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(ts).toISOString().split("T")[0];
}

export function generateDates(createdAt: Date) {
  const issueDate = randomDateWithinMonths(createdAt, 1);
  const enrollmentDate = randomDateWithinMonths(createdAt, 1);
  const paymentDeadline = randomDateWithinMonths(createdAt, 3);
  const expiryYear = new Date(issueDate);
  expiryYear.setFullYear(expiryYear.getFullYear() + 4);
  const expiryDate = expiryYear.toISOString().split("T")[0];

  return { issueDate, expiryDate, enrollmentDate, paymentDeadline };
}

// --- Announcements ---

const ANNOUNCEMENT_POOL = [
  { title: "Fall Semester Registration Now Open", desc: "Register for fall courses through the student portal. Priority registration for seniors begins Monday." },
  { title: "Library Hours Extended for Finals", desc: "The main library will be open 24/7 during the final exam period. Study rooms available on first-come basis." },
  { title: "Scholarship Applications Due", desc: "Merit-based scholarship applications for next semester are due by the end of this month." },
  { title: "Campus Career Fair", desc: "Over 50 employers will be on campus for the annual career fair. Bring your resume and dress professionally." },
  { title: "New Student Orientation", desc: "Mandatory orientation for all incoming students. Campus tours, academic advising, and social events planned." },
  { title: "Tuition Payment Reminder", desc: "Tuition payments for the current semester are due within 30 days. Late fees will apply after the deadline." },
  { title: "Research Symposium", desc: "Annual undergraduate research symposium accepting submissions. Present your work and win awards." },
  { title: "IT System Maintenance", desc: "The student portal will be unavailable for maintenance this weekend. Plan accordingly for any submissions." },
  { title: "Student Health Insurance Enrollment", desc: "Open enrollment for student health insurance plans begins next week. Coverage options have been updated." },
  { title: "Graduation Ceremony Details", desc: "Commencement ceremony details have been posted. Cap and gown orders must be placed by the deadline." },
  { title: "International Student Welcome Event", desc: "Welcome reception for international students with cultural activities and networking opportunities." },
  { title: "Academic Integrity Workshop", desc: "Mandatory workshop on plagiarism prevention and proper citation methods for all first-year students." },
];

export function generateAnnouncements(createdAt: Date): Announcement[] {
  const count = randBetween(3, 5);
  const selected = pickRandomN(ANNOUNCEMENT_POOL, count);
  return selected.map((a) => ({
    title: a.title,
    date: randomDateWithinMonths(createdAt, 2),
    desc: a.desc,
  }));
}

// --- Orchestrator ---

export interface GeneratedSessionData {
  photoUrl: string;
  signatureUrl: string;
  generatedCourses: GeneratedCourse[];
  generatedTranscript: TranscriptData;
  generatedFees: FeeItem[];
  generatedAnnouncements: Announcement[];
  dates: {
    issueDate: string;
    expiryDate: string;
    enrollmentDate: string;
    paymentDeadline: string;
  };
  semester: string;
  academicYear: string;
  gpa: string;
  creditsCompleted: string;
  faculty: string;
  major: string;
  studentId: string;
  universityName: string;
  universityLogo: string;
  universityAddress: string;
  email: string;
}

export async function generateAllSessionData(
  courseModel: { find: () => { lean: () => Promise<DbCourse[]> } },
  createdAt: Date
): Promise<GeneratedSessionData> {
  const photoUrl = pickRandomPhoto();
  const signatureUrl = pickRandomSignature();
  const generatedCourses = await generateCourses(courseModel);
  const generatedTranscript = generateTranscript(createdAt);
  const generatedFees = generateFees();
  const generatedAnnouncements = generateAnnouncements(createdAt);
  const dates = generateDates(createdAt);
  const semester = getSemesterLabel(createdAt);
  const academicYear = getAcademicYear(createdAt);
  const gpa = generatedTranscript.cumulativeGpa.toFixed(2);
  const creditsCompleted = String(
    generatedTranscript.semesters.reduce(
      (s, sem) => s + sem.courses.reduce((cs, c) => cs + c.credits, 0),
      0
    )
  );
  const { faculty, major } = generateFacultyMajor();
  const studentId = generateStudentId();
  const { name: universityName, emailSuffix, logoUrl: universityLogo, address: universityAddress } = await pickRandomUniversity();
  const email = generateEmail(emailSuffix);

  return {
    photoUrl,
    signatureUrl,
    generatedCourses,
    generatedTranscript,
    generatedFees,
    generatedAnnouncements,
    dates,
    semester,
    academicYear,
    gpa,
    creditsCompleted,
    faculty,
    major,
    studentId,
    universityName,
    universityLogo,
    universityAddress,
    email,
  };
}
