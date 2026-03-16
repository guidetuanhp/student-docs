import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Course from "@/models/Course";
import { AdminCourseCreateSchema } from "@/lib/validation";

function checkAuth(request: NextRequest) {
  return !!request.cookies.get("admin_session")?.value;
}

// GET /api/admin/courses -- list all
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const courses = await Course.find().sort({ code: 1 }).lean();
    return NextResponse.json(courses);
  } catch (err) {
    console.error("GET /api/admin/courses error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/courses -- create new
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = AdminCourseCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const course = await Course.create(parsed.data);
    return NextResponse.json(course.toObject(), { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/courses error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
