"use client";

import React from "react";
import {
  Check,
  LayoutDashboard,
  Building2,
  Globe2,
  Minimize2,
  Table2,
  SquareStack,
  PanelLeft,
  Navigation,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { portalTemplates } from "./portal-types";

interface PortalGalleryProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  classic: <GraduationCap size={18} />,
  "modern-dashboard": <LayoutDashboard size={18} />,
  government: <Building2 size={18} />,
  korean: <Globe2 size={18} />,
  minimal: <Minimize2 size={18} />,
  "academic-table": <Table2 size={18} />,
  "card-based": <SquareStack size={18} />,
  sidebar: <PanelLeft size={18} />,
  "top-nav": <Navigation size={18} />,
  "mobile-first": <Smartphone size={18} />,
};

export function PortalTemplateGallery({
  selectedId,
  onSelect,
}: PortalGalleryProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[18px] text-gray-800">Portal Templates</h3>
      <div className="flex flex-col gap-2">
        {portalTemplates.map((t) => {
          const isSelected = selectedId === t.id;
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
                style={{ background: "#eef2f4", color: "#6a7a80" }}
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
                  style={{ background: "#eef2f4", color: "#6a7a80" }}
                >
                  {t.style}
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
