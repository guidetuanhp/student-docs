"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

const C = {
  headerBg: "#4a5568",
  headerText: "#e8e0d8",
  headerSub: "#c8beb4",
  bodyBg: "#faf8f5",
  bodyText: "#4a4540",
  bodyMuted: "#8a8078",
  bodyLight: "#b0a89e",
  border: "#e0dbd4",
  accent: "#7a8a7a",
  accentLight: "#d8e0d8",
  stampColor: "#b8a090",
  watermark: "rgba(120,110,100,0.04)",
};

export function DocHeader({
  universityName,
  subtitle,
  universityLogo,
  universityAddress,
}: {
  universityName: string;
  subtitle: string;
  universityLogo?: string;
  universityAddress?: string;
}) {
  return (
    <div
      className="mb-5 flex items-center justify-between pb-4"
      style={{ borderBottom: `2px solid ${C.border}` }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full overflow-hidden"
          style={{ border: `2px solid ${C.headerBg}`, color: C.headerBg }}
        >
          {universityLogo ? (
            <img src={universityLogo} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-[22px]">{universityName.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="text-[20px]" style={{ color: C.bodyText }}>
            {universityName}
          </div>
          <div className="text-[14px]" style={{ color: C.bodyMuted }}>
            {subtitle}
          </div>
          <div className="mt-0.5 text-[11px]" style={{ color: C.bodyLight }}>
            {universityAddress || universityName}
          </div>
        </div>
      </div>
      <QRCodeSVG
        value={`DOC:${universityName}`}
        size={44}
        bgColor="transparent"
        fgColor={C.bodyLight}
      />
    </div>
  );
}

export function DocFooter({
  universityName,
  docId,
  officeName = "Office of Admissions",
  universityAddress,
}: {
  universityName: string;
  docId: string;
  officeName?: string;
  universityAddress?: string;
}) {
  return (
    <div
      className="mt-auto flex flex-col gap-1 pt-4"
      style={{ borderTop: `1px solid ${C.border}` }}
    >
      <div
        className="flex items-center justify-between text-[11px]"
        style={{ color: C.bodyLight }}
      >
        <span>
          {universityName} -- {officeName}
        </span>
        <span>Doc ID: {docId}</span>
        <span>Page 1 of 1</span>
      </div>
      <div className="text-[10px]" style={{ color: C.bodyLight }}>
        {universityAddress || universityName}
      </div>
    </div>
  );
}

export function SignatureBlock({
  title = "Authorized Signature",
  name,
  signatureUrl,
}: {
  title?: string;
  name?: string;
  signatureUrl?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center gap-1">
      {signatureUrl && (
        <img
          src={signatureUrl}
          alt={title}
          className="h-10 w-28 object-contain"
        />
      )}
      {name && (
        <div className="text-[13px] italic" style={{ color: C.bodyMuted }}>
          {name}
        </div>
      )}
      <div className="w-40 border-b" style={{ borderColor: C.border }} />
      <div className="text-[12px]" style={{ color: C.bodyLight }}>
        {title}
      </div>
    </div>
  );
}

export function OfficialStamp({
  universityName = "Global Tech University",
}: {
  universityName?: string;
}) {
  const shortName =
    universityName.length > 24
      ? universityName
          .split(" ")
          .map((w) => w[0])
          .join("")
      : universityName;
  return (
    <div className="relative h-24 w-24 flex-shrink-0">
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `2.5px solid ${C.stampColor}` }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 4,
          left: 4,
          right: 4,
          bottom: 4,
          border: `1.5px solid ${C.stampColor}`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 96 96">
        <defs>
          <path
            id="stampCircleTop"
            d="M 48,48 m -32,0 a 32,32 0 1,1 64,0"
          />
          <path
            id="stampCircleBot"
            d="M 48,48 m 32,0 a 32,32 0 1,1 -64,0"
          />
        </defs>
        <text
          fill={C.stampColor}
          style={{ fontSize: "7px", letterSpacing: "1.5px" }}
        >
          <textPath
            href="#stampCircleTop"
            startOffset="50%"
            textAnchor="middle"
          >
            {shortName.toUpperCase()}
          </textPath>
        </text>
        <text
          fill={C.stampColor}
          style={{ fontSize: "6px", letterSpacing: "1px" }}
        >
          <textPath
            href="#stampCircleBot"
            startOffset="50%"
            textAnchor="middle"
          >
            OFFICIAL DOCUMENT
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center" style={{ color: C.stampColor }}>
          <div className="text-[14px]">&#10022;</div>
          <div className="text-[7px] tracking-wide">SEAL</div>
        </div>
      </div>
    </div>
  );
}

export function DocWatermark({ text = "OFFICIAL" }: { text?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 flex -rotate-30 items-center justify-center">
        <span
          className="text-[72px] tracking-[0.3em]"
          style={{ color: C.watermark }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export function FormField({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <div className="mb-0.5 text-[12px]" style={{ color: C.bodyLight }}>
        {label}
      </div>
      <div
        className="rounded px-2 py-1.5 text-[15px]"
        style={{
          color: C.bodyText,
          background: "#f0ece6",
          border: `1px solid ${C.border}`,
        }}
      >
        {value || "\u2014"}
      </div>
    </div>
  );
}

export function TableRow({
  cells,
  isHeader = false,
}: {
  cells: string[];
  isHeader?: boolean;
}) {
  return (
    <tr>
      {cells.map((cell, i) =>
        isHeader ? (
          <th
            key={i}
            className="px-3 py-2 text-left text-[13px]"
            style={{
              color: C.bodyMuted,
              background: "#f0ece6",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            {cell}
          </th>
        ) : (
          <td
            key={i}
            className="px-3 py-2 text-[14px]"
            style={{
              color: C.bodyText,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            {cell}
          </td>
        ),
      )}
    </tr>
  );
}

export { C };
