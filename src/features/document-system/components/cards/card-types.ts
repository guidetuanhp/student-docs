export interface StudentData {
  fullName: string;
  studentId: string;
  universityName: string;
  universityLogo: string;
  universityAddress: string;
  faculty: string;
  major: string;
  issueDate: string;
  expiryDate: string;
  photoUrl: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  style: string;
  orientation: "horizontal" | "vertical";
  description: string;
}

export const defaultStudentData: StudentData = {
  fullName: "Nguyen Van A",
  studentId: "20251234",
  universityName: "Global Tech University",
  universityLogo: "",
  universityAddress: "",
  faculty: "Faculty of Engineering",
  major: "Computer Science",
  issueDate: "2025-09-01",
  expiryDate: "2029-06-30",
  photoUrl: "/photos/student-01.png",
};

export const cardTemplates: CardTemplate[] = [
  {
    id: "mit",
    name: "MIT Style",
    style: "Classic Red",
    orientation: "horizontal",
    description: "Inspired by MIT -- bold red with clean layout",
  },
  {
    id: "harvard",
    name: "Harvard Style",
    style: "Crimson Elegant",
    orientation: "horizontal",
    description: "Crimson and gold, formal and prestigious",
  },
  {
    id: "korean",
    name: "Korean University",
    style: "Modern Vertical",
    orientation: "vertical",
    description: "Clean vertical layout with K-style design",
  },
  {
    id: "european",
    name: "European University",
    style: "Blue Formal",
    orientation: "horizontal",
    description: "Classic European blue with formal typography",
  },
  {
    id: "tech",
    name: "Tech University",
    style: "Dark Tech",
    orientation: "horizontal",
    description: "Dark theme with neon accent colors",
  },
  {
    id: "minimal",
    name: "Minimal Modern",
    style: "Clean White",
    orientation: "horizontal",
    description: "Ultra-clean minimalist design",
  },
  {
    id: "colorful",
    name: "Colorful Campus",
    style: "Gradient",
    orientation: "horizontal",
    description: "Vibrant gradient with energetic feel",
  },
  {
    id: "darkmode",
    name: "Dark Mode",
    style: "Dark Theme",
    orientation: "horizontal",
    description: "Full dark mode with subtle highlights",
  },
  {
    id: "plastic",
    name: "Plastic Card",
    style: "Glossy",
    orientation: "horizontal",
    description: "Realistic glossy plastic card effect",
  },
  {
    id: "smartcard",
    name: "Smart Card",
    style: "With Chip",
    orientation: "horizontal",
    description: "Smart card with embedded chip design",
  },
  {
    id: "medical",
    name: "Medical School",
    style: "Green Clinical",
    orientation: "vertical",
    description: "Medical faculty green with clinical feel",
  },
  {
    id: "art",
    name: "Art School",
    style: "Creative",
    orientation: "horizontal",
    description: "Creative and artistic design with bold typography",
  },
];
