"use client";

import type { StudentData } from "../cards/card-types";
import { FormInput } from "../shared/FormInput";
import { PhotoDisplay } from "../shared/PhotoDisplay";
import { UniversitySelect } from "../shared/UniversitySelect";

interface EditorPanelProps {
  data: StudentData;
  onChange: (data: StudentData) => void;
}

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  const update = (field: keyof StudentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <h3 className="text-[13px] font-semibold text-gray-700">
        Student Card Info
      </h3>

      <PhotoDisplay photoUrl={data.photoUrl} />

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
        label="Issue Date"
        value={data.issueDate}
        type="date"
        onChange={(v) => update("issueDate", v)}
      />
      <FormInput
        label="Expiry Date"
        value={data.expiryDate}
        type="date"
        onChange={(v) => update("expiryDate", v)}
      />
    </div>
  );
}
