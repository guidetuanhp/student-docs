"use client";

import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import ModeSwitcher, { type Mode } from "./ModeSwitcher";
import TabSwitcher, { type Tab } from "./TabSwitcher";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  children?: React.ReactNode;
}

export default function Sidebar({
  isOpen,
  onToggle,
  mode,
  onModeChange,
  tab,
  onTabChange,
  children,
}: SidebarProps) {
  return (
    <div className="relative flex">
      {/* Sidebar panel */}
      <div
        className="relative h-full overflow-hidden border-r border-gray-200 bg-white transition-all duration-300"
        style={{ width: isOpen ? 340 : 0 }}
      >
        <div className="flex h-full w-[340px] flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <CreditCard size={22} className="text-blue-600" />
              <div>
                <h1 className="text-[15px] font-semibold text-gray-900">
                  University System
                </h1>
                <p className="text-[12px] text-gray-400">
                  Cards -- Documents -- Portals
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="px-4 pt-4 pb-3">
            <ModeSwitcher mode={mode} onModeChange={onModeChange} />
          </div>

          {/* Tab Switcher */}
          <TabSwitcher tab={tab} onTabChange={onTabChange} />

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:bg-gray-50"
        style={{ left: isOpen ? 326 : -14 }}
      >
        {isOpen ? (
          <ChevronLeft size={14} className="text-gray-500" />
        ) : (
          <ChevronRight size={14} className="text-gray-500" />
        )}
      </button>
    </div>
  );
}
