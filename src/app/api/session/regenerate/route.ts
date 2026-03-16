import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Session from "@/models/Session";
import Course from "@/models/Course";
import { generateAllSessionData } from "@/lib/generate";
import { RegenerateRequestSchema } from "@/lib/validation";

// POST /api/session/regenerate -- re-randomize generated data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = RegenerateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.issues },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const { sessionId } = parsed.data;

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const createdAt = session.createdAt || new Date();
    const generated = await generateAllSessionData(Course, createdAt);

    // Update generated data while preserving user-edited identity fields
    session.generatedCourses = generated.generatedCourses as typeof session.generatedCourses;
    session.generatedTranscript = generated.generatedTranscript as typeof session.generatedTranscript;
    session.generatedFees = generated.generatedFees as typeof session.generatedFees;
    session.generatedAnnouncements = generated.generatedAnnouncements as typeof session.generatedAnnouncements;
    session.photoUrl = generated.photoUrl;
    session.signatureUrl = generated.signatureUrl;

    // Update photo and signature references in the sub-documents too
    session.set("studentData.photoUrl", generated.photoUrl);
    session.set("studentData.issueDate", generated.dates.issueDate);
    session.set("studentData.expiryDate", generated.dates.expiryDate);
    session.set("studentData.faculty", generated.faculty);
    session.set("studentData.major", generated.major);
    session.set("studentData.studentId", generated.studentId);
    session.set("studentData.universityName", generated.universityName);
    session.set("studentData.universityLogo", generated.universityLogo);
    session.set("studentData.universityAddress", generated.universityAddress);

    session.set("admissionData.photoUrl", generated.photoUrl);
    session.set("admissionData.signatureUrl", generated.signatureUrl);
    session.set("admissionData.admissionSemester", generated.semester);
    session.set("admissionData.academicYear", generated.academicYear);
    session.set("admissionData.issueDate", generated.dates.issueDate);
    session.set("admissionData.enrollmentDate", generated.dates.enrollmentDate);
    session.set("admissionData.paymentDeadline", generated.dates.paymentDeadline);
    session.set("admissionData.faculty", generated.faculty);
    session.set("admissionData.major", generated.major);
    session.set("admissionData.studentId", generated.studentId);
    session.set("admissionData.email", generated.email);
    session.set("admissionData.universityName", generated.universityName);
    session.set("admissionData.universityLogo", generated.universityLogo);
    session.set("admissionData.universityAddress", generated.universityAddress);

    session.set("portalData.photoUrl", generated.photoUrl);
    session.set("portalData.currentSemester", generated.semester);
    session.set("portalData.gpa", generated.gpa);
    session.set("portalData.creditsCompleted", generated.creditsCompleted);
    session.set("portalData.faculty", generated.faculty);
    session.set("portalData.major", generated.major);
    session.set("portalData.studentId", generated.studentId);
    session.set("portalData.universityName", generated.universityName);
    session.set("portalData.universityLogo", generated.universityLogo);
    session.set("portalData.universityAddress", generated.universityAddress);
    session.set(
      "portalData.academicAdvisor",
      generated.generatedCourses.length > 0
        ? generated.generatedCourses[0].instructor || "Dr. John Smith"
        : "Dr. John Smith"
    );
    session.set(
      "portalData.semesterTuition",
      String(generated.generatedFees.reduce((s, f) => s + f.amount, 0))
    );
    session.set("portalData.paymentDeadline", generated.dates.paymentDeadline);

    await session.save();
    return NextResponse.json(session.toObject());
  } catch (err) {
    console.error("POST /api/session/regenerate error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
