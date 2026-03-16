"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  BookOpen,
  DollarSign,
  User,
  GraduationCap,
  Calendar,
  Award,
  FileDown,
  Bell,
  Globe,
  Home,
  Settings,
} from "lucide-react";
import type { PortalStudentData } from "./portal-types";
import { sampleCourses, sampleFees, sampleDocuments, sampleAnnouncements } from "./portal-types";
import { useGeneratedData } from "../../GeneratedDataContext";
import {
  T,
  formatDate,
  StatusBadge,
  ProfileCard,
  StatWidget,
  AcademicStats,
  CourseTable,
  TuitionCard,
  DocumentsList,
  AnnouncementsList,
  PortalHeader,
} from "./portal-shared";

interface PortalProps {
  data: PortalStudentData;
}

// 1. Classic University Portal
export function ClassicPortal({ data }: PortalProps) {
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <PortalHeader
        universityName={data.universityName}
        subtitle="Student Information System"
        studentId={data.studentId}
        universityLogo={data.universityLogo}
      />
      <div className="flex flex-col gap-5 p-6">
        <ProfileCard data={data} />
        <AcademicStats data={data} />
        <CourseTable />
        <div className="grid grid-cols-2 gap-5">
          <TuitionCard data={data} />
          <DocumentsList />
        </div>
        <AnnouncementsList />
      </div>
    </div>
  );
}

// 2. Modern Dashboard Portal
export function ModernDashboardPortal({ data }: PortalProps) {
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <PortalHeader
        universityName={data.universityName}
        subtitle="Student Dashboard"
        studentId={data.studentId}
        universityLogo={data.universityLogo}
      />
      <div className="p-6">
        <div className="mb-5 grid grid-cols-3 gap-5">
          <div
            className="col-span-1 flex flex-col items-center rounded-xl p-5 text-center"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div
              className="mb-3 h-20 w-20 overflow-hidden rounded-full"
              style={{ border: `3px solid ${T.border}` }}
            >
              <img
                src={data.photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-1 text-[18px]" style={{ color: T.text }}>
              {data.fullName}
            </div>
            <div className="mb-2 text-[14px]" style={{ color: T.muted }}>
              {data.studentId}
            </div>
            <StatusBadge status={data.status} />
            <div className="mt-3 text-[13px]" style={{ color: T.muted }}>
              {data.major}
            </div>
            <div className="text-[13px]" style={{ color: T.light }}>
              {data.faculty}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-3">
            <StatWidget
              icon={<Award size={16} />}
              label="Current GPA"
              value={data.gpa}
              sub="Cumulative -- out of 4.00"
            />
            <StatWidget
              icon={<BookOpen size={16} />}
              label="Credits Progress"
              value={`${data.creditsCompleted}/${data.totalCredits}`}
              sub={`${Math.round((parseInt(data.creditsCompleted) / parseInt(data.totalCredits)) * 100)}% completed`}
            />
            <StatWidget
              icon={<Calendar size={16} />}
              label="Semester"
              value={data.currentSemester}
              sub={`${data.enrollmentYear}--${data.expectedGraduation}`}
            />
            <StatWidget
              icon={<DollarSign size={16} />}
              label="Tuition"
              value={data.semesterTuition}
              sub={data.paymentStatus}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-3 flex flex-col gap-5">
            <CourseTable />
            <AnnouncementsList />
          </div>
          <div className="col-span-2 flex flex-col gap-5">
            <TuitionCard data={data} />
            <DocumentsList />
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Government Style Portal
export function GovernmentPortal({ data }: PortalProps) {
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: "#f0ede8" }}
    >
      <div
        className="flex items-center gap-4 px-6 py-5"
        style={{ background: "#e8e2da", borderBottom: `2px solid ${T.border}` }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded"
          style={{ border: `2px solid ${T.muted}`, color: T.muted }}
        >
          <GraduationCap size={24} />
        </div>
        <div>
          <div
            className="text-[12px] uppercase tracking-[0.2em]"
            style={{ color: T.light }}
          >
            Ministry of Education
          </div>
          <div className="text-[20px]" style={{ color: T.text }}>
            {data.universityName}
          </div>
          <div className="text-[14px]" style={{ color: T.muted }}>
            Official Student Information Record
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[13px]" style={{ color: T.muted }}>
            Document ID: SIS-{data.studentId}
          </div>
          <div className="text-[13px]" style={{ color: T.light }}>
            Academic Year {data.enrollmentYear}--{data.expectedGraduation}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-6">
        <div
          className="overflow-hidden rounded-lg"
          style={{ border: `1px solid ${T.border}` }}
        >
          <div
            className="px-5 py-3 text-[15px]"
            style={{ background: "#e8e2da", color: T.text }}
          >
            Section I -- Student Personal Information
          </div>
          <div className="flex gap-5 p-5" style={{ background: T.card }}>
            <div
              className="h-28 w-24 flex-shrink-0 overflow-hidden rounded"
              style={{ border: `1px solid ${T.border}` }}
            >
              <img
                src={data.photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-x-6 gap-y-2 text-[14px]">
              {(
                [
                  ["Full Name", data.fullName],
                  ["Student ID", data.studentId],
                  ["Status", data.status],
                  ["Program", data.major],
                  ["Faculty", data.faculty],
                  ["Nationality", data.nationality],
                  ["Date of Birth", formatDate(data.dateOfBirth)],
                  ["Enrollment", data.enrollmentYear],
                  ["Expected Graduation", data.expectedGraduation],
                ] as const
              ).map(([l, v]) => (
                <div key={l}>
                  <div className="text-[12px]" style={{ color: T.light }}>
                    {l}
                  </div>
                  <div style={{ color: T.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="overflow-hidden rounded-lg"
          style={{ border: `1px solid ${T.border}` }}
        >
          <div
            className="px-5 py-3 text-[15px]"
            style={{ background: "#e8e2da", color: T.text }}
          >
            Section II -- Academic Record
          </div>
          <div
            className="grid grid-cols-5 gap-4 p-5"
            style={{ background: T.card }}
          >
            {(
              [
                ["GPA", data.gpa],
                ["Credits", `${data.creditsCompleted}/${data.totalCredits}`],
                ["Semester", data.currentSemester],
                ["Standing", data.academicStanding],
                ["Advisor", data.academicAdvisor],
              ] as const
            ).map(([l, v]) => (
              <div key={l}>
                <div className="text-[12px]" style={{ color: T.light }}>
                  {l}
                </div>
                <div className="text-[16px]" style={{ color: T.text }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
        <CourseTable />
        <div className="grid grid-cols-2 gap-5">
          <TuitionCard data={data} />
          <DocumentsList />
        </div>
      </div>
    </div>
  );
}

// 4. Korean University Portal
export function KoreanPortal({ data }: PortalProps) {
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ background: "#5c6878", borderBottom: "3px solid #4a5666" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ border: "2px solid #b0bcc8", color: "#b0bcc8" }}
          >
            <span className="text-[16px]">
              {data.universityName.charAt(0)}
            </span>
          </div>
          <div>
            <div className="text-[17px]" style={{ color: "#e0e6ec" }}>
              {data.universityName}
            </div>
            <div className="text-[12px]" style={{ color: "#a0acb8" }}>
              Academic Information System
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-3 text-[13px]"
          style={{ color: "#b0bcc8" }}
        >
          <span>{data.fullName}</span>
          <span>({data.studentId})</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="grid grid-cols-6 gap-3">
          {(
            [
              ["ID", data.studentId],
              ["Name", data.fullName],
              ["Dept", data.faculty],
              ["Major", data.major],
              ["Sem", data.currentSemester],
              ["Status", data.status],
            ] as const
          ).map(([l, v]) => (
            <div
              key={l}
              className="rounded-lg p-3"
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
              }}
            >
              <div className="mb-1 text-[11px]" style={{ color: T.light }}>
                {l}
              </div>
              <div className="text-[14px]" style={{ color: T.text }}>
                {v}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3">
          <StatWidget icon={<Award size={16} />} label="GPA" value={data.gpa} />
          <StatWidget
            icon={<BookOpen size={16} />}
            label="Credits"
            value={`${data.creditsCompleted}/${data.totalCredits}`}
          />
          <StatWidget
            icon={<GraduationCap size={16} />}
            label="Standing"
            value={data.academicStanding}
          />
          <StatWidget
            icon={<User size={16} />}
            label="Advisor"
            value={data.academicAdvisor}
          />
        </div>
        <CourseTable />
        <div className="grid grid-cols-3 gap-4">
          <TuitionCard data={data} />
          <DocumentsList />
          <AnnouncementsList />
        </div>
      </div>
    </div>
  );
}

// 5. Minimal Modern Portal
export function MinimalPortal({ data }: PortalProps) {
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: "#fdfcfa" }}
    >
      <div
        className="flex items-center justify-between px-8 py-6"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div>
          <div className="text-[22px]" style={{ color: T.text }}>
            {data.universityName}
          </div>
          <div className="text-[14px]" style={{ color: T.light }}>
            Student Portal
          </div>
        </div>
        <div className="flex items-center gap-4">
          <QRCodeSVG
            value={`STU:${data.studentId}`}
            size={30}
            bgColor="transparent"
            fgColor={T.light}
          />
          <div
            className="h-10 w-10 overflow-hidden rounded-full"
            style={{ border: `2px solid ${T.border}` }}
          >
            <img
              src={data.photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-8">
        <div
          className="flex items-center gap-8 rounded-2xl p-8"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl"
            style={{ border: `2px solid ${T.border}` }}
          >
            <img
              src={data.photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-[24px]" style={{ color: T.text }}>
                {data.fullName}
              </span>
              <StatusBadge status={data.status} />
            </div>
            <div className="mb-1 text-[16px]" style={{ color: T.muted }}>
              {data.major} -- {data.faculty}
            </div>
            <div className="text-[14px]" style={{ color: T.light }}>
              ID: {data.studentId} -- {data.enrollmentYear}--
              {data.expectedGraduation}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-[28px]" style={{ color: T.text }}>
                {data.gpa}
              </div>
              <div className="text-[13px]" style={{ color: T.light }}>
                GPA
              </div>
            </div>
            <div className="text-center">
              <div className="text-[28px]" style={{ color: T.text }}>
                {data.creditsCompleted}
              </div>
              <div className="text-[13px]" style={{ color: T.light }}>
                Credits
              </div>
            </div>
          </div>
        </div>
        <CourseTable />
        <div className="grid grid-cols-2 gap-6">
          <TuitionCard data={data} />
          <DocumentsList />
        </div>
        <AnnouncementsList />
      </div>
    </div>
  );
}

// 6. Academic Table System
export function AcademicTablePortal({ data }: PortalProps) {
  const { fees } = useGeneratedData();
  const displayFees = fees.length > 0
    ? fees.map((f) => ({ item: f.item, amount: `$${f.amount.toLocaleString()}` }))
    : sampleFees;
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <PortalHeader
        universityName={data.universityName}
        subtitle="Academic Record System"
        studentId={data.studentId}
        universityLogo={data.universityLogo}
      />
      <div className="flex flex-col gap-4 p-6">
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: `1px solid ${T.border}` }}
        >
          <div
            className="px-5 py-3 text-[15px]"
            style={{
              background: "#f5f0ea",
              color: T.text,
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            Student Record
          </div>
          <table className="w-full" style={{ background: T.card }}>
            <tbody>
              {(
                [
                  ["Full Name", data.fullName, "Student ID", data.studentId],
                  ["Faculty", data.faculty, "Program", data.major],
                  ["Semester", data.currentSemester, "Status", data.status],
                  ["GPA", data.gpa, "Credits", `${data.creditsCompleted}/${data.totalCredits}`],
                  ["Advisor", data.academicAdvisor, "Standing", data.academicStanding],
                ] as const
              ).map((row, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  <td
                    className="w-[15%] px-4 py-2.5 text-[13px]"
                    style={{ background: "#f5f0ea", color: T.muted }}
                  >
                    {row[0]}
                  </td>
                  <td
                    className="w-[35%] px-4 py-2.5 text-[14px]"
                    style={{ color: T.text }}
                  >
                    {row[1]}
                  </td>
                  <td
                    className="w-[15%] px-4 py-2.5 text-[13px]"
                    style={{ background: "#f5f0ea", color: T.muted }}
                  >
                    {row[2]}
                  </td>
                  <td
                    className="w-[35%] px-4 py-2.5 text-[14px]"
                    style={{ color: T.text }}
                  >
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CourseTable />
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: `1px solid ${T.border}` }}
        >
          <div
            className="flex justify-between px-5 py-3 text-[15px]"
            style={{
              background: "#f5f0ea",
              color: T.text,
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span>Financial Record</span>
            <StatusBadge status={data.paymentStatus} />
          </div>
          <table className="w-full" style={{ background: T.card }}>
            <thead>
              <tr>
                <th
                  className="px-4 py-2.5 text-left text-[13px]"
                  style={{ color: T.muted }}
                >
                  Item
                </th>
                <th
                  className="px-4 py-2.5 text-left text-[13px]"
                  style={{ color: T.muted }}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {displayFees.map((f) => (
                <tr
                  key={f.item}
                  style={{ borderBottom: `1px solid ${T.border}` }}
                >
                  <td
                    className="px-4 py-2.5 text-[14px]"
                    style={{ color: T.text }}
                  >
                    {f.item}
                  </td>
                  <td
                    className="px-4 py-2.5 text-[14px]"
                    style={{ color: T.muted }}
                  >
                    {f.amount}
                  </td>
                </tr>
              ))}
              <tr style={{ background: "#f5f0ea" }}>
                <td
                  className="px-4 py-2.5 text-[15px]"
                  style={{ color: T.text }}
                >
                  Total Due
                </td>
                <td
                  className="px-4 py-2.5 text-[15px]"
                  style={{ color: T.accent }}
                >
                  {data.semesterTuition}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <DocumentsList />
      </div>
    </div>
  );
}

// 7. Card Based Portal
export function CardBasedPortal({ data }: PortalProps) {
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <PortalHeader
        universityName={data.universityName}
        subtitle="Student Portal"
        studentId={data.studentId}
        universityLogo={data.universityLogo}
      />
      <div className="grid grid-cols-3 gap-5 p-6">
        <div
          className="row-span-2 flex flex-col items-center rounded-xl p-5 text-center"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="mb-3 h-24 w-24 overflow-hidden rounded-full"
            style={{ border: `3px solid ${T.border}` }}
          >
            <img
              src={data.photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mb-1 text-[18px]" style={{ color: T.text }}>
            {data.fullName}
          </div>
          <div className="mb-2 text-[14px]" style={{ color: T.muted }}>
            {data.studentId}
          </div>
          <StatusBadge status={data.status} />
          <div className="mt-4 w-full space-y-2 text-left">
            {(
              [
                [<User key="u" size={14} style={{ color: T.light }} />, data.major],
                [<GraduationCap key="g" size={14} style={{ color: T.light }} />, data.faculty],
                [<Globe key="gl" size={14} style={{ color: T.light }} />, data.nationality],
                [<Calendar key="c" size={14} style={{ color: T.light }} />, `${data.enrollmentYear}--${data.expectedGraduation}`],
                [<Award key="a" size={14} style={{ color: T.light }} />, `GPA: ${data.gpa}`],
                [<BookOpen key="b" size={14} style={{ color: T.light }} />, `${data.creditsCompleted}/${data.totalCredits} credits`],
              ] as [React.ReactNode, string][]
            ).map(([icon, val], i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[13px]"
                style={{ color: T.muted }}
              >
                {icon}
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <StatWidget
          icon={<Award size={16} />}
          label="GPA"
          value={data.gpa}
          sub="Cumulative"
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
          sub={`${data.enrollmentYear}--${data.expectedGraduation}`}
        />
        <StatWidget
          icon={<DollarSign size={16} />}
          label="Tuition"
          value={data.semesterTuition}
          sub={data.paymentStatus}
        />
        <div className="col-span-3">
          <CourseTable />
        </div>
        <TuitionCard data={data} />
        <DocumentsList />
        <AnnouncementsList />
      </div>
    </div>
  );
}

// 8. Sidebar Portal
function SidebarNavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-2.5 text-[14px] transition-colors"
      style={{
        background: active ? T.accentBg : "transparent",
        color: active ? T.accent : T.muted,
      }}
    >
      {icon}
      {label}
    </div>
  );
}

export function SidebarPortal({ data }: PortalProps) {
  return (
    <div
      className="flex min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <div
        className="flex w-[220px] flex-shrink-0 flex-col p-4"
        style={{ background: T.card, borderRight: `1px solid ${T.border}` }}
      >
        <div className="mb-6 flex items-center gap-2 px-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ border: `2px solid ${T.accent}`, color: T.accent }}
          >
            <span className="text-[14px]">
              {data.universityName.charAt(0)}
            </span>
          </div>
          <div className="text-[14px]" style={{ color: T.text }}>
            {data.universityName.split(" ")[0]}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <SidebarNavItem icon={<Home size={16} />} label="Dashboard" active />
          <SidebarNavItem icon={<User size={16} />} label="Profile" />
          <SidebarNavItem icon={<BookOpen size={16} />} label="Courses" />
          <SidebarNavItem icon={<Award size={16} />} label="Grades" />
          <SidebarNavItem icon={<DollarSign size={16} />} label="Tuition" />
          <SidebarNavItem icon={<FileDown size={16} />} label="Documents" />
          <SidebarNavItem icon={<Bell size={16} />} label="Notices" />
          <SidebarNavItem icon={<Settings size={16} />} label="Settings" />
        </div>
        <div className="mt-auto flex items-center gap-2 px-2">
          <div
            className="h-8 w-8 overflow-hidden rounded-full"
            style={{ border: `2px solid ${T.border}` }}
          >
            <img
              src={data.photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[13px]" style={{ color: T.text }}>
              {data.fullName}
            </div>
            <div className="text-[11px]" style={{ color: T.light }}>
              {data.studentId}
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${T.border}` }}
        >
          <div className="text-[18px]" style={{ color: T.text }}>
            Dashboard
          </div>
          <StatusBadge status={data.status} />
        </div>
        <div className="flex flex-1 flex-col gap-5 overflow-auto p-6">
          <AcademicStats data={data} />
          <CourseTable />
          <div className="grid grid-cols-2 gap-5">
            <TuitionCard data={data} />
            <AnnouncementsList />
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. Top Navigation Portal
export function TopNavPortal({ data }: PortalProps) {
  const tabs = ["Dashboard", "Courses", "Grades", "Finance", "Documents"];
  return (
    <div
      className="min-h-[700px] w-[960px] overflow-hidden rounded-xl"
      style={{ background: T.bg }}
    >
      <PortalHeader
        universityName={data.universityName}
        subtitle="Student Portal"
        studentId={data.studentId}
        universityLogo={data.universityLogo}
      />
      <div
        className="flex gap-1 px-6"
        style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}
      >
        {tabs.map((tab, i) => (
          <div
            key={tab}
            className="cursor-pointer px-5 py-3 text-[14px]"
            style={{
              color: i === 0 ? T.accent : T.muted,
              borderBottom:
                i === 0
                  ? `2px solid ${T.accent}`
                  : "2px solid transparent",
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 p-6">
        <ProfileCard data={data} />
        <AcademicStats data={data} />
        <CourseTable />
        <div className="grid grid-cols-3 gap-5">
          <TuitionCard data={data} />
          <DocumentsList />
          <AnnouncementsList />
        </div>
      </div>
    </div>
  );
}

// 10. Mobile First Portal
export function MobileFirstPortal({ data }: PortalProps) {
  const { courses, announcements } = useGeneratedData();
  const displayCourses = courses.length > 0 ? courses : sampleCourses;
  const displayAnnouncements = announcements.length > 0 ? announcements : sampleAnnouncements;
  return (
    <div
      className="min-h-[800px] w-[390px] overflow-hidden rounded-2xl"
      style={{ background: T.bg }}
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: T.card, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="text-[16px]" style={{ color: T.text }}>
          {data.universityName
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>
        <div className="flex items-center gap-3">
          <Bell size={18} style={{ color: T.muted }} />
          <div
            className="h-8 w-8 overflow-hidden rounded-full"
            style={{ border: `2px solid ${T.border}` }}
          >
            <img
              src={data.photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div
          className="flex items-center gap-4 rounded-xl p-4"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full"
            style={{ border: `2px solid ${T.border}` }}
          >
            <img
              src={data.photoUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[16px]" style={{ color: T.text }}>
              {data.fullName}
            </div>
            <div className="text-[13px]" style={{ color: T.muted }}>
              {data.studentId} -- {data.major}
            </div>
            <div className="mt-1">
              <StatusBadge status={data.status} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="text-[22px]" style={{ color: T.text }}>
              {data.gpa}
            </div>
            <div className="text-[12px]" style={{ color: T.light }}>
              GPA
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="text-[22px]" style={{ color: T.text }}>
              {data.creditsCompleted}
            </div>
            <div className="text-[12px]" style={{ color: T.light }}>
              Credits
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="text-[14px]" style={{ color: T.text }}>
              {data.currentSemester}
            </div>
            <div className="text-[12px]" style={{ color: T.light }}>
              Semester
            </div>
          </div>
          <div
            className="rounded-xl p-3 text-center"
            style={{ background: T.card, border: `1px solid ${T.border}` }}
          >
            <div className="text-[14px]" style={{ color: T.accent }}>
              {data.paymentStatus}
            </div>
            <div className="text-[12px]" style={{ color: T.light }}>
              Tuition
            </div>
          </div>
        </div>
        <div
          className="rounded-xl"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="px-4 py-3 text-[15px]"
            style={{ color: T.text, borderBottom: `1px solid ${T.border}` }}
          >
            Courses
          </div>
          <div className="divide-y" style={{ borderColor: T.border }}>
            {displayCourses.map((c) => (
              <div key={c.code} className="px-4 py-3">
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="text-[14px]" style={{ color: T.text }}>
                    {c.name}
                  </span>
                  <span
                    className="rounded px-2 py-0.5 text-[12px]"
                    style={{ background: T.accentBg, color: T.accent }}
                  >
                    {c.code}
                  </span>
                </div>
                <div className="text-[12px]" style={{ color: T.light }}>
                  {c.instructor} -- {c.schedule} -- {c.room}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[15px]" style={{ color: T.text }}>
              Tuition
            </span>
            <StatusBadge status={data.paymentStatus} />
          </div>
          <div className="mb-1 text-[22px]" style={{ color: T.text }}>
            {data.semesterTuition}
          </div>
          <div className="text-[13px]" style={{ color: T.light }}>
            Due: {formatDate(data.paymentDeadline)}
          </div>
        </div>
        <div
          className="rounded-xl"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="px-4 py-3 text-[15px]"
            style={{ color: T.text, borderBottom: `1px solid ${T.border}` }}
          >
            Documents
          </div>
          {sampleDocuments.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: `1px solid ${T.border}` }}
            >
              <span className="text-[13px]" style={{ color: T.text }}>
                {d.name}
              </span>
              <FileDown size={14} style={{ color: T.light }} />
            </div>
          ))}
        </div>
        <div
          className="rounded-xl"
          style={{ background: T.card, border: `1px solid ${T.border}` }}
        >
          <div
            className="px-4 py-3 text-[15px]"
            style={{ color: T.text, borderBottom: `1px solid ${T.border}` }}
          >
            Notices
          </div>
          {displayAnnouncements.map((a) => (
            <div
              key={a.title}
              className="px-4 py-3"
              style={{ borderBottom: `1px solid ${T.border}` }}
            >
              <div className="text-[13px]" style={{ color: T.text }}>
                {a.title}
              </div>
              <div className="text-[12px]" style={{ color: T.light }}>
                {a.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Template renderer mapping
export const portalTemplateComponents: Record<
  string,
  React.FC<PortalProps>
> = {
  classic: ClassicPortal,
  "modern-dashboard": ModernDashboardPortal,
  government: GovernmentPortal,
  korean: KoreanPortal,
  minimal: MinimalPortal,
  "academic-table": AcademicTablePortal,
  "card-based": CardBasedPortal,
  sidebar: SidebarPortal,
  "top-nav": TopNavPortal,
  "mobile-first": MobileFirstPortal,
};
