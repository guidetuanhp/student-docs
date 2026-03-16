import React from "react";

export function HologramOverlay({
  color = "rgba(255,255,255,0.08)",
}: {
  color?: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          top: "10%",
          right: "8%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute w-16 h-16 rounded-full"
        style={{
          bottom: "15%",
          left: "5%",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: "blur(3px)",
        }}
      />
    </div>
  );
}

export function WatermarkPattern({
  text = "STUDENT",
  color = "rgba(255,255,255,0.03)",
}: {
  text?: string;
  color?: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 flex flex-wrap gap-8 -rotate-30 scale-150 opacity-100"
        style={{ top: "-20%", left: "-20%" }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="text-[10px] tracking-[0.3em] whitespace-nowrap"
            style={{ color }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

let microPatternCounter = 0;

export function MicroPattern({
  color = "rgba(255,255,255,0.03)",
}: {
  color?: string;
}) {
  const idRef = React.useRef(
    `micro-${++microPatternCounter}-${Math.random().toString(36).slice(2, 8)}`
  );
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none rounded-xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={idRef.current}
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${idRef.current})`} />
    </svg>
  );
}

export function ChipIcon() {
  return (
    <svg
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="35"
        height="27"
        rx="3.5"
        fill="#d4af37"
        stroke="#b8960c"
      />
      <rect x="4" y="4" width="28" height="20" rx="2" fill="#e8c84a" />
      <line
        x1="4"
        y1="10"
        x2="32"
        y2="10"
        stroke="#b8960c"
        strokeWidth="0.5"
      />
      <line
        x1="4"
        y1="18"
        x2="32"
        y2="18"
        stroke="#b8960c"
        strokeWidth="0.5"
      />
      <line
        x1="12"
        y1="4"
        x2="12"
        y2="24"
        stroke="#b8960c"
        strokeWidth="0.5"
      />
      <line
        x1="24"
        y1="4"
        x2="24"
        y2="24"
        stroke="#b8960c"
        strokeWidth="0.5"
      />
      <line
        x1="18"
        y1="4"
        x2="18"
        y2="24"
        stroke="#b8960c"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function BarcodeBlock() {
  const bars = [
    2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1,
    1, 2, 1, 3, 1, 2,
  ];
  return (
    <div className="flex items-end gap-[0.5px] h-6">
      {bars.map((w, i) => (
        <div
          key={i}
          className="bg-current"
          style={{ width: `${w}px`, height: `${14 + (i % 3) * 4}px` }}
        />
      ))}
    </div>
  );
}
