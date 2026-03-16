"use client";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date" | "email" | "tel";
  placeholder?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] text-gray-900 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40"
      />
    </div>
  );
}
