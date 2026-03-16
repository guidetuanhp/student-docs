import connectToDatabase from "@/lib/mongodb";
import University from "@/models/University";
import Course from "@/models/Course";
import Session from "@/models/Session";
import fs from "fs";
import path from "path";

async function getCounts() {
  await connectToDatabase();
  const [universities, courses, sessions] = await Promise.all([
    University.countDocuments(),
    Course.countDocuments(),
    Session.countDocuments(),
  ]);

  let photos = 0;
  let signatures = 0;
  try {
    const photosDir = path.join(process.cwd(), "public", "photos");
    photos = fs
      .readdirSync(photosDir)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
  } catch {}
  try {
    const sigDir = path.join(process.cwd(), "public", "signatures");
    signatures = fs
      .readdirSync(sigDir)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
  } catch {}

  return { universities, courses, sessions, photos, signatures };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "Universities", count: counts.universities, href: "/admin/universities" },
    { label: "Courses", count: counts.courses, href: "/admin/courses" },
    { label: "Photos", count: counts.photos, href: "/admin/photos" },
    { label: "Signatures", count: counts.signatures, href: "/admin/signatures" },
    { label: "Sessions", count: counts.sessions, href: "#" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{c.count}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
