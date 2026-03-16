"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  FileDown,
  Bell,
  BookOpen,
  DollarSign,
  User,
  GraduationCap,
  Calendar,
  Award,
  Globe,
} from "lucide-react";
import type { PortalStudentData } from "./portal-types";
import {
  sampleCourses,
  sampleFees,
  sampleDocuments,
  sampleAnnouncements,
} from "./portal-types";
import { useGeneratedData } from "../../GeneratedDataContext";

const T = {
  bg: "#faf8f5",
  card: "#ffffff",
  border: "#e8e2da",
  text: "#4a4540",
  muted: "#8a8078",
  light: "#b8b0a6",
  accent: "#6a7a80",
  accentBg: "#eef2f4",
  green: "#6a8a6a",
  greenBg: "#edf4ed",
  amber: "#9a7a50",
  amberBg: "#f8f0e4",
  red: "#9a6060",
  redBg: "#f8eded",
};

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: T.greenBg, color: T.green },
    Paid: { bg: T.greenBg, color: T.green },
    "Good Standing": { bg: T.greenBg, color: T.green },
    Pending: { bg: T.amberBg, color: T.amber },
    Overdue: { bg: T.redBg, color: T.red },
    Enrolled: { bg: T.accentBg, color: T.accent },
    "Graduate Candidate": { bg: T.amberBg, color: T.amber },
  };
  const s = map[status] ?? { bg: T.accentBg, color: T.accent };
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[13px]"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

export function ProfileCard({
  data,
  compact = false,
}: {
  data: PortalStudentData;
  compact?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div className={`flex ${compact ? "gap-4" : "gap-5"}`}>
        <div
          className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg"
          style={{ border: `2px solid ${T.border}` }}
        >
          <img
            src={data.photoUrl}
            alt=""
            crossOrigin="anonymous"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between">
            <div className="text-[20px]" style={{ color: T.text }}>
              {data.fullName}
            </div>
            <StatusBadge status={data.status} />
          </div>
          <div className="mb-2 text-[15px]" style={{ color: T.muted }}>
            {data.studentId} -- {data.major}
          </div>
          {!compact && (
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-1 text-[14px]"
              style={{ color: T.muted }}
            >
              <span>
                <User
                  size={13}
                  className="mr-1.5 inline"
                  style={{ color: T.light }}
                />
                {data.faculty}
              </span>
              <span>
                <Globe
                  size={13}
                  className="mr-1.5 inline"
                  style={{ color: T.light }}
                />
                {data.nationality}
              </span>
              <span>
                <Calendar
                  size={13}
                  className="mr-1.5 inline"
                  style={{ color: T.light }}
                />
                DOB: {formatDate(data.dateOfBirth)}
              </span>
              <span>
                <GraduationCap
                  size={13}
                  className="mr-1.5 inline"
                  style={{ color: T.light }}
                />
                {data.enrollmentYear} -- {data.expectedGraduation}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function StatWidget({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: T.accentBg, color: T.accent }}
        >
          {icon}
        </div>
        <span className="text-[13px]" style={{ color: T.light }}>
          {label}
        </span>
      </div>
      <div className="text-[22px]" style={{ color: T.text }}>
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 text-[13px]" style={{ color: T.light }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export function AcademicStats({ data }: { data: PortalStudentData }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <StatWidget
        icon={<Award size={16} />}
        label="GPA"
        value={data.gpa}
        sub="/ 4.00"
      />
      <StatWidget
        icon={<BookOpen size={16} />}
        label="Credits"
        value={`${data.creditsCompleted}/${data.totalCredits}`}
        sub="Completed"
      />
      <StatWidget
        icon={<Calendar size={16} />}
        label="Semester"
        value={data.currentSemester}
      />
      <StatWidget
        icon={<GraduationCap size={16} />}
        label="Standing"
        value={data.academicStanding}
      />
    </div>
  );
}

export function CourseTable() {
  const { courses } = useGeneratedData();
  const displayCourses = courses.length > 0 ? courses : sampleCourses;
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <BookOpen size={16} style={{ color: T.accent }} />
        <span className="text-[16px]" style={{ color: T.text }}>
          Registered Courses
        </span>
      </div>
      <table className="w-full">
        <thead>
          <tr style={{ background: "#f5f0ea" }}>
            {["Code", "Course Name", "Instructor", "Cr", "Schedule", "Room"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-[13px]"
                  style={{ color: T.muted }}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {displayCourses.map((c) => (
            <tr
              key={c.code}
              style={{ borderBottom: `1px solid ${T.border}` }}
            >
              <td
                className="px-4 py-2.5 text-[14px]"
                style={{ color: T.accent }}
              >
                {c.code}
              </td>
              <td
                className="px-4 py-2.5 text-[14px]"
                style={{ color: T.text }}
              >
                {c.name}
              </td>
              <td
                className="px-4 py-2.5 text-[14px]"
                style={{ color: T.muted }}
              >
                {c.instructor}
              </td>
              <td
                className="px-4 py-2.5 text-[14px]"
                style={{ color: T.text }}
              >
                {c.credits}
              </td>
              <td
                className="px-4 py-2.5 text-[14px]"
                style={{ color: T.muted }}
              >
                {c.schedule}
              </td>
              <td
                className="px-4 py-2.5 text-[14px]"
                style={{ color: T.muted }}
              >
                {c.room}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TuitionCard({ data }: { data: PortalStudentData }) {
  const { fees } = useGeneratedData();
  const displayFees = fees.length > 0
    ? fees.map((f) => ({ item: f.item, amount: `$${f.amount.toLocaleString()}` }))
    : sampleFees;
  return (
    <div
      className="rounded-xl"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-2">
          <DollarSign size={16} style={{ color: T.accent }} />
          <span className="text-[16px]" style={{ color: T.text }}>
            Tuition & Fees
          </span>
        </div>
        <StatusBadge status={data.paymentStatus} />
      </div>
      <div className="p-5">
        <div className="mb-3 space-y-2">
          {displayFees.map((f) => (
            <div key={f.item} className="flex justify-between text-[14px]">
              <span style={{ color: T.muted }}>{f.item}</span>
              <span style={{ color: T.text }}>{f.amount}</span>
            </div>
          ))}
        </div>
        <div
          className="flex justify-between pt-3 text-[16px]"
          style={{ borderTop: `1px solid ${T.border}` }}
        >
          <span style={{ color: T.text }}>Total</span>
          <span style={{ color: T.accent }}>{data.semesterTuition}</span>
        </div>
        <div className="mt-2 text-[13px]" style={{ color: T.light }}>
          Deadline: {formatDate(data.paymentDeadline)}
        </div>
      </div>
    </div>
  );
}

export function DocumentsList() {
  return (
    <div
      className="rounded-xl"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <FileDown size={16} style={{ color: T.accent }} />
        <span className="text-[16px]" style={{ color: T.text }}>
          Documents
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: T.border }}>
        {sampleDocuments.map((d) => (
          <div
            key={d.name}
            className="flex items-center justify-between px-5 py-3"
          >
            <div>
              <div className="text-[14px]" style={{ color: T.text }}>
                {d.name}
              </div>
              <div className="text-[12px]" style={{ color: T.light }}>
                {d.date}
              </div>
            </div>
            <span
              className="rounded px-2.5 py-1 text-[12px]"
              style={{ background: T.accentBg, color: T.accent }}
            >
              {d.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnnouncementsList() {
  const { announcements } = useGeneratedData();
  const displayAnnouncements = announcements.length > 0 ? announcements : sampleAnnouncements;
  return (
    <div
      className="rounded-xl"
      style={{ background: T.card, border: `1px solid ${T.border}` }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <Bell size={16} style={{ color: T.accent }} />
        <span className="text-[16px]" style={{ color: T.text }}>
          Announcements
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: T.border }}>
        {displayAnnouncements.map((a) => (
          <div key={a.title} className="px-5 py-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[14px]" style={{ color: T.text }}>
                {a.title}
              </span>
              <span className="text-[12px]" style={{ color: T.light }}>
                {a.date}
              </span>
            </div>
            <div className="text-[13px]" style={{ color: T.muted }}>
              {a.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortalHeader({
  universityName,
  subtitle,
  studentId,
  universityLogo,
}: {
  universityName: string;
  subtitle?: string;
  studentId?: string;
  universityLogo?: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-6 py-4"
      style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full overflow-hidden"
          style={{ border: `2px solid ${T.accent}`, color: T.accent }}
        >
          {universityLogo ? (
            <img src={universityLogo} alt="" crossOrigin="anonymous" className="h-full w-full object-contain" />
          ) : (
            <span className="text-[18px]">{universityName.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="text-[18px]" style={{ color: T.text }}>
            {universityName}
          </div>
          {subtitle && (
            <div className="text-[13px]" style={{ color: T.muted }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {studentId && (
          <QRCodeSVG
            value={`STU:${studentId}`}
            size={32}
            bgColor="transparent"
            fgColor={T.light}
          />
        )}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: T.accentBg, color: T.accent }}
        >
          <Bell size={15} />
        </div>
      </div>
    </div>
  );
}

export { T, formatDate };
