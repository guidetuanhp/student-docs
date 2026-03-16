"use client";

import type { PortalStudentData } from "../portals/portal-types";
import { FormInput } from "../shared/FormInput";
import { FormSelect } from "../shared/FormSelect";
import { PhotoDisplay } from "../shared/PhotoDisplay";
import { UniversitySelect } from "../shared/UniversitySelect";

interface PortalEditorPanelProps {
  data: PortalStudentData;
  onChange: (data: PortalStudentData) => void;
}

export default function PortalEditorPanel({
  data,
  onChange,
}: PortalEditorPanelProps) {
  const update = (field: keyof PortalStudentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-3">
      <h3 className="text-[13px] font-semibold text-gray-700">
        Portal Student Info
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
        label="Nationality"
        value={data.nationality}
        onChange={(v) => update("nationality", v)}
      />
      <FormInput
        label="Date of Birth"
        value={data.dateOfBirth}
        type="date"
        onChange={(v) => update("dateOfBirth", v)}
      />
      <FormInput
        label="Enrollment Year"
        value={data.enrollmentYear}
        onChange={(v) => update("enrollmentYear", v)}
      />
      <FormInput
        label="Expected Graduation"
        value={data.expectedGraduation}
        onChange={(v) => update("expectedGraduation", v)}
      />
      <FormSelect
        label="Status"
        value={data.status}
        onChange={(v) => update("status", v)}
        options={[
          { value: "Active", label: "Active" },
          { value: "Enrolled", label: "Enrolled" },
          { value: "Graduate Candidate", label: "Graduate Candidate" },
        ]}
      />
      <FormInput
        label="Current Semester"
        value={data.currentSemester}
        onChange={(v) => update("currentSemester", v)}
      />
      <FormInput
        label="GPA"
        value={data.gpa}
        onChange={(v) => update("gpa", v)}
      />
      <FormInput
        label="Credits Completed"
        value={data.creditsCompleted}
        onChange={(v) => update("creditsCompleted", v)}
      />
      <FormInput
        label="Total Credits"
        value={data.totalCredits}
        onChange={(v) => update("totalCredits", v)}
      />
      <FormInput
        label="Academic Standing"
        value={data.academicStanding}
        onChange={(v) => update("academicStanding", v)}
      />
      <FormInput
        label="Academic Advisor"
        value={data.academicAdvisor}
        onChange={(v) => update("academicAdvisor", v)}
      />
      <FormInput
        label="Semester Tuition"
        value={data.semesterTuition}
        onChange={(v) => update("semesterTuition", v)}
      />
      <FormSelect
        label="Payment Status"
        value={data.paymentStatus}
        onChange={(v) => update("paymentStatus", v)}
        options={[
          { value: "Paid", label: "Paid" },
          { value: "Pending", label: "Pending" },
          { value: "Overdue", label: "Overdue" },
        ]}
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
