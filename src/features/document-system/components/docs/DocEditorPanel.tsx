"use client";

import type { AdmissionData } from "../docs/doc-types";
import { FormInput } from "../shared/FormInput";
import { PhotoDisplay } from "../shared/PhotoDisplay";
import { UniversitySelect } from "../shared/UniversitySelect";
import { FileSignature } from "lucide-react";

interface DocEditorPanelProps {
  data: AdmissionData;
  onChange: (data: AdmissionData) => void;
}

function SignatureDisplay({ signatureUrl }: { signatureUrl: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-gray-500">
        Signature
      </label>
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-32 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {signatureUrl ? (
            <img
              src={signatureUrl}
              alt="Signature"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileSignature size={20} className="text-gray-300" />
            </div>
          )}
        </div>
        <p className="text-[11px] text-gray-400">
          Randomly assigned. Use Re-generate to change.
        </p>
      </div>
    </div>
  );
}

export default function DocEditorPanel({
  data,
  onChange,
}: DocEditorPanelProps) {
  const update = (field: keyof AdmissionData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <h3 className="text-[13px] font-semibold text-gray-700">
        Admission Document Info
      </h3>

      <PhotoDisplay photoUrl={data.photoUrl} />
      <SignatureDisplay signatureUrl={data.signatureUrl} />

      <UniversitySelect
        value={data.universityName}
        onChange={(name, logo, address) => onChange({ ...data, universityName: name, universityLogo: logo || data.universityLogo, universityAddress: address || data.universityAddress })}
      />

      <FormInput
        label="Full Name"
        value={data.fullName}
        onChange={(v) => update("fullName", v)}
      />
      <FormInput
        label="Student ID"
        value={data.studentId}
        onChange={(v) => update("studentId", v)}
      />
      <FormInput
        label="Faculty"
        value={data.faculty}
        onChange={(v) => update("faculty", v)}
      />
      <FormInput
        label="Major"
        value={data.major}
        onChange={(v) => update("major", v)}
      />
      <FormInput
        label="Date of Birth"
        value={data.dateOfBirth}
        type="date"
        onChange={(v) => update("dateOfBirth", v)}
      />
      <FormInput
        label="Nationality"
        value={data.nationality}
        onChange={(v) => update("nationality", v)}
      />
      <FormInput
        label="Passport / ID"
        value={data.passportId}
        onChange={(v) => update("passportId", v)}
      />
      <FormInput
        label="Email"
        value={data.email}
        type="email"
        onChange={(v) => update("email", v)}
      />
      <FormInput
        label="Phone"
        value={data.phone}
        type="tel"
        onChange={(v) => update("phone", v)}
      />
      <FormInput
        label="Address"
        value={data.address}
        onChange={(v) => update("address", v)}
      />
      <FormInput
        label="Emergency Contact"
        value={data.emergencyContact}
        onChange={(v) => update("emergencyContact", v)}
      />
      <FormInput
        label="Admission Semester"
        value={data.admissionSemester}
        onChange={(v) => update("admissionSemester", v)}
      />
      <FormInput
        label="Academic Year"
        value={data.academicYear}
        onChange={(v) => update("academicYear", v)}
      />
      <FormInput
        label="Issue Date"
        value={data.issueDate}
        type="date"
        onChange={(v) => update("issueDate", v)}
      />
      <FormInput
        label="Enrollment Date"
        value={data.enrollmentDate}
        type="date"
        onChange={(v) => update("enrollmentDate", v)}
      />
      <FormInput
        label="Payment Deadline"
        value={data.paymentDeadline}
        type="date"
        onChange={(v) => update("paymentDeadline", v)}
      />
    </div>
  );
}
