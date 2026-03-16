// Default data constants for student identity fields.
// Used as initial values when creating a new session.

export const defaultStudentData = {
  fullName: "Nguyen Van A",
  studentId: "20251234",
  universityName: "",
  universityLogo: "",
  universityAddress: "",
  faculty: "Faculty of Engineering",
  major: "Computer Science",
  issueDate: "",
  expiryDate: "",
  photoUrl: "",
};

export const defaultAdmissionData = {
  fullName: "Nguyen Van A",
  studentId: "20251234",
  universityName: "",
  universityLogo: "",
  universityAddress: "",
  faculty: "Faculty of Engineering",
  major: "Computer Science",
  dateOfBirth: "2003-05-15",
  nationality: "Vietnamese",
  passportId: "B12345678",
  email: "nguyenvana@gtu.edu",
  phone: "+84 912 345 678",
  address: "123 University Street, District 1, Ho Chi Minh City",
  emergencyContact: "Nguyen Van B - +84 909 876 543",
  admissionSemester: "",
  academicYear: "",
  issueDate: "",
  enrollmentDate: "",
  paymentDeadline: "",
  photoUrl: "",
  signatureUrl: "",
};

export const defaultPortalData = {
  fullName: "Nguyen Van A",
  studentId: "20251234",
  universityName: "",
  universityLogo: "",
  universityAddress: "",
  faculty: "Faculty of Engineering",
  major: "Computer Science",
  nationality: "Vietnamese",
  dateOfBirth: "2003-05-15",
  enrollmentYear: "",
  expectedGraduation: "",
  status: "Active",
  photoUrl: "",
  currentSemester: "",
  gpa: "3.5",
  creditsCompleted: "60",
  totalCredits: "140",
  academicStanding: "Good Standing",
  academicAdvisor: "",
  semesterTuition: "",
  paymentStatus: "Pending",
  paymentDeadline: "",
};

// Common fields shared across all three modules (used by sync)
export const COMMON_SYNC_FIELDS = [
  "fullName",
  "studentId",
  "universityName",
  "universityLogo",
  "universityAddress",
  "faculty",
  "major",
  "photoUrl",
] as const;

// Default template selections
export const defaultSelectedCard = "mit";
export const defaultSelectedDoc = "admission-letter";
export const defaultSelectedPortal = "classic";
export const defaultMode = "cards";
