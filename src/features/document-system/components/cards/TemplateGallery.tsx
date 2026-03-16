import React from "react";
import { Check } from "lucide-react";
import { cardTemplates } from "./card-types";

interface TemplateGalleryProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const cardMeta: Record<
  string,
  { gradient: string; accent: string; icon: string }
> = {
  mit: { gradient: "linear-gradient(135deg, #c2636e, #a84f5a)", accent: "#f0c4c8", icon: "M" },
  harvard: { gradient: "linear-gradient(150deg, #6b4c3b, #8d6b56)", accent: "#dcc8a8", icon: "H" },
  korean: { gradient: "linear-gradient(180deg, #5c6bc0, #9fa8da)", accent: "#c5cae9", icon: "K" },
  european: { gradient: "linear-gradient(135deg, #5b8fbf, #80afd6)", accent: "#cce0f0", icon: "E" },
  tech: { gradient: "linear-gradient(135deg, #2d3e50, #3d566e)", accent: "#8fbcb8", icon: "T" },
  minimal: { gradient: "linear-gradient(135deg, #f5f0eb, #e8e0d8)", accent: "#a0917f", icon: "U" },
  colorful: { gradient: "linear-gradient(135deg, #e8a87c, #c07a60)", accent: "#f5ddd0", icon: "C" },
  darkmode: { gradient: "linear-gradient(135deg, #2c3e50, #3d566e)", accent: "#8ea8c0", icon: "D" },
  plastic: { gradient: "linear-gradient(160deg, #d8d0e8, #c4bcd4)", accent: "#8878a0", icon: "P" },
  smartcard: { gradient: "linear-gradient(145deg, #4a4035, #665a4c)", accent: "#c8b48c", icon: "S" },
  medical: { gradient: "linear-gradient(180deg, #5a8a78, #7caa98)", accent: "#c0dcd0", icon: "+" },
  art: { gradient: "linear-gradient(135deg, #8e6a8a, #b08eae)", accent: "#d8c4d4", icon: "A" },
};

export function TemplateGallery({ selectedId, onSelect }: TemplateGalleryProps) {
  return (
    <div className="flex flex-col gap-3 px-1">
      <h3 className="text-gray-800 text-[16px] font-semibold px-1">Card Templates</h3>
      <div className="flex flex-col gap-1.5">
        {cardTemplates.map((t) => {
          const isSelected = selectedId === t.id;
          const meta = cardMeta[t.id] || { gradient: "linear-gradient(135deg, #888, #666)", accent: "#ccc", icon: "?" };
          const isVertical = t.orientation === "vertical";
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-all ${
                isSelected
                  ? "bg-blue-50 ring-2 ring-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* Mini card preview */}
              <div
                className="flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center"
                style={{
                  background: meta.gradient,
                  width: isVertical ? 32 : 48,
                  height: isVertical ? 48 : 32,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                <span
                  className="text-[11px] font-bold opacity-80"
                  style={{ color: meta.accent }}
                >
                  {meta.icon}
                </span>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`text-[13px] font-medium truncate ${isSelected ? "text-blue-700" : "text-gray-800"}`}>
                  {t.name}
                </div>
                <div className="text-[11px] text-gray-400 truncate">
                  {t.style} · {isVertical ? "↕ Vertical" : "↔ Horizontal"}
                </div>
              </div>
              {/* Selected check */}
              {isSelected && (
                <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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
