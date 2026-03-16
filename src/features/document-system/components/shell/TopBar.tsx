"use client";

import { RefreshCw, Download, ArrowRightLeft } from "lucide-react";
import type { Mode } from "./ModeSwitcher";

interface TopBarProps {
  mode: Mode;
  selectedTemplate: string;
  onSyncData: () => void;
  onRegenerate: () => void;
  onExportPng: () => void;
  exporting?: boolean;
}

const modeLabels: Record<Mode, string> = {
  cards: "ID Card",
  docs: "Document",
  portals: "Portal",
};

export default function TopBar({
  mode,
  selectedTemplate,
  onSyncData,
  onRegenerate,
  onExportPng,
  exporting = false,
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        <h2 className="text-[15px] font-medium text-gray-900">
          {modeLabels[mode]} Template
        </h2>
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[12px] text-gray-500">
          {selectedTemplate}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSyncData}
          className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <ArrowRightLeft size={15} />
          Sync Data
        </button>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-[13px] font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <RefreshCw size={15} />
          Re-generate
        </button>
        <button
          onClick={onExportPng}
          disabled={exporting}
          className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-medium text-white transition-colors ${
            exporting
              ? "bg-blue-400 opacity-50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Download size={15} />
          {exporting ? "Exporting..." : "Export PNG"}
        </button>
      </div>
    </div>
  );
}
