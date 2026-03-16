interface QuickSwitcherProps {
  templates: { id: string; name: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const cardColorMap: Record<string, { bg: string; text: string; border: string }> = {
  mit:       { bg: "linear-gradient(135deg, #c2636e, #a84f5a)", text: "#fce4e6", border: "#a84f5a" },
  harvard:   { bg: "linear-gradient(135deg, #6b4c3b, #8d6b56)", text: "#e8d8c0", border: "#6b4c3b" },
  korean:    { bg: "linear-gradient(135deg, #5c6bc0, #9fa8da)", text: "#e8eaf6", border: "#5c6bc0" },
  european:  { bg: "linear-gradient(135deg, #5b8fbf, #80afd6)", text: "#e8f0f8", border: "#5b8fbf" },
  tech:      { bg: "linear-gradient(135deg, #2d3e50, #3d566e)", text: "#b0d4d0", border: "#2d3e50" },
  minimal:   { bg: "linear-gradient(135deg, #f5f0eb, #e8e0d8)", text: "#6b5e52", border: "#d6ccc0" },
  colorful:  { bg: "linear-gradient(135deg, #e8a87c, #c07a60)", text: "#fef0e8", border: "#c07a60" },
  darkmode:  { bg: "linear-gradient(135deg, #2c3e50, #3d566e)", text: "#c0d0de", border: "#2c3e50" },
  plastic:   { bg: "linear-gradient(135deg, #d8d0e8, #c4bcd4)", text: "#5a4d6e", border: "#c4bcd4" },
  smartcard: { bg: "linear-gradient(145deg, #4a4035, #665a4c)", text: "#ddd0b8", border: "#4a4035" },
  medical:   { bg: "linear-gradient(135deg, #5a8a78, #7caa98)", text: "#f0f8f4", border: "#5a8a78" },
  art:       { bg: "linear-gradient(135deg, #8e6a8a, #b08eae)", text: "#f4eaf2", border: "#8e6a8a" },
};

export function QuickSwitcher({
  templates,
  selectedId,
  onSelect,
}: QuickSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-[700px]">
      {templates.map((t) => {
        const isActive = selectedId === t.id;
        const colors = cardColorMap[t.id];

        // Fallback for non-card templates (docs, portals)
        if (!colors) {
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`px-3 py-1 rounded-full text-[12px] transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {t.name}
            </button>
          );
        }

        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-all ${
              isActive
                ? "ring-2 ring-blue-500 ring-offset-1 shadow-md scale-105"
                : "hover:scale-105 hover:shadow-sm"
            }`}
            style={{
              background: colors.bg,
              border: `1.5px solid ${isActive ? "#3b82f6" : colors.border}`,
            }}
          >
            <span
              className="text-[11px] font-medium leading-tight whitespace-nowrap"
              style={{ color: colors.text }}
            >
              {t.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
