"use client";

import { IdCard, FileText, Monitor } from "lucide-react";

export type Mode = "cards" | "docs" | "portals";

interface ModeSwitcherProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const modes: { id: Mode; label: string; icon: typeof IdCard }[] = [
  { id: "cards", label: "ID Cards", icon: IdCard },
  { id: "docs", label: "Docs", icon: FileText },
  { id: "portals", label: "Portals", icon: Monitor },
];

export default function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {modes.map((m) => {
        const Icon = m.icon;
        const isActive = mode === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium transition-all ${
              isActive
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={15} />
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
