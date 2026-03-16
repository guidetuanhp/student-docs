"use client";

import { Palette, Edit3 } from "lucide-react";

export type Tab = "templates" | "edit";

interface TabSwitcherProps {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: typeof Palette }[] = [
  { id: "templates", label: "Templates", icon: Palette },
  { id: "edit", label: "Edit Info", icon: Edit3 },
];

export default function TabSwitcher({ tab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = tab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium transition-colors ${
              isActive
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon size={15} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
