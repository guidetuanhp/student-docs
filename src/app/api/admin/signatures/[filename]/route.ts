import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SIGNATURES_DIR = path.join(process.cwd(), "public", "signatures");
const SAFE_FILENAME = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;

function checkAuth(request: NextRequest) {
  return !!request.cookies.get("admin_session")?.value;
}

// DELETE /api/admin/signatures/[filename]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { filename } = await params;
    if (!SAFE_FILENAME.test(filename)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }
    const filePath = path.join(SIGNATURES_DIR, filename);
    if (!filePath.startsWith(SIGNATURES_DIR)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/signatures/[filename] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
