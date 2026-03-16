import mongoose, { Schema, Document, Model } from "mongoose";

// --- Embedded sub-schemas ---

const TranscriptCourseSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    grade: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { _id: false }
);

const SemesterRecordSchema = new Schema(
  {
    name: { type: String, required: true },
    courses: { type: [TranscriptCourseSchema], required: true },
    semesterGpa: { type: Number, required: true },
  },
  { _id: false }
);

const TranscriptDataSchema = new Schema(
  {
    semesters: { type: [SemesterRecordSchema], required: true },
    cumulativeGpa: { type: Number, required: true },
  },
  { _id: false }
);

const FeeItemSchema = new Schema(
  {
    item: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const AnnouncementSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { _id: false }
);

const GeneratedCourseSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    instructor: { type: String },
    schedule: { type: String },
    room: { type: String },
    faculty: { type: String },
  },
  { _id: false }
);

// --- Student data sub-schemas ---

const StudentDataSchema = new Schema(
  {
    fullName: { type: String, default: "Nguyen Van A" },
    studentId: { type: String, default: "20251234" },
    universityName: { type: String, default: "" },
    universityLogo: { type: String, default: "" },
    universityAddress: { type: String, default: "" },
    faculty: { type: String, default: "Faculty of Engineering" },
    major: { type: String, default: "Computer Science" },
    issueDate: { type: String, default: "" },
    expiryDate: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
  },
  { _id: false }
);

const AdmissionDataSchema = new Schema(
  {
    fullName: { type: String, default: "Nguyen Van A" },
    studentId: { type: String, default: "20251234" },
    universityName: { type: String, default: "" },
    universityLogo: { type: String, default: "" },
    universityAddress: { type: String, default: "" },
    faculty: { type: String, default: "Faculty of Engineering" },
    major: { type: String, default: "Computer Science" },
    dateOfBirth: { type: String, default: "2003-05-15" },
    nationality: { type: String, default: "Vietnamese" },
    passportId: { type: String, default: "B12345678" },
    email: { type: String, default: "nguyenvana@gtu.edu" },
    phone: { type: String, default: "+84 912 345 678" },
    address: {
      type: String,
      default: "123 University Street, District 1, Ho Chi Minh City",
    },
    emergencyContact: {
      type: String,
      default: "Nguyen Van B - +84 909 876 543",
    },
    admissionSemester: { type: String, default: "" },
    academicYear: { type: String, default: "" },
    issueDate: { type: String, default: "" },
    enrollmentDate: { type: String, default: "" },
    paymentDeadline: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    signatureUrl: { type: String, default: "" },
  },
  { _id: false }
);

const PortalStudentDataSchema = new Schema(
  {
    fullName: { type: String, default: "Nguyen Van A" },
    studentId: { type: String, default: "20251234" },
    universityName: { type: String, default: "" },
    universityLogo: { type: String, default: "" },
    universityAddress: { type: String, default: "" },
    faculty: { type: String, default: "Faculty of Engineering" },
    major: { type: String, default: "Computer Science" },
    nationality: { type: String, default: "Vietnamese" },
    dateOfBirth: { type: String, default: "2003-05-15" },
    enrollmentYear: { type: String, default: "" },
    expectedGraduation: { type: String, default: "" },
    status: { type: String, default: "Active" },
    photoUrl: { type: String, default: "" },
    currentSemester: { type: String, default: "" },
    gpa: { type: String, default: "3.5" },
    creditsCompleted: { type: String, default: "60" },
    totalCredits: { type: String, default: "140" },
    academicStanding: { type: String, default: "Good Standing" },
    academicAdvisor: { type: String, default: "" },
    semesterTuition: { type: String, default: "" },
    paymentStatus: { type: String, default: "Pending" },
    paymentDeadline: { type: String, default: "" },
  },
  { _id: false }
);

// --- Main Session schema ---

export interface ISession extends Document {
  sessionId: string;
  studentData: Record<string, unknown>;
  admissionData: Record<string, unknown>;
  portalData: Record<string, unknown>;
  generatedCourses: Array<Record<string, unknown>>;
  generatedTranscript: Record<string, unknown>;
  generatedFees: Array<Record<string, unknown>>;
  generatedAnnouncements: Array<Record<string, unknown>>;
  photoUrl: string;
  signatureUrl: string;
  selectedCard: string;
  selectedDoc: string;
  selectedPortal: string;
  mode: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    studentData: { type: StudentDataSchema, default: () => ({}) },
    admissionData: { type: AdmissionDataSchema, default: () => ({}) },
    portalData: { type: PortalStudentDataSchema, default: () => ({}) },
    generatedCourses: { type: [GeneratedCourseSchema], default: [] },
    generatedTranscript: { type: TranscriptDataSchema, default: null },
    generatedFees: { type: [FeeItemSchema], default: [] },
    generatedAnnouncements: { type: [AnnouncementSchema], default: [] },
    photoUrl: { type: String, default: "" },
    signatureUrl: { type: String, default: "" },
    selectedCard: { type: String, default: "mit" },
    selectedDoc: { type: String, default: "admission-letter" },
    selectedPortal: { type: String, default: "classic" },
    mode: { type: String, default: "cards" },
  },
  {
    timestamps: true,
  }
);

SessionSchema.index({ updatedAt: 1 });

const Session: Model<ISession> =
  mongoose.models.Session ||
  mongoose.model<ISession>("Session", SessionSchema);

export default Session;
