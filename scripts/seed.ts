import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually (tsx does not auto-load Next.js env files)
const envPath = resolve(__dirname, "..", ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex);
    const value = trimmed.slice(eqIndex + 1);
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  console.log("No .env.local found, using environment variables.");
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const MONGODB_DB = process.env.MONGODB_DB || "university-doc-system";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@university.edu";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// --- Load logo data from univeristy.json ---
const uniJsonPath = resolve(__dirname, "..", "..", "univeristy.json");
let logoMap: Record<string, string> = {};
try {
  const uniJsonContent = readFileSync(uniJsonPath, "utf-8");
  const uniJsonData = JSON.parse(uniJsonContent) as { name: string; logo?: string }[];
  for (const u of uniJsonData) {
    if (u.logo) logoMap[u.name.trim()] = u.logo;
  }
  console.log(`Loaded logos for ${Object.keys(logoMap).length} universities from univeristy.json`);
} catch {
  console.log("univeristy.json not found, logos will be empty.");
}

// --- University seed data ---

const universities = [
  {
    name: "Community College of Rhode Island",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business",
      "Faculty of Engineering Technology",
      "Faculty of Nursing",
    ],
    address: "400 East Ave, Warwick, RI 02886, USA",
    logoUrl: "",
    emailSuffix: "my.ccri.edu",
  },
  {
    name: "Pukyong National University",
    faculties: [
      "Faculty of Engineering",
      "Faculty of Natural Sciences",
      "Faculty of Humanities and Social Sciences",
      "Faculty of Business Administration",
    ],
    address: "45 Yongso-ro, Nam-gu, Busan 48513, South Korea",
    logoUrl: "",
    emailSuffix: "pukyong.ac.kr",
  },
  {
    name: "Dongguk University",
    faculties: [
      "Faculty of Liberal Arts",
      "Faculty of Social Sciences",
      "Faculty of Engineering",
      "Faculty of Information and Communication",
    ],
    address: "30 Pildong-ro 1-gil, Jung-gu, Seoul 04620, South Korea",
    logoUrl: "",
    emailSuffix: "dgu.ac.kr",
  },
  {
    name: "Chung-Ang University",
    faculties: [
      "Faculty of Engineering",
      "Faculty of Business Administration",
      "Faculty of Arts",
      "Faculty of Social Sciences",
    ],
    address: "84 Heukseok-ro, Dongjak-gu, Seoul 06974, South Korea",
    logoUrl: "",
    emailSuffix: "cau.ac.kr",
  },
  {
    name: "Hanoi University of Culture",
    faculties: [
      "Faculty of Cultural Management",
      "Faculty of Library and Information Science",
      "Faculty of Tourism",
      "Faculty of Arts",
    ],
    address: "418 La Thanh, Dong Da, Hanoi, Vietnam",
    logoUrl: "",
    emailSuffix: "huc.edu.vn",
  },
  {
    name: "Kenya Methodist University",
    faculties: [
      "Faculty of Science and Technology",
      "Faculty of Business and Economics",
      "Faculty of Education and Arts",
      "Faculty of Health Sciences",
    ],
    address: "P.O. Box 267-60200, Meru, Kenya",
    logoUrl: "",
    emailSuffix: "kemu.ac.ke",
  },
  {
    name: "California State University",
    faculties: [
      "Faculty of Engineering",
      "Faculty of Business",
      "Faculty of Health and Human Services",
      "Faculty of Arts and Letters",
    ],
    address: "401 Golden Shore, Long Beach, CA 90802, USA",
    logoUrl: "",
    emailSuffix: "calstate.edu",
  },
  {
    name: "Jagan Institute of Management Studies",
    faculties: [
      "Faculty of Management",
      "Faculty of Information Technology",
      "Faculty of Commerce",
      "Faculty of Engineering",
    ],
    address: "3, Institutional Area, Sector-5, Rohini, New Delhi 110085, India",
    logoUrl: "",
    emailSuffix: "jimsindia.org",
  },
  {
    name: "Posts and Telecommunications Institute of Technology",
    faculties: [
      "Faculty of Information Technology",
      "Faculty of Telecommunications",
      "Faculty of Electronics",
      "Faculty of Business Administration",
    ],
    address: "97 Man Thien, Hiep Phu, Thu Duc, Ho Chi Minh City, Vietnam",
    logoUrl: "",
    emailSuffix: "student.ptithcm.edu.vn",
  },
  {
    name: "Bakersfield College",
    faculties: [
      "Faculty of Arts and Humanities",
      "Faculty of Science and Engineering",
      "Faculty of Social Sciences",
      "Faculty of Career and Technical Education",
    ],
    address: "1801 Panorama Dr, Bakersfield, CA 93305, USA",
    logoUrl: "",
    emailSuffix: "bakersfieldcollege.edu",
  },
  {
    name: "Lake-Sumter State College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business",
      "Faculty of Health Sciences",
      "Faculty of Public Safety",
    ],
    address: "9501 US Hwy 441, Leesburg, FL 34788, USA",
    logoUrl: "",
    emailSuffix: "lssc.edu",
  },
  {
    name: "Athens State University",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business",
      "Faculty of Education",
      "Faculty of Technology and Engineering",
    ],
    address: "300 N Beaty St, Athens, AL 35611, USA",
    logoUrl: "",
    emailSuffix: "my.athens.edu",
  },
  {
    name: "Rockland Community College",
    faculties: [
      "Faculty of Liberal Arts",
      "Faculty of Science and Engineering",
      "Faculty of Business",
      "Faculty of Health and Human Services",
    ],
    address: "145 College Rd, Suffern, NY 10901, USA",
    logoUrl: "",
    emailSuffix: "sunyrockland.edu",
  },
  {
    name: "Columbia Gorge Community College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Career and Technical Education",
      "Faculty of Health Sciences",
      "Faculty of Education",
    ],
    address: "400 E Scenic Dr, The Dalles, OR 97058, USA",
    logoUrl: "",
    emailSuffix: "cgcc.edu",
  },
  {
    name: "FPT University Vietnam",
    faculties: [
      "Faculty of Information Technology",
      "Faculty of Business Administration",
      "Faculty of Engineering",
      "Faculty of Arts and Design",
    ],
    address: "Khu CNC Hoa Lac, Thach That, Hanoi, Vietnam",
    logoUrl: "",
    emailSuffix: "fpt.edu.vn",
  },
  {
    name: "Porterville College",
    faculties: [
      "Faculty of Arts and Humanities",
      "Faculty of Science and Mathematics",
      "Faculty of Business",
      "Faculty of Career and Technical Education",
    ],
    address: "100 E College Ave, Porterville, CA 93257, USA",
    logoUrl: "",
    emailSuffix: "email.portervillecollege.edu",
  },
  {
    name: "Everett Community College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business and Technology",
      "Faculty of Health Sciences",
      "Faculty of Workforce Education",
    ],
    address: "2000 Tower St, Everett, WA 98201, USA",
    logoUrl: "",
    emailSuffix: "students.everettcc.edu",
  },
  {
    name: "Hinds Community College",
    faculties: [
      "Faculty of Career and Technical Education",
      "Faculty of Arts and Sciences",
      "Faculty of Health Sciences",
      "Faculty of Business",
    ],
    address: "501 E Main St, Raymond, MS 39154, USA",
    logoUrl: "",
    emailSuffix: "hindscc.edu",
  },
  {
    name: "Texas State Technical College",
    faculties: [
      "Faculty of Engineering Technology",
      "Faculty of Computer Science",
      "Faculty of Business",
      "Faculty of Health Sciences",
    ],
    address: "3801 Campus Dr, Waco, TX 76705, USA",
    logoUrl: "",
    emailSuffix: "mymail.tstc.edu",
  },
  {
    name: "University of the District of Columbia",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Engineering and Applied Sciences",
      "Faculty of Business and Public Administration",
      "Faculty of Education",
    ],
    address: "4200 Connecticut Ave NW, Washington, DC 20008, USA",
    logoUrl: "",
    emailSuffix: "udc.edu",
  },
  {
    name: "Pusan National University",
    faculties: [
      "Faculty of Engineering",
      "Faculty of Natural Sciences",
      "Faculty of Social Sciences",
      "Faculty of Business Administration",
    ],
    address: "2 Busandaehak-ro 63beon-gil, Geumjeong-gu, Busan 46241, South Korea",
    logoUrl: "",
    emailSuffix: "pusan.ac.kr",
  },
  {
    name: "Tarrant County College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business",
      "Faculty of Health Sciences",
      "Faculty of Career and Technical Education",
    ],
    address: "1500 Houston St, Fort Worth, TX 76102, USA",
    logoUrl: "",
    emailSuffix: "tccd.edu",
  },
  {
    name: "Glendale Community College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business and Computer Science",
      "Faculty of Health Sciences",
      "Faculty of Career and Technical Education",
    ],
    address: "6000 W Olive Ave, Glendale, AZ 85302, USA",
    logoUrl: "",
    emailSuffix: "glendale.edu",
  },
  {
    name: "Vietnam National University Ho Chi Minh City",
    faculties: [
      "Faculty of Science",
      "Faculty of Information Technology",
      "Faculty of Engineering",
      "Faculty of Social Sciences and Humanities",
    ],
    address: "Khu pho 6, Linh Trung, Thu Duc, Ho Chi Minh City, Vietnam",
    logoUrl: "",
    emailSuffix: "hcmus.edu.vn",
  },
  {
    name: "Nortwest College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business",
      "Faculty of Health Sciences",
      "Faculty of Education",
    ],
    address: "231 Lawson St South, Ballarat VIC 3350, Australia",
    logoUrl: "",
    emailSuffix: "nortwest.edu.au",
  },
  {
    name: "Zetech University",
    faculties: [
      "Faculty of Computing and IT",
      "Faculty of Business and Economics",
      "Faculty of Media and Communication",
      "Faculty of Engineering",
    ],
    address: "P.O. Box 2768-00200, Nairobi, Kenya",
    logoUrl: "",
    emailSuffix: "zetech.ac.ke",
  },
  {
    name: "Foreign Trade University",
    faculties: [
      "Faculty of International Economics",
      "Faculty of Business Administration",
      "Faculty of Banking and Finance",
      "Faculty of International Business",
    ],
    address: "91 Chua Lang, Dong Da, Hanoi, Vietnam",
    logoUrl: "",
    emailSuffix: "ftu.edu.vn",
  },
  {
    name: "Electric Power University",
    faculties: [
      "Faculty of Electrical Engineering",
      "Faculty of Information Technology",
      "Faculty of Energy Technology",
      "Faculty of Business Administration",
    ],
    address: "235 Hoang Quoc Viet, Bac Tu Liem, Hanoi, Vietnam",
    logoUrl: "",
    emailSuffix: "epu.edu.vn",
  },
  {
    name: "Nguyen Tat Thanh University",
    faculties: [
      "Faculty of Engineering and Technology",
      "Faculty of Business Administration",
      "Faculty of Health Sciences",
      "Faculty of Arts and Tourism",
    ],
    address: "300A Nguyen Tat Thanh, District 4, Ho Chi Minh City, Vietnam",
    logoUrl: "",
    emailSuffix: "nttu.edu.vn",
  },
  {
    name: "Santa Fe College",
    faculties: [
      "Faculty of Arts and Sciences",
      "Faculty of Business",
      "Faculty of Health Sciences",
      "Faculty of Career and Technical Education",
    ],
    address: "3000 NW 83rd St, Gainesville, FL 32606, USA",
    logoUrl: "",
    emailSuffix: "go.sfcollege.edu",
  },
  {
    name: "National Open University of Nigeria",
    faculties: [
      "Faculty of Arts",
      "Faculty of Science and Technology",
      "Faculty of Education",
      "Faculty of Management Sciences",
    ],
    address: "14/16 Ahmadu Bello Way, Victoria Island, Lagos, Nigeria",
    logoUrl: "",
    emailSuffix: "noun.edu.ng",
  },
  {
    name: "Hoa Sen University",
    faculties: [
      "Faculty of Business Administration",
      "Faculty of Information Technology",
      "Faculty of Design and Art",
      "Faculty of Social Sciences",
    ],
    address: "8 Nguyen Van Trang, District 1, Ho Chi Minh City, Vietnam",
    logoUrl: "",
    emailSuffix: "hoasen.edu.vn",
  },
  {
    name: "Durham University",
    faculties: [
      "Faculty of Arts and Humanities",
      "Faculty of Science",
      "Faculty of Social Sciences and Health",
      "Faculty of Business",
    ],
    address: "Stockton Rd, Durham DH1 3LE, United Kingdom",
    logoUrl: "",
    emailSuffix: "durham.ac.uk",
  },
  {
    name: "University of Bath",
    faculties: [
      "Faculty of Engineering and Design",
      "Faculty of Humanities and Social Sciences",
      "Faculty of Science",
      "Faculty of Management",
    ],
    address: "Claverton Down, Bath BA2 7AY, United Kingdom",
    logoUrl: "",
    emailSuffix: "bath.ac.uk",
  },
  {
    name: "School of Economics - University of Da Nang",
    faculties: [
      "Faculty of Economics",
      "Faculty of Business Administration",
      "Faculty of Finance and Banking",
      "Faculty of Tourism",
    ],
    address: "71 Ngu Hanh Son, Da Nang, Vietnam",
    logoUrl: "",
    emailSuffix: "due.udn.vn",
  },
  {
    name: "Thuy Loi University",
    faculties: [
      "Faculty of Water Resources Engineering",
      "Faculty of Civil Engineering",
      "Faculty of Information Technology",
      "Faculty of Economics and Management",
    ],
    address: "175 Tay Son, Dong Da, Hanoi, Vietnam",
    logoUrl: "",
    emailSuffix: "tlu.edu.vn",
  },
  {
    name: "Ho Chi Minh City University of Foreign Languages and Information Technology",
    faculties: [
      "Faculty of Foreign Languages",
      "Faculty of Information Technology",
      "Faculty of Business Administration",
      "Faculty of International Relations",
    ],
    address: "155 Su Van Hanh, District 10, Ho Chi Minh City, Vietnam",
    logoUrl: "",
    emailSuffix: "huflit.edu.vn",
  },
  {
    name: "University of Economics Ho Chi Minh City",
    faculties: [
      "Faculty of Economics",
      "Faculty of Business Administration",
      "Faculty of Finance and Banking",
      "Faculty of Information Systems",
    ],
    address: "59C Nguyen Dinh Chieu, District 3, Ho Chi Minh City, Vietnam",
    logoUrl: "",
    emailSuffix: "ueh.edu.vn",
  },
];

// --- Course seed data ---

const courses = [
  // Computer Science
  { code: "CS101", name: "Introduction to Computer Science", credits: 3, instructor: "Dr. John Smith", schedule: "Mon/Wed 9:00-10:30", room: "A101", faculty: "Faculty of Engineering" },
  { code: "CS201", name: "Data Structures and Algorithms", credits: 4, instructor: "Dr. Sarah Chen", schedule: "Tue/Thu 10:00-11:30", room: "A202", faculty: "Faculty of Engineering" },
  { code: "CS301", name: "Database Management Systems", credits: 3, instructor: "Dr. Michael Brown", schedule: "Mon/Wed 13:00-14:30", room: "B105", faculty: "Faculty of Engineering" },
  { code: "CS302", name: "Operating Systems", credits: 3, instructor: "Dr. Emily Davis", schedule: "Tue/Thu 14:00-15:30", room: "A301", faculty: "Faculty of Engineering" },
  { code: "CS401", name: "Artificial Intelligence", credits: 3, instructor: "Dr. James Wilson", schedule: "Mon/Wed 15:00-16:30", room: "C201", faculty: "Faculty of Engineering" },
  { code: "CS402", name: "Machine Learning", credits: 3, instructor: "Dr. Lisa Wang", schedule: "Tue/Thu 9:00-10:30", room: "C202", faculty: "Faculty of Engineering" },
  { code: "CS403", name: "Computer Networks", credits: 3, instructor: "Dr. Robert Lee", schedule: "Mon/Wed 10:00-11:30", room: "B201", faculty: "Faculty of Engineering" },
  { code: "CS404", name: "Software Engineering", credits: 3, instructor: "Dr. Anna Martinez", schedule: "Tue/Thu 13:00-14:30", room: "A102", faculty: "Faculty of Engineering" },
  { code: "CS450", name: "Cloud Computing", credits: 3, instructor: "Dr. David Kim", schedule: "Fri 9:00-12:00", room: "C301", faculty: "Faculty of Engineering" },
  { code: "CS460", name: "Cybersecurity Fundamentals", credits: 3, instructor: "Dr. Karen Thompson", schedule: "Mon/Wed 11:00-12:30", room: "B301", faculty: "Faculty of Engineering" },

  // Mathematics
  { code: "MATH101", name: "Calculus I", credits: 4, instructor: "Prof. William Taylor", schedule: "Mon/Wed/Fri 8:00-9:00", room: "M101", faculty: "Faculty of Science" },
  { code: "MATH201", name: "Linear Algebra", credits: 3, instructor: "Prof. Jennifer Adams", schedule: "Tue/Thu 10:00-11:30", room: "M102", faculty: "Faculty of Science" },
  { code: "MATH202", name: "Calculus II", credits: 4, instructor: "Prof. William Taylor", schedule: "Mon/Wed/Fri 10:00-11:00", room: "M101", faculty: "Faculty of Science" },
  { code: "MATH301", name: "Probability and Statistics", credits: 3, instructor: "Prof. Richard Clark", schedule: "Tue/Thu 14:00-15:30", room: "M201", faculty: "Faculty of Science" },
  { code: "MATH302", name: "Discrete Mathematics", credits: 3, instructor: "Prof. Jennifer Adams", schedule: "Mon/Wed 13:00-14:30", room: "M102", faculty: "Faculty of Science" },
  { code: "MATH401", name: "Numerical Analysis", credits: 3, instructor: "Prof. Susan Wright", schedule: "Tue/Thu 9:00-10:30", room: "M301", faculty: "Faculty of Science" },
  { code: "MATH402", name: "Differential Equations", credits: 3, instructor: "Prof. Richard Clark", schedule: "Mon/Wed 15:00-16:30", room: "M201", faculty: "Faculty of Science" },

  // Physics
  { code: "PHY101", name: "General Physics I", credits: 4, instructor: "Dr. Thomas Anderson", schedule: "Mon/Wed/Fri 9:00-10:00", room: "P101", faculty: "Faculty of Science" },
  { code: "PHY201", name: "General Physics II", credits: 4, instructor: "Dr. Thomas Anderson", schedule: "Mon/Wed/Fri 11:00-12:00", room: "P101", faculty: "Faculty of Science" },
  { code: "PHY301", name: "Quantum Mechanics", credits: 3, instructor: "Dr. Patricia Moore", schedule: "Tue/Thu 10:00-11:30", room: "P201", faculty: "Faculty of Science" },
  { code: "PHY302", name: "Thermodynamics", credits: 3, instructor: "Dr. George Harris", schedule: "Mon/Wed 14:00-15:30", room: "P202", faculty: "Faculty of Science" },
  { code: "PHY401", name: "Electromagnetic Theory", credits: 3, instructor: "Dr. Patricia Moore", schedule: "Tue/Thu 14:00-15:30", room: "P301", faculty: "Faculty of Science" },

  // Business
  { code: "BUS101", name: "Introduction to Business", credits: 3, instructor: "Prof. Nancy White", schedule: "Tue/Thu 9:00-10:30", room: "B101", faculty: "Faculty of Business" },
  { code: "BUS201", name: "Principles of Marketing", credits: 3, instructor: "Prof. Daniel Green", schedule: "Mon/Wed 10:00-11:30", room: "B102", faculty: "Faculty of Business" },
  { code: "BUS202", name: "Financial Accounting", credits: 3, instructor: "Prof. Carol Hall", schedule: "Tue/Thu 13:00-14:30", room: "B103", faculty: "Faculty of Business" },
  { code: "BUS301", name: "Business Statistics", credits: 3, instructor: "Prof. Mark Robinson", schedule: "Mon/Wed 14:00-15:30", room: "B201", faculty: "Faculty of Business" },
  { code: "BUS302", name: "Organizational Behavior", credits: 3, instructor: "Prof. Nancy White", schedule: "Tue/Thu 15:00-16:30", room: "B202", faculty: "Faculty of Business" },
  { code: "BUS401", name: "Strategic Management", credits: 3, instructor: "Prof. Daniel Green", schedule: "Mon/Wed 9:00-10:30", room: "B301", faculty: "Faculty of Business" },
  { code: "BUS402", name: "International Business", credits: 3, instructor: "Prof. Carol Hall", schedule: "Fri 13:00-16:00", room: "B302", faculty: "Faculty of Business" },

  // Engineering
  { code: "ENG101", name: "Engineering Mechanics", credits: 3, instructor: "Dr. Steven Baker", schedule: "Mon/Wed 8:00-9:30", room: "E101", faculty: "Faculty of Engineering" },
  { code: "ENG201", name: "Circuit Analysis", credits: 3, instructor: "Dr. Margaret Young", schedule: "Tue/Thu 10:00-11:30", room: "E201", faculty: "Faculty of Engineering" },
  { code: "ENG202", name: "Materials Science", credits: 3, instructor: "Dr. Steven Baker", schedule: "Mon/Wed 13:00-14:30", room: "E102", faculty: "Faculty of Engineering" },
  { code: "ENG301", name: "Control Systems", credits: 3, instructor: "Dr. Margaret Young", schedule: "Tue/Thu 14:00-15:30", room: "E301", faculty: "Faculty of Engineering" },
  { code: "ENG302", name: "Digital Signal Processing", credits: 3, instructor: "Dr. Kevin Turner", schedule: "Mon/Wed 15:00-16:30", room: "E302", faculty: "Faculty of Engineering" },
  { code: "ENG401", name: "Robotics and Automation", credits: 3, instructor: "Dr. Kevin Turner", schedule: "Fri 9:00-12:00", room: "E401", faculty: "Faculty of Engineering" },

  // Humanities / English
  { code: "ENG111", name: "English Composition I", credits: 3, instructor: "Prof. Barbara Scott", schedule: "Mon/Wed 9:00-10:30", room: "H101", faculty: "Faculty of Arts" },
  { code: "ENG112", name: "English Composition II", credits: 3, instructor: "Prof. Barbara Scott", schedule: "Tue/Thu 9:00-10:30", room: "H101", faculty: "Faculty of Arts" },
  { code: "HIS201", name: "World History", credits: 3, instructor: "Prof. Charles King", schedule: "Mon/Wed 11:00-12:30", room: "H201", faculty: "Faculty of Arts" },
  { code: "PHI101", name: "Introduction to Philosophy", credits: 3, instructor: "Prof. Dorothy Phillips", schedule: "Tue/Thu 13:00-14:30", room: "H102", faculty: "Faculty of Arts" },
  { code: "PSY101", name: "Introduction to Psychology", credits: 3, instructor: "Prof. Sandra Campbell", schedule: "Mon/Wed 14:00-15:30", room: "H301", faculty: "Faculty of Arts" },
  { code: "SOC201", name: "Sociology of Education", credits: 3, instructor: "Prof. Paul Mitchell", schedule: "Tue/Thu 15:00-16:30", room: "H302", faculty: "Faculty of Arts" },

  // Additional courses to reach 50+
  { code: "IT201", name: "Web Development", credits: 3, instructor: "Dr. Andrew Patel", schedule: "Mon/Wed 10:00-11:30", room: "C101", faculty: "Faculty of Engineering" },
  { code: "IT301", name: "Mobile App Development", credits: 3, instructor: "Dr. Andrew Patel", schedule: "Tue/Thu 11:00-12:30", room: "C102", faculty: "Faculty of Engineering" },
  { code: "IT401", name: "DevOps and CI/CD", credits: 3, instructor: "Dr. Jessica Nguyen", schedule: "Fri 13:00-16:00", room: "C303", faculty: "Faculty of Engineering" },
  { code: "CHEM101", name: "General Chemistry", credits: 4, instructor: "Dr. Frank Miller", schedule: "Mon/Wed/Fri 8:00-9:00", room: "P102", faculty: "Faculty of Science" },
  { code: "CHEM201", name: "Organic Chemistry", credits: 3, instructor: "Dr. Frank Miller", schedule: "Tue/Thu 10:00-11:30", room: "P203", faculty: "Faculty of Science" },
  { code: "BIO101", name: "General Biology", credits: 4, instructor: "Dr. Helen Carter", schedule: "Mon/Wed/Fri 10:00-11:00", room: "P103", faculty: "Faculty of Science" },
  { code: "BIO201", name: "Molecular Biology", credits: 3, instructor: "Dr. Helen Carter", schedule: "Tue/Thu 14:00-15:30", room: "P204", faculty: "Faculty of Science" },
  { code: "ECON101", name: "Microeconomics", credits: 3, instructor: "Prof. Alan Cooper", schedule: "Mon/Wed 9:00-10:30", room: "B104", faculty: "Faculty of Business" },
  { code: "ECON201", name: "Macroeconomics", credits: 3, instructor: "Prof. Alan Cooper", schedule: "Tue/Thu 11:00-12:30", room: "B104", faculty: "Faculty of Business" },
  { code: "ECON301", name: "Econometrics", credits: 3, instructor: "Prof. Mark Robinson", schedule: "Mon/Wed 15:00-16:30", room: "B303", faculty: "Faculty of Business" },
  { code: "ART101", name: "Introduction to Visual Arts", credits: 3, instructor: "Prof. Maria Torres", schedule: "Tue/Thu 9:00-10:30", room: "H401", faculty: "Faculty of Arts" },
  { code: "MUS101", name: "Music Appreciation", credits: 2, instructor: "Prof. Robert Evans", schedule: "Fri 10:00-12:00", room: "H402", faculty: "Faculty of Arts" },
  { code: "CS205", name: "Computer Architecture", credits: 3, instructor: "Dr. Emily Davis", schedule: "Mon/Wed 11:00-12:30", room: "A203", faculty: "Faculty of Engineering" },
  { code: "CS305", name: "Compiler Design", credits: 3, instructor: "Dr. Sarah Chen", schedule: "Tue/Thu 15:00-16:30", room: "A303", faculty: "Faculty of Engineering" },
];

// --- Seed logic ---

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
  console.log(`Connected to database: ${MONGODB_DB}`);

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database connection not established");
  }

  // Seed universities
  console.log("Seeding universities...");
  const uniCollection = db.collection("universities");
  // Remove universities not in the seed list
  const seedNames = universities.map((u) => u.name);
  const deleteResult = await uniCollection.deleteMany({ name: { $nin: seedNames } });
  if (deleteResult.deletedCount > 0) {
    console.log(`  Removed ${deleteResult.deletedCount} old universities not in seed list.`);
  }
  for (const uni of universities) {
    await uniCollection.updateOne(
      { name: uni.name },
      {
        $set: {
          faculties: uni.faculties,
          address: uni.address,
          logoUrl: logoMap[uni.name] || uni.logoUrl,
          emailSuffix: uni.emailSuffix,
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
  }
  const uniCount = await uniCollection.countDocuments();
  console.log(`  Universities in DB: ${uniCount}`);

  // Seed courses
  console.log("Seeding courses...");
  const courseCollection = db.collection("courses");
  for (const course of courses) {
    await courseCollection.updateOne(
      { code: course.code },
      {
        $set: {
          name: course.name,
          credits: course.credits,
          instructor: course.instructor,
          schedule: course.schedule,
          room: course.room,
          faculty: course.faculty,
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );
  }
  const courseCount = await courseCollection.countDocuments();
  console.log(`  Courses in DB: ${courseCount}`);

  // Seed admin user
  console.log("Seeding admin user...");
  const adminCollection = db.collection("adminusers");
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await adminCollection.updateOne(
    { email: ADMIN_EMAIL },
    {
      $set: {
        passwordHash,
        name: "Admin",
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );
  const adminCount = await adminCollection.countDocuments();
  console.log(`  Admin users in DB: ${adminCount}`);

  console.log("Seed complete.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
