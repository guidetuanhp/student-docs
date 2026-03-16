import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "@/lib/mongodb";
import Session from "@/models/Session";
import Course from "@/models/Course";
import { generateAllSessionData } from "@/lib/generate";
import {
  defaultStudentData,
  defaultAdmissionData,
  defaultPortalData,
  defaultSelectedCard,
  defaultSelectedDoc,
  defaultSelectedPortal,
  defaultMode,
} from "@/lib/defaults";
import { SessionUpdateRequestSchema } from "@/lib/validation";

// GET /api/session?sessionId=...
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    await connectToDatabase();
    const session = await Session.findOne({ sessionId }).lean();

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (err) {
    console.error("GET /api/session error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/session -- create new session with generated data
export async function POST() {
  try {
    await connectToDatabase();
    const createdAt = new Date();
    const sessionId = uuidv4();

    const generated = await generateAllSessionData(Course, createdAt);

    const defaultUniversityName = generated.universityName;
    const defaultUniversityLogo = generated.universityLogo;
    const defaultUniversityAddress = generated.universityAddress;

    const sessionData = {
      sessionId,
      studentData: {
        ...defaultStudentData,
        universityName: defaultUniversityName,
        universityLogo: defaultUniversityLogo,
        universityAddress: defaultUniversityAddress,
        faculty: generated.faculty,
        major: generated.major,
        studentId: generated.studentId,
        issueDate: generated.dates.issueDate,
        expiryDate: generated.dates.expiryDate,
        photoUrl: generated.photoUrl,
      },
      admissionData: {
        ...defaultAdmissionData,
        universityName: defaultUniversityName,
        universityLogo: defaultUniversityLogo,
        universityAddress: defaultUniversityAddress,
        faculty: generated.faculty,
        major: generated.major,
        studentId: generated.studentId,
        email: generated.email,
        admissionSemester: generated.semester,
        academicYear: generated.academicYear,
        issueDate: generated.dates.issueDate,
        enrollmentDate: generated.dates.enrollmentDate,
        paymentDeadline: generated.dates.paymentDeadline,
        photoUrl: generated.photoUrl,
        signatureUrl: generated.signatureUrl,
      },
      portalData: {
        ...defaultPortalData,
        universityName: defaultUniversityName,
        universityLogo: defaultUniversityLogo,
        universityAddress: defaultUniversityAddress,
        faculty: generated.faculty,
        major: generated.major,
        studentId: generated.studentId,
        enrollmentYear: String(createdAt.getFullYear()),
        expectedGraduation: String(createdAt.getFullYear() + 4),
        currentSemester: generated.semester,
        gpa: generated.gpa,
        creditsCompleted: generated.creditsCompleted,
        academicAdvisor:
          generated.generatedCourses.length > 0
            ? generated.generatedCourses[0].instructor || "Dr. John Smith"
            : "Dr. John Smith",
        semesterTuition: String(
          generated.generatedFees.reduce((s, f) => s + f.amount, 0)
        ),
        paymentDeadline: generated.dates.paymentDeadline,
        photoUrl: generated.photoUrl,
      },
      generatedCourses: generated.generatedCourses,
      generatedTranscript: generated.generatedTranscript,
      generatedFees: generated.generatedFees,
      generatedAnnouncements: generated.generatedAnnouncements,
      photoUrl: generated.photoUrl,
      signatureUrl: generated.signatureUrl,
      selectedCard: defaultSelectedCard,
      selectedDoc: defaultSelectedDoc,
      selectedPortal: defaultSelectedPortal,
      mode: defaultMode,
    };

    const session = await Session.create(sessionData);
    return NextResponse.json(session.toObject(), { status: 201 });
  } catch (err) {
    console.error("POST /api/session error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/session -- update user-editable fields
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SessionUpdateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.issues },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const { sessionId, ...updates } = parsed.data;

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Only update user-editable fields, never overwrite generated data
    if (updates.studentData) session.set("studentData", updates.studentData);
    if (updates.admissionData) session.set("admissionData", updates.admissionData);
    if (updates.portalData) session.set("portalData", updates.portalData);
    if (updates.selectedCard) session.selectedCard = updates.selectedCard;
    if (updates.selectedDoc) session.selectedDoc = updates.selectedDoc;
    if (updates.selectedPortal) session.selectedPortal = updates.selectedPortal;
    if (updates.mode) session.mode = updates.mode;

    await session.save();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/session error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
