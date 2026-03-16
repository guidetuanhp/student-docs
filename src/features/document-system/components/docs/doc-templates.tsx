"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import type { AdmissionData } from "./doc-types";
import {
  DocHeader,
  DocFooter,
  SignatureBlock,
  OfficialStamp,
  DocWatermark,
  FormField,
  TableRow,
  C,
} from "./doc-shared";
import { useGeneratedData } from "../../GeneratedDataContext";

interface DocProps {
  data: AdmissionData;
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// 1. Admission Letter
export function AdmissionLetterDoc({ data }: DocProps) {
  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <DocWatermark text="OFFICIAL" />
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Office of Undergraduate Admissions"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-4 text-[13px]" style={{ color: C.bodyLight }}>
          Ref: ADM/{data.academicYear}/{data.studentId} -- Date:{" "}
          {formatDate(data.issueDate)}
        </div>
        <div className="mb-6 text-[22px]" style={{ color: C.bodyText }}>
          Letter of Admission
        </div>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyText }}
        >
          Dear <span style={{ color: C.accent }}>{data.fullName}</span>,
        </div>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          We are pleased to inform you that you have been officially admitted to{" "}
          <strong style={{ color: C.bodyText }}>{data.universityName}</strong>{" "}
          for the{" "}
          <strong style={{ color: C.bodyText }}>
            {data.admissionSemester}
          </strong>{" "}
          academic semester.
        </div>
        <div
          className="mb-5 rounded-lg p-5"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div className="mb-3 text-[14px]" style={{ color: C.bodyMuted }}>
            Admission Details
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Student ID
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                {data.studentId}
              </div>
            </div>
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Program
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                {data.major}
              </div>
            </div>
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Faculty
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                {data.faculty}
              </div>
            </div>
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Academic Year
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                {data.academicYear}
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          Please complete your enrollment by{" "}
          <strong style={{ color: C.bodyText }}>
            {formatDate(data.enrollmentDate)}
          </strong>
          . Refer to the enclosed documents for further instructions regarding
          registration, tuition payment, and orientation.
        </div>
        <div className="mb-6 text-[15px]" style={{ color: C.bodyMuted }}>
          Congratulations and welcome to our academic community.
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <SignatureBlock title="Director of Admissions" signatureUrl={data.signatureUrl} />
            <div className="mt-2 text-[13px]" style={{ color: C.bodyLight }}>
              {data.universityName}
            </div>
          </div>
          <OfficialStamp />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`ADM-${data.studentId}-001`}
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 2. Enrollment Confirmation
export function EnrollmentConfirmDoc({ data }: DocProps) {
  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <DocWatermark text="ENROLLED" />
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Office of the Registrar"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-2 text-[22px]" style={{ color: C.bodyText }}>
          Enrollment Confirmation
        </div>
        <div className="mb-6 text-[13px]" style={{ color: C.bodyLight }}>
          Document No. ENR/{data.academicYear}/{data.studentId}
        </div>
        <div
          className="mb-5 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          This is to certify that the following student has been officially
          enrolled at{" "}
          <strong style={{ color: C.bodyText }}>{data.universityName}</strong>.
        </div>
        <div
          className="mb-6 rounded-lg p-6"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ["Full Name", data.fullName],
                ["Student Number", data.studentId],
                ["Program", data.major],
                ["Faculty / Department", data.faculty],
                ["Enrollment Date", formatDate(data.enrollmentDate)],
                ["Academic Year", data.academicYear],
                ["Admission Semester", data.admissionSemester],
                ["Status", "Active -- Full-time Student"],
              ] as const
            ).map(([label, val], i) => (
              <div key={i}>
                <div className="text-[12px]" style={{ color: C.bodyLight }}>
                  {label}
                </div>
                <div className="text-[16px]" style={{ color: C.bodyText }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          This document is issued for official records and any administrative
          purposes that the student may require. It is valid for the academic
          year stated above.
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <SignatureBlock title="University Registrar" signatureUrl={data.signatureUrl} />
          </div>
          <OfficialStamp />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`ENR-${data.studentId}-001`}
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 3. Student Information Form
export function StudentInfoFormDoc({ data }: DocProps) {
  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Student Affairs Office"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          Student Information Form
        </div>
        <div className="mb-5 text-[13px]" style={{ color: C.bodyLight }}>
          Please fill in all required fields accurately.
        </div>
        <div className="mb-5 flex gap-5">
          <div
            className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-lg"
            style={{ border: `1px solid ${C.border}` }}
          >
            <img
              src={data.photoUrl}
              alt="Student"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3">
            <FormField label="Full Name" value={data.fullName} wide />
            <FormField
              label="Date of Birth"
              value={formatDate(data.dateOfBirth)}
            />
            <FormField label="Nationality" value={data.nationality} />
          </div>
        </div>
        <div className="mb-3 mt-2 text-[15px]" style={{ color: C.bodyMuted }}>
          Personal Information
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <FormField label="Passport / ID Number" value={data.passportId} />
          <FormField label="Email Address" value={data.email} />
          <FormField label="Phone Number" value={data.phone} />
          <FormField label="Emergency Contact" value={data.emergencyContact} />
          <FormField label="Home Address" value={data.address} wide />
        </div>
        <div className="mb-3 text-[15px]" style={{ color: C.bodyMuted }}>
          Academic Information
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <FormField label="Student ID" value={data.studentId} />
          <FormField label="Faculty" value={data.faculty} />
          <FormField label="Major / Program" value={data.major} />
          <FormField label="Academic Year" value={data.academicYear} />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <div
            className="h-4 w-4 flex-shrink-0 rounded border"
            style={{ borderColor: C.bodyLight }}
          />
          <span className="text-[14px]" style={{ color: C.bodyMuted }}>
            I confirm the information above is true and accurate.
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <SignatureBlock title="Student Signature" signatureUrl={data.signatureUrl} />
          <div className="text-[13px]" style={{ color: C.bodyLight }}>
            Date: {formatDate(data.issueDate)}
          </div>
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`SIF-${data.studentId}-001`}
          officeName="Student Affairs Office"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 4. Tuition Fee Notice
export function TuitionNoticeDoc({ data }: DocProps) {
  const { fees: generatedFees } = useGeneratedData();
  const fees = generatedFees.length > 0
    ? generatedFees.map((f) => [f.item, f.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })])
    : [
        ["Tuition Fee", "4,500.00"],
        ["Laboratory Fee", "350.00"],
        ["Library & Technology Fee", "200.00"],
        ["Student Activity Fee", "150.00"],
        ["Health Insurance", "300.00"],
      ];
  const total = generatedFees.length > 0
    ? generatedFees.reduce((s, f) => s + f.amount, 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "5,500.00";

  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <DocWatermark text="INVOICE" />
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Finance & Accounts Office"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          Tuition Fee Notice
        </div>
        <div className="mb-5 text-[13px]" style={{ color: C.bodyLight }}>
          Invoice No. TFN/{data.academicYear}/{data.studentId}
        </div>
        <div
          className="mb-5 grid grid-cols-2 gap-3 rounded-lg p-5"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Student
            </div>
            <div className="text-[16px]" style={{ color: C.bodyText }}>
              {data.fullName}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Student ID
            </div>
            <div className="text-[16px]" style={{ color: C.bodyText }}>
              {data.studentId}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Program
            </div>
            <div className="text-[16px]" style={{ color: C.bodyText }}>
              {data.major}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Semester
            </div>
            <div className="text-[16px]" style={{ color: C.bodyText }}>
              {data.admissionSemester}
            </div>
          </div>
        </div>
        <table className="mb-4 w-full">
          <thead>
            <TableRow cells={["Description", "Amount (USD)"]} isHeader />
          </thead>
          <tbody>
            {fees.map(([desc, amount], i) => (
              <TableRow key={i} cells={[desc, amount]} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                className="px-3 py-3 text-[15px]"
                style={{
                  color: C.bodyText,
                  borderTop: `2px solid ${C.border}`,
                }}
              >
                <strong>Total Due</strong>
              </td>
              <td
                className="px-3 py-3 text-[16px]"
                style={{
                  color: C.accent,
                  borderTop: `2px solid ${C.border}`,
                }}
              >
                <strong>${total}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mb-5 grid grid-cols-2 gap-5">
          <div
            className="rounded-lg p-4"
            style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
          >
            <div className="mb-2 text-[14px]" style={{ color: C.bodyMuted }}>
              Payment Information
            </div>
            <div
              className="text-[13px] leading-relaxed"
              style={{ color: C.bodyText }}
            >
              Bank: International University Bank
              <br />
              Account: 1234-5678-9012
              <br />
              SWIFT: GTUBANK01
              <br />
              Deadline:{" "}
              <strong>{formatDate(data.paymentDeadline)}</strong>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <QRCodeSVG
              value={`PAY:${data.studentId}:5500`}
              size={80}
              bgColor="transparent"
              fgColor={C.bodyMuted}
            />
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Scan to pay
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <SignatureBlock title="Finance Officer" signatureUrl={data.signatureUrl} />
          <OfficialStamp />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`TFN-${data.studentId}-001`}
          officeName="Finance & Accounts Office"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 5. Course Registration Sheet
export function CourseRegistrationDoc({ data }: DocProps) {
  const { courses: generatedCourses } = useGeneratedData();
  const courses = generatedCourses.length > 0
    ? generatedCourses.map((c) => [c.code, c.name, String(c.credits), c.instructor || "TBA", c.schedule || "TBA"])
    : [
        ["CS101", "Introduction to Programming", "3", "Dr. Smith", "Mon/Wed 9:00-10:30"],
        ["CS201", "Data Structures & Algorithms", "4", "Dr. Johnson", "Tue/Thu 10:00-11:30"],
        ["MATH101", "Calculus I", "3", "Prof. Williams", "Mon/Wed 13:00-14:30"],
        ["ENG101", "Academic English", "2", "Ms. Brown", "Fri 9:00-11:00"],
        ["PHY101", "Physics for Engineers", "3", "Dr. Davis", "Tue/Thu 14:00-15:30"],
      ];
  const totalCredits = generatedCourses.length > 0
    ? generatedCourses.reduce((s, c) => s + c.credits, 0)
    : 15;

  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Academic Affairs Office"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          Course Registration Sheet
        </div>
        <div className="mb-5 text-[13px]" style={{ color: C.bodyLight }}>
          {data.admissionSemester} -- {data.academicYear}
        </div>
        <div
          className="mb-5 grid grid-cols-3 gap-3 rounded-lg p-4"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Student
            </div>
            <div className="text-[15px]" style={{ color: C.bodyText }}>
              {data.fullName}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              ID
            </div>
            <div className="text-[15px]" style={{ color: C.bodyText }}>
              {data.studentId}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Program
            </div>
            <div className="text-[15px]" style={{ color: C.bodyText }}>
              {data.major}
            </div>
          </div>
        </div>
        <table className="mb-5 w-full">
          <thead>
            <TableRow
              cells={["Code", "Course Name", "Credits", "Instructor", "Schedule"]}
              isHeader
            />
          </thead>
          <tbody>
            {courses.map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={2}
                className="px-3 py-2 text-[14px]"
                style={{
                  color: C.bodyText,
                  borderTop: `2px solid ${C.border}`,
                }}
              >
                <strong>Total Credits</strong>
              </td>
              <td
                className="px-3 py-2 text-[15px]"
                style={{
                  color: C.accent,
                  borderTop: `2px solid ${C.border}`,
                }}
              >
                <strong>{totalCredits}</strong>
              </td>
              <td
                colSpan={2}
                style={{ borderTop: `2px solid ${C.border}` }}
              />
            </tr>
          </tfoot>
        </table>
        <div
          className="mb-6 text-[14px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          By signing below, I confirm my enrollment in the courses listed above.
          I understand that changes to my registration must be submitted within
          the add/drop period.
        </div>
        <div className="mt-auto flex items-end justify-between">
          <SignatureBlock title="Student Signature" name={data.fullName} />
          <SignatureBlock title="Academic Advisor" signatureUrl={data.signatureUrl} />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`CRS-${data.studentId}-001`}
          officeName="Academic Affairs Office"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 6. Dormitory Application
export function DormitoryFormDoc({ data }: DocProps) {
  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Student Housing Office"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          Dormitory Application Form
        </div>
        <div className="mb-5 text-[13px]" style={{ color: C.bodyLight }}>
          Academic Year {data.academicYear}
        </div>
        <div className="mb-3 text-[15px]" style={{ color: C.bodyMuted }}>
          Personal Information
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <FormField label="Full Name" value={data.fullName} wide />
          <FormField label="Student ID" value={data.studentId} />
          <FormField
            label="Faculty / Program"
            value={`${data.faculty} -- ${data.major}`}
          />
          <FormField label="Phone Number" value={data.phone} />
          <FormField label="Email" value={data.email} />
        </div>
        <div className="mb-3 text-[15px]" style={{ color: C.bodyMuted }}>
          Housing Preferences
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <FormField
            label="Preferred Dormitory"
            value="Building A -- Standard Room"
          />
          <FormField label="Room Type" value="Double Occupancy" />
          <FormField
            label="Check-in Date"
            value={formatDate(data.enrollmentDate)}
          />
          <FormField label="Meal Plan" value="Standard (3 meals/day)" />
        </div>
        <div className="mb-3 text-[15px]" style={{ color: C.bodyMuted }}>
          Emergency Contact
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <FormField
            label="Contact Person"
            value={data.emergencyContact}
            wide
          />
        </div>
        <div className="mb-5 flex flex-col gap-3">
          {[
            "I agree to follow all dormitory rules and regulations.",
            "I understand the housing fee payment terms.",
            "I consent to room inspection per university policy.",
          ].map((txt, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="h-4 w-4 flex-shrink-0 rounded border"
                style={{ borderColor: C.bodyLight }}
              />
              <span className="text-[14px]" style={{ color: C.bodyMuted }}>
                {txt}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between">
          <SignatureBlock title="Student Signature" name={data.fullName} />
          <SignatureBlock title="Housing Officer" signatureUrl={data.signatureUrl} />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`DRM-${data.studentId}-001`}
          officeName="Student Housing Office"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 7. Student ID Application
export function IDApplicationDoc({ data }: DocProps) {
  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Student Services Office"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          Student ID Card Application
        </div>
        <div className="mb-5 text-[13px]" style={{ color: C.bodyLight }}>
          Please submit this form with a passport-size photo.
        </div>
        <div className="mb-6 flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <div
              className="h-36 w-28 overflow-hidden rounded-lg"
              style={{ border: `2px dashed ${C.border}` }}
            >
              <img
                src={data.photoUrl}
                alt="Student"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-[11px]" style={{ color: C.bodyLight }}>
              Passport Photo
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3">
            <FormField label="Full Name" value={data.fullName} wide />
            <FormField label="Student Number" value={data.studentId} />
            <FormField
              label="Date of Birth"
              value={formatDate(data.dateOfBirth)}
            />
            <FormField label="Faculty" value={data.faculty} />
            <FormField label="Program" value={data.major} />
          </div>
        </div>
        <div className="mb-3 text-[15px]" style={{ color: C.bodyMuted }}>
          Card Details
        </div>
        <div className="mb-6 grid grid-cols-2 gap-3">
          <FormField
            label="Card Issue Date"
            value={formatDate(data.issueDate)}
          />
          <FormField label="Card Expiry" value="June 30, 2029" />
          <FormField label="Card Type" value="Student -- Full-time" />
          <FormField
            label="Access Level"
            value="Campus + Library + Labs"
          />
        </div>
        <div
          className="mb-6 rounded-lg p-4"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div className="mb-2 text-[14px]" style={{ color: C.bodyMuted }}>
            Important Notes
          </div>
          <ul
            className="list-inside list-disc text-[13px] leading-relaxed"
            style={{ color: C.bodyText }}
          >
            <li>Card will be ready for pick-up within 5 business days.</li>
            <li>A replacement fee of $25 applies for lost cards.</li>
            <li>
              Report lost/stolen cards immediately to Student Services.
            </li>
          </ul>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <SignatureBlock title="Student Signature" signatureUrl={data.signatureUrl} />
          <div className="text-[13px]" style={{ color: C.bodyLight }}>
            Date: {formatDate(data.issueDate)}
          </div>
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`IDA-${data.studentId}-001`}
          officeName="Student Services Office"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 8. Orientation Information Sheet
export function OrientationSheetDoc({ data }: DocProps) {
  const schedule = [
    ["9:00 AM", "Welcome Ceremony", "Main Auditorium"],
    ["10:00 AM", "Campus Tour", "Meeting Point: Gate A"],
    ["11:30 AM", "Department Introduction", "Faculty Building, Room 301"],
    ["12:30 PM", "Lunch Break", "Student Cafeteria"],
    ["2:00 PM", "Student Services Briefing", "Conference Hall B"],
    ["3:30 PM", "Club & Activities Fair", "Campus Plaza"],
    ["5:00 PM", "Q&A and Closing", "Main Auditorium"],
  ];

  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Office of Student Life"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          New Student Orientation
        </div>
        <div className="mb-2 text-[13px]" style={{ color: C.bodyLight }}>
          {data.admissionSemester} -- {formatDate(data.enrollmentDate)}
        </div>
        <div
          className="mb-5 rounded-lg p-5"
          style={{
            background: C.accentLight,
            border: `1px solid ${C.border}`,
          }}
        >
          <div className="mb-2 text-[18px]" style={{ color: C.bodyText }}>
            Welcome to {data.universityName}!
          </div>
          <div
            className="text-[14px] leading-relaxed"
            style={{ color: C.bodyMuted }}
          >
            Dear {data.fullName}, congratulations on your admission! We are
            excited to welcome you to our campus community. Please join us for
            the new student orientation day to get started on your academic
            journey.
          </div>
        </div>
        <div className="mb-3 text-[16px]" style={{ color: C.bodyText }}>
          Orientation Schedule
        </div>
        <table className="mb-5 w-full">
          <thead>
            <TableRow cells={["Time", "Activity", "Location"]} isHeader />
          </thead>
          <tbody>
            {schedule.map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </tbody>
        </table>
        <div
          className="mb-5 flex items-center justify-center rounded-lg p-5"
          style={{
            background: "#f0ece6",
            border: `1px dashed ${C.border}`,
            minHeight: 100,
          }}
        >
          <div className="text-center">
            <div className="mb-1 text-[16px]" style={{ color: C.bodyLight }}>
              Campus Map
            </div>
            <div className="text-[13px]" style={{ color: C.bodyLight }}>
              Refer to the digital campus map at map.gtu.edu
            </div>
          </div>
        </div>
        <div className="mb-3 text-[16px]" style={{ color: C.bodyText }}>
          Contact Information
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="text-[14px]" style={{ color: C.bodyMuted }}>
            <strong style={{ color: C.bodyText }}>Admissions Office</strong>
            <br />
            admissions@gtu.edu
            <br />
            +1 (555) 123-4567
          </div>
          <div className="text-[14px]" style={{ color: C.bodyMuted }}>
            <strong style={{ color: C.bodyText }}>Student Services</strong>
            <br />
            studentservices@gtu.edu
            <br />
            +1 (555) 123-4568
          </div>
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`ORI-${data.studentId}-001`}
          officeName="Office of Student Life"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 9. Academic Transcript
export function TranscriptDoc({ data }: DocProps) {
  const { transcript } = useGeneratedData();

  const fallbackSemesters = [
    {
      name: "Fall 2025 (Semester 1)",
      courses: [
        { code: "CS101", title: "Introduction to Programming", credits: "3", grade: "A", points: "12.00" },
        { code: "MATH101", title: "Calculus I", credits: "3", grade: "A-", points: "11.10" },
        { code: "ENG101", title: "Academic English", credits: "2", grade: "B+", points: "6.60" },
        { code: "PHY101", title: "Physics for Engineers", credits: "3", grade: "B+", points: "9.90" },
      ],
      gpa: "3.60",
      totalCredits: "11",
    },
    {
      name: "Spring 2026 (Semester 2)",
      courses: [
        { code: "CS201", title: "Data Structures & Algorithms", credits: "4", grade: "A", points: "16.00" },
        { code: "CS202", title: "Discrete Mathematics", credits: "3", grade: "B+", points: "9.90" },
        { code: "MATH201", title: "Linear Algebra", credits: "3", grade: "A-", points: "11.10" },
        { code: "CS203", title: "Computer Architecture", credits: "3", grade: "B", points: "9.00" },
      ],
      gpa: "3.54",
      totalCredits: "13",
    },
    {
      name: "Fall 2026 (Semester 3)",
      courses: [
        { code: "CS301", title: "Operating Systems", credits: "3", grade: "A-", points: "11.10" },
        { code: "CS302", title: "Database Systems", credits: "4", grade: "A", points: "16.00" },
        { code: "CS303", title: "Software Engineering", credits: "3", grade: "B+", points: "9.90" },
        { code: "MATH301", title: "Probability & Statistics", credits: "3", grade: "A", points: "12.00" },
      ],
      gpa: "3.77",
      totalCredits: "13",
    },
  ];

  const semesters = transcript && transcript.semesters.length > 0
    ? transcript.semesters.map((sem, idx) => ({
        name: `${sem.name} (Semester ${idx + 1})`,
        courses: sem.courses.map((c) => ({
          code: c.code,
          title: c.name,
          credits: String(c.credits),
          grade: c.grade,
          points: (c.points * c.credits).toFixed(2),
        })),
        gpa: sem.semesterGpa.toFixed(2),
        totalCredits: String(sem.courses.reduce((s, c) => s + c.credits, 0)),
      }))
    : fallbackSemesters;

  const cumulativeGpa = transcript
    ? transcript.cumulativeGpa.toFixed(2)
    : "3.42";

  const totalEarnedCredits = transcript
    ? String(transcript.semesters.reduce((s, sem) => s + sem.courses.reduce((cs, c) => cs + c.credits, 0), 0))
    : "37";

  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <DocWatermark text="TRANSCRIPT" />
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Office of the Registrar"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-1 text-[22px]" style={{ color: C.bodyText }}>
          Official Academic Transcript
        </div>
        <div className="mb-5 text-[13px]" style={{ color: C.bodyLight }}>
          Transcript ID: TRS/{data.academicYear}/{data.studentId} -- Issued:{" "}
          {formatDate(data.issueDate)}
        </div>
        <div
          className="mb-5 grid grid-cols-3 gap-3 rounded-lg p-4"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Student
            </div>
            <div className="text-[15px]" style={{ color: C.bodyText }}>
              {data.fullName}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              ID
            </div>
            <div className="text-[15px]" style={{ color: C.bodyText }}>
              {data.studentId}
            </div>
          </div>
          <div>
            <div className="text-[12px]" style={{ color: C.bodyLight }}>
              Program
            </div>
            <div className="text-[15px]" style={{ color: C.bodyText }}>
              {data.major}
            </div>
          </div>
        </div>
        {semesters.map((sem) => (
          <div key={sem.name} className="mb-4">
            <div
              className="mb-2 flex items-center justify-between text-[14px]"
              style={{ color: C.bodyMuted }}
            >
              <span>{sem.name}</span>
              <span>
                Semester GPA:{" "}
                <strong style={{ color: C.bodyText }}>{sem.gpa}</strong> --
                Credits: {sem.totalCredits}
              </span>
            </div>
            <table className="mb-1 w-full">
              <thead>
                <TableRow
                  cells={["Code", "Course", "Credits", "Grade", "Points"]}
                  isHeader
                />
              </thead>
              <tbody>
                {sem.courses.map((c) => (
                  <TableRow
                    key={c.code}
                    cells={[c.code, c.title, c.credits, c.grade, c.points]}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div
          className="mb-4 mt-2 rounded-lg p-4"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div className="flex justify-between text-[15px]">
            <span style={{ color: C.bodyMuted }}>Cumulative GPA</span>
            <span style={{ color: C.bodyText }}>
              <strong>{cumulativeGpa}</strong> / 4.00
            </span>
          </div>
          <div className="mt-1 flex justify-between text-[15px]">
            <span style={{ color: C.bodyMuted }}>Total Credits Earned</span>
            <span style={{ color: C.bodyText }}>
              <strong>{totalEarnedCredits}</strong> / 140
            </span>
          </div>
          <div className="mt-1 flex justify-between text-[15px]">
            <span style={{ color: C.bodyMuted }}>Academic Standing</span>
            <span style={{ color: C.accent }}>Good Standing</span>
          </div>
        </div>
        <div className="mb-3 text-[13px]" style={{ color: C.bodyLight }}>
          Grading Scale: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3,
          C=2.0, D=1.0, F=0.0
        </div>
        <div className="mt-auto flex items-end justify-between">
          <SignatureBlock
            title="University Registrar"
            name="Dr. Sarah Mitchell"
            signatureUrl={data.signatureUrl}
          />
          <OfficialStamp universityName={data.universityName} />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`TRS-${data.studentId}-001`}
          officeName="Office of the Registrar"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// 10. Scholarship Notice
export function ScholarshipNoticeDoc({ data }: DocProps) {
  return (
    <div
      className="relative flex min-h-[842px] w-[595px] flex-col overflow-hidden rounded-lg"
      style={{ background: C.bodyBg }}
    >
      <DocWatermark text="AWARD" />
      <div className="relative z-10 flex h-full flex-col p-10">
        <DocHeader
          universityName={data.universityName}
          subtitle="Office of Financial Aid & Scholarships"
          universityLogo={data.universityLogo}
          universityAddress={data.universityAddress}
        />
        <div className="mb-4 text-[13px]" style={{ color: C.bodyLight }}>
          Ref: SCH/{data.academicYear}/{data.studentId} -- Date:{" "}
          {formatDate(data.issueDate)}
        </div>
        <div className="mb-6 text-[22px]" style={{ color: C.bodyText }}>
          Scholarship Award Notification
        </div>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyText }}
        >
          Dear <span style={{ color: C.accent }}>{data.fullName}</span>,
        </div>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          We are delighted to inform you that you have been selected to receive
          the{" "}
          <strong style={{ color: C.bodyText }}>
            Academic Excellence Scholarship
          </strong>{" "}
          for the{" "}
          <strong style={{ color: C.bodyText }}>{data.academicYear}</strong>{" "}
          academic year at{" "}
          <strong style={{ color: C.bodyText }}>{data.universityName}</strong>.
        </div>
        <div
          className="mb-5 rounded-lg p-5"
          style={{ background: "#f0ece6", border: `1px solid ${C.border}` }}
        >
          <div className="mb-3 text-[14px]" style={{ color: C.bodyMuted }}>
            Scholarship Details
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Scholarship Name
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                Academic Excellence Award
              </div>
            </div>
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Award Amount
              </div>
              <div className="text-[16px]" style={{ color: C.accent }}>
                $2,500.00 / semester
              </div>
            </div>
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Duration
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                2 semesters (renewable)
              </div>
            </div>
            <div>
              <div className="text-[12px]" style={{ color: C.bodyLight }}>
                Effective From
              </div>
              <div className="text-[16px]" style={{ color: C.bodyText }}>
                {data.admissionSemester}
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-3 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          <strong style={{ color: C.bodyText }}>
            Conditions for Renewal:
          </strong>
        </div>
        <ul
          className="mb-5 list-inside list-disc text-[14px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          <li>Maintain a minimum cumulative GPA of 3.00</li>
          <li>Complete at least 12 credits per semester</li>
          <li>Remain in good academic and disciplinary standing</li>
          <li>Submit a renewal application before each academic year</li>
        </ul>
        <div
          className="mb-4 text-[15px] leading-relaxed"
          style={{ color: C.bodyMuted }}
        >
          The scholarship will be automatically applied to your tuition
          account. Please contact the Financial Aid Office if you have any
          questions regarding this award.
        </div>
        <div className="mb-6 text-[15px]" style={{ color: C.bodyMuted }}>
          Congratulations on this achievement. We wish you continued academic
          success.
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <SignatureBlock
              title="Director of Financial Aid"
              name="Prof. David Chen"
              signatureUrl={data.signatureUrl}
            />
            <div className="mt-2 text-[13px]" style={{ color: C.bodyLight }}>
              {data.universityName}
            </div>
          </div>
          <OfficialStamp universityName={data.universityName} />
        </div>
        <DocFooter
          universityName={data.universityName}
          docId={`SCH-${data.studentId}-001`}
          officeName="Office of Financial Aid"
          universityAddress={data.universityAddress}
        />
      </div>
    </div>
  );
}

// Template renderer mapping
export const docTemplateComponents: Record<string, React.FC<DocProps>> = {
  "admission-letter": AdmissionLetterDoc,
  "enrollment-confirm": EnrollmentConfirmDoc,
  "student-info-form": StudentInfoFormDoc,
  "tuition-notice": TuitionNoticeDoc,
  "course-registration": CourseRegistrationDoc,
  "dormitory-form": DormitoryFormDoc,
  "id-application": IDApplicationDoc,
  "orientation-sheet": OrientationSheetDoc,
  transcript: TranscriptDoc,
  "scholarship-notice": ScholarshipNoticeDoc,
};
