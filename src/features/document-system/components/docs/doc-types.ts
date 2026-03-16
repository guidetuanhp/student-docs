export interface AdmissionData {
  fullName: string;
  studentId: string;
  universityName: string;
  universityLogo: string;
  universityAddress: string;
  faculty: string;
  major: string;
  dateOfBirth: string;
  nationality: string;
  passportId: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  admissionSemester: string;
  academicYear: string;
  issueDate: string;
  enrollmentDate: string;
  paymentDeadline: string;
  photoUrl: string;
  signatureUrl: string;
}

export interface DocTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const defaultAdmissionData: AdmissionData = {
  fullName: "Nguyen Van A",
  studentId: "20251234",
  universityName: "Global Tech University",
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
  admissionSemester: "Fall 2025",
  academicYear: "2025-2026",
  issueDate: "2025-07-15",
  enrollmentDate: "2025-09-01",
  paymentDeadline: "2025-08-15",
  photoUrl: "/photos/student-01.png",
  signatureUrl: "/signatures/signature-01.png",
};

export const docTemplates: DocTemplate[] = [
  {
    id: "admission-letter",
    name: "Admission Letter",
    category: "Admission",
    description: "Official university admission letter with formal academic styling",
  },
  {
    id: "enrollment-confirm",
    name: "Enrollment Confirmation",
    category: "Enrollment",
    description: "Confirms student has successfully enrolled in the program",
  },
  {
    id: "student-info-form",
    name: "Student Information Form",
    category: "Forms",
    description: "New student registration form with personal details",
  },
  {
    id: "tuition-notice",
    name: "Tuition Fee Notice",
    category: "Finance",
    description: "Official tuition invoice with payment breakdown",
  },
  {
    id: "course-registration",
    name: "Course Registration Sheet",
    category: "Academic",
    description: "Course enrollment document with schedule details",
  },
  {
    id: "dormitory-form",
    name: "Dormitory Application",
    category: "Housing",
    description: "Student dormitory and housing application form",
  },
  {
    id: "id-application",
    name: "Student ID Application",
    category: "Forms",
    description: "Application form for student identification card",
  },
  {
    id: "orientation-sheet",
    name: "Orientation Info Sheet",
    category: "Welcome",
    description: "Welcome orientation schedule and campus information",
  },
  {
    id: "transcript",
    name: "Academic Transcript",
    category: "Academic",
    description: "Official academic transcript with semester grades",
  },
  {
    id: "scholarship-notice",
    name: "Scholarship Notice",
    category: "Finance",
    description: "Scholarship award notification letter",
  },
];
