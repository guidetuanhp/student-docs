"use client";

import React from "react";
import {
  Check,
  FileText,
  Receipt,
  BookOpen,
  Home,
  CreditCard,
  Users,
  CalendarDays,
  GraduationCap,
  Award,
  ClipboardList,
} from "lucide-react";
import { docTemplates } from "./doc-types";

interface DocGalleryProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  "admission-letter": <FileText size={18} />,
  "enrollment-confirm": <ClipboardList size={18} />,
  "student-info-form": <Users size={18} />,
  "tuition-notice": <Receipt size={18} />,
  "course-registration": <BookOpen size={18} />,
  "dormitory-form": <Home size={18} />,
  "id-application": <CreditCard size={18} />,
  "orientation-sheet": <CalendarDays size={18} />,
  transcript: <GraduationCap size={18} />,
  "scholarship-notice": <Award size={18} />,
};

const catColor: Record<string, string> = {
  Admission: "#7a8a7a",
  Enrollment: "#6a8098",
  Forms: "#8a7a6a",
  Finance: "#8a6a6a",
  Academic: "#6a6a8a",
  Housing: "#6a8a7a",
  Welcome: "#8a7a8a",
};

export function DocTemplateGallery({ selectedId, onSelect }: DocGalleryProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[18px] text-gray-800">Document Templates</h3>
      <div className="flex flex-col gap-2">
        {docTemplates.map((t) => {
          const isSelected = selectedId === t.id;
          const color = catColor[t.category] || "#7a8a7a";
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`relative flex items-start gap-3 rounded-lg p-3 text-left transition-all ${
                isSelected
                  ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div
                className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: `${color}18`, color }}
              >
                {iconMap[t.id]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] text-gray-800">{t.name}</div>
                <div className="mt-0.5 text-[12px] text-gray-400">
                  {t.description}
                </div>
                <span
                  className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px]"
                  style={{ background: `${color}15`, color }}
                >
                  {t.category}
                </span>
              </div>
              {isSelected && (
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
