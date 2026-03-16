import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SIGNATURES_DIR = path.join(process.cwd(), "public", "signatures");
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;
const SAFE_FILENAME = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;

function checkAuth(request: NextRequest) {
  return !!request.cookies.get("admin_session")?.value;
}

// GET /api/admin/signatures -- list files
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    if (!fs.existsSync(SIGNATURES_DIR)) {
      return NextResponse.json([]);
    }
    const files = fs
      .readdirSync(SIGNATURES_DIR)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .map((f) => ({
        filename: f,
        url: `/signatures/${f}`,
        size: fs.statSync(path.join(SIGNATURES_DIR, f)).size,
      }));
    return NextResponse.json(files);
  } catch (err) {
    console.error("GET /api/admin/signatures error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/signatures -- upload file
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PNG, JPEG, and WebP are allowed." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 5MB." },
        { status: 400 }
      );
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const sanitized = `${baseName}.${ext}`;
    if (!SAFE_FILENAME.test(sanitized)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    if (!fs.existsSync(SIGNATURES_DIR)) {
      fs.mkdirSync(SIGNATURES_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(SIGNATURES_DIR, sanitized), buffer);
    return NextResponse.json(
      { filename: sanitized, url: `/signatures/${sanitized}` },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/admin/signatures error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
