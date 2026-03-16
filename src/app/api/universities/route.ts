import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import University from "@/models/University";

// GET /api/universities -- public list of all universities
export async function GET() {
  try {
    await connectToDatabase();
    const universities = await University.find()
      .select("name faculties address logoUrl emailSuffix")
      .sort({ name: 1 })
      .lean();
    return NextResponse.json(universities);
  } catch (err) {
    console.error("GET /api/universities error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
