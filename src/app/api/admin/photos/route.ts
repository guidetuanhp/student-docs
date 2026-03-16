import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const SAFE_FILENAME = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/;

function checkAuth(request: NextRequest) {
  return !!request.cookies.get("admin_session")?.value;
}

// GET /api/admin/photos -- list files (paginated)
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    if (!fs.existsSync(PHOTOS_DIR)) {
      return NextResponse.json({ files: [], total: 0, page: 1, limit: 60 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(searchParams.get("limit") || "60", 10) || 60));
    const search = (searchParams.get("search") || "").trim().toLowerCase();

    let allFiles = fs
      .readdirSync(PHOTOS_DIR)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (search) {
      allFiles = allFiles.filter((f) => f.toLowerCase().includes(search));
    }

    const total = allFiles.length;
    const start = (page - 1) * limit;
    const paged = allFiles.slice(start, start + limit).map((f) => ({
      filename: f,
      url: `/photos/${f}`,
      size: fs.statSync(path.join(PHOTOS_DIR, f)).size,
    }));

    return NextResponse.json({ files: paged, total, page, limit });
  } catch (err) {
    console.error("GET /api/admin/photos error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/photos -- upload file
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
    // Sanitize filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const baseName = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const sanitized = `${baseName}.${ext}`;
    if (!SAFE_FILENAME.test(sanitized)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    if (!fs.existsSync(PHOTOS_DIR)) {
      fs.mkdirSync(PHOTOS_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(PHOTOS_DIR, sanitized), buffer);
    return NextResponse.json(
      { filename: sanitized, url: `/photos/${sanitized}` },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/admin/photos error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
