import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Clear cookie with current path "/"
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  // Also clear legacy cookie that was set with old path "/admin"
  response.headers.append("Set-Cookie", "admin_session=; Path=/admin; Max-Age=0; HttpOnly; SameSite=Strict");
  return response;
}
