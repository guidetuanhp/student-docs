import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import University from "@/models/University";
import { AdminUniversityCreateSchema } from "@/lib/validation";

function checkAuth(request: NextRequest) {
  return !!request.cookies.get("admin_session")?.value;
}

// GET /api/admin/universities -- list all
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const universities = await University.find().sort({ name: 1 }).lean();
    return NextResponse.json(universities);
  } catch (err) {
    console.error("GET /api/admin/universities error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/universities -- create new
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = AdminUniversityCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.issues },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const university = await University.create(parsed.data);
    return NextResponse.json(university.toObject(), { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/universities error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
