import { z } from "zod";

// --- Student Data (Cards Module) ---

export const StudentDataSchema = z.object({
  fullName: z.string().min(1),
  studentId: z.string().min(1),
  universityName: z.string(),
  universityLogo: z.string(),
  universityAddress: z.string(),
  faculty: z.string(),
  major: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
  photoUrl: z.string(),
});

export type StudentData = z.infer<typeof StudentDataSchema>;

// --- Admission Data (Documents Module) ---

export const AdmissionDataSchema = z.object({
  fullName: z.string().min(1),
  studentId: z.string().min(1),
  universityName: z.string(),
  universityLogo: z.string(),
  universityAddress: z.string(),
  faculty: z.string(),
  major: z.string(),
  dateOfBirth: z.string(),
  nationality: z.string(),
  passportId: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  emergencyContact: z.string(),
  admissionSemester: z.string(),
  academicYear: z.string(),
  issueDate: z.string(),
  enrollmentDate: z.string(),
  paymentDeadline: z.string(),
  photoUrl: z.string(),
  signatureUrl: z.string(),
});

export type AdmissionData = z.infer<typeof AdmissionDataSchema>;

// --- Portal Student Data (Portal Module) ---

export const PortalStudentDataSchema = z.object({
  fullName: z.string().min(1),
  studentId: z.string().min(1),
  universityName: z.string(),
  universityLogo: z.string(),
  universityAddress: z.string(),
  faculty: z.string(),
  major: z.string(),
  nationality: z.string(),
  dateOfBirth: z.string(),
  enrollmentYear: z.string(),
  expectedGraduation: z.string(),
  status: z.string(),
  photoUrl: z.string(),
  currentSemester: z.string(),
  gpa: z.string(),
  creditsCompleted: z.string(),
  totalCredits: z.string(),
  academicStanding: z.string(),
  academicAdvisor: z.string(),
  semesterTuition: z.string(),
  paymentStatus: z.string(),
  paymentDeadline: z.string(),
});

export type PortalStudentData = z.infer<typeof PortalStudentDataSchema>;

// --- Transcript and fee sub-types ---

export const TranscriptCourseSchema = z.object({
  code: z.string(),
  name: z.string(),
  credits: z.number(),
  grade: z.string(),
  points: z.number(),
});

export type TranscriptCourse = z.infer<typeof TranscriptCourseSchema>;

export const SemesterRecordSchema = z.object({
  name: z.string(),
  courses: z.array(TranscriptCourseSchema),
  semesterGpa: z.number(),
});

export type SemesterRecord = z.infer<typeof SemesterRecordSchema>;

export const TranscriptDataSchema = z.object({
  semesters: z.array(SemesterRecordSchema),
  cumulativeGpa: z.number(),
});

export type TranscriptData = z.infer<typeof TranscriptDataSchema>;

export const FeeItemSchema = z.object({
  item: z.string(),
  amount: z.number(),
});

export type FeeItem = z.infer<typeof FeeItemSchema>;

export const AnnouncementSchema = z.object({
  title: z.string(),
  date: z.string(),
  desc: z.string(),
});

export type Announcement = z.infer<typeof AnnouncementSchema>;

// --- Generated Course (from DB) ---

export const GeneratedCourseSchema = z.object({
  code: z.string(),
  name: z.string(),
  credits: z.number(),
  instructor: z.string().optional(),
  schedule: z.string().optional(),
  room: z.string().optional(),
  faculty: z.string().optional(),
});

export type GeneratedCourse = z.infer<typeof GeneratedCourseSchema>;

// --- Session API schemas ---

export const SessionGetResponseSchema = z.object({
  sessionId: z.string(),
  studentData: StudentDataSchema,
  admissionData: AdmissionDataSchema,
  portalData: PortalStudentDataSchema,
  generatedCourses: z.array(GeneratedCourseSchema),
  generatedTranscript: TranscriptDataSchema.nullable(),
  generatedFees: z.array(FeeItemSchema),
  generatedAnnouncements: z.array(AnnouncementSchema),
  photoUrl: z.string(),
  signatureUrl: z.string(),
  selectedCard: z.string(),
  selectedDoc: z.string(),
  selectedPortal: z.string(),
  mode: z.string(),
});

export type SessionGetResponse = z.infer<typeof SessionGetResponseSchema>;

export const SessionUpdateRequestSchema = z.object({
  sessionId: z.string().uuid(),
  studentData: StudentDataSchema.optional(),
  admissionData: AdmissionDataSchema.optional(),
  portalData: PortalStudentDataSchema.optional(),
  selectedCard: z.string().optional(),
  selectedDoc: z.string().optional(),
  selectedPortal: z.string().optional(),
  mode: z.string().optional(),
});

export type SessionUpdateRequest = z.infer<typeof SessionUpdateRequestSchema>;

export const RegenerateRequestSchema = z.object({
  sessionId: z.string().uuid(),
});

export type RegenerateRequest = z.infer<typeof RegenerateRequestSchema>;

// --- University schema ---

export const UniversitySchema = z.object({
  name: z.string().min(1),
  faculties: z.array(z.string()),
  address: z.string().optional(),
  logoUrl: z.string().optional(),
  emailSuffix: z.string().optional(),
  headerColor: z.string().optional(),
});

export type UniversityData = z.infer<typeof UniversitySchema>;

// --- Course schema ---

export const CourseSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  credits: z.number().int().min(1).max(6),
  instructor: z.string().min(1),
  schedule: z.string().min(1),
  room: z.string().min(1),
  faculty: z.string().min(1),
});

export type CourseData = z.infer<typeof CourseSchema>;

// --- Admin schemas ---

export const AdminLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type AdminLoginRequest = z.infer<typeof AdminLoginRequestSchema>;

export const AdminUniversityCreateSchema = UniversitySchema;

export const AdminUniversityUpdateSchema = UniversitySchema.partial();

export const AdminCourseCreateSchema = CourseSchema;

export const AdminCourseUpdateSchema = CourseSchema.partial();
