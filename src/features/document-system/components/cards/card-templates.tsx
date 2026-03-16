import React from "react";
import { QRCodeSVG } from "qrcode.react";
import type { StudentData } from "./card-types";
import {
  HologramOverlay,
  WatermarkPattern,
  MicroPattern,
  ChipIcon,
  BarcodeBlock,
} from "./security-elements";

interface CardProps {
  data: StudentData;
}

function PhotoFrame({
  url,
  size = 80,
  rounded = false,
  border = "2px solid white",
}: {
  url: string;
  size?: number;
  rounded?: boolean;
  border?: string;
}) {
  return (
    <div
      className="overflow-hidden bg-gray-300 flex-shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? "50%" : 6,
        border,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Student" className="w-full h-full object-cover" />
    </div>
  );
}

function UniLogo({
  text,
  color = "#fff",
  size = 32,
  logoUrl,
}: {
  text: string;
  color?: string;
  size?: number;
  logoUrl?: string;
}) {
  if (logoUrl) {
    return (
      <div
        className="flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoUrl} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}`,
        color,
      }}
    >
      <span style={{ fontSize: size * 0.35 }}>{text.charAt(0)}</span>
    </div>
  );
}

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

// ===== 1. MIT Style =====
export function MITCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #c2636e 0%, #b85a65 50%, #a84f5a 100%)",
      }}
    >
      <MicroPattern color="rgba(255,220,220,0.05)" />
      <HologramOverlay color="rgba(255,200,200,0.06)" />
      <WatermarkPattern text="MIT" color="rgba(255,220,220,0.04)" />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-2">
          <UniLogo text="M" color="#f0c4c8" size={36} logoUrl={data.universityLogo} />
          <div>
            <div
              className="text-[18px] tracking-wide"
              style={{ color: "#fce4e6" }}
            >
              {data.universityName}
            </div>
            <div
              className="text-[13px] tracking-widest uppercase"
              style={{ color: "#e8b0b5" }}
            >
              Student Identification Card
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <div className="flex flex-col items-center gap-2">
            <PhotoFrame
              url={data.photoUrl}
              size={88}
              border="3px solid #f0c4c8"
            />
            <div className="text-[12px]" style={{ color: "#e8b0b5" }}>
              ID: {data.studentId}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[22px] mb-1" style={{ color: "#fef0f1" }}>
              {data.fullName}
            </div>
            <div className="text-[15px] mb-0.5" style={{ color: "#f0c4c8" }}>
              {data.faculty}
            </div>
            <div className="text-[14px] mb-2" style={{ color: "#e8b0b5" }}>
              {data.major}
            </div>
            <div
              className="flex gap-4 text-[12px]"
              style={{ color: "#dba0a6" }}
            >
              <span>Issued: {formatDate(data.issueDate)}</span>
              <span>Expires: {formatDate(data.expiryDate)}</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-1">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={52}
              bgColor="transparent"
              fgColor="#f0c4c8"
            />
            <div className="text-[10px]" style={{ color: "#dba0a6" }}>
              Scan to verify
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 2. Harvard Style =====
export function HarvardCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #6b4c3b 0%, #7a5a48 50%, #8d6b56 100%)",
      }}
    >
      <MicroPattern color="rgba(220,190,150,0.05)" />
      <HologramOverlay color="rgba(220,190,150,0.06)" />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-3">
          <UniLogo text="H" color="#dcc8a8" size={40} logoUrl={data.universityLogo} />
          <div>
            <div
              className="text-[18px] tracking-wide"
              style={{ color: "#e8d8c0" }}
            >
              {data.universityName}
            </div>
            <div
              className="text-[12px] tracking-[0.2em] uppercase"
              style={{ color: "#c4a882" }}
            >
              Official Student Card
            </div>
          </div>
        </div>
        <div className="flex gap-5 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={90}
            border="3px solid #dcc8a8"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[22px] mb-1" style={{ color: "#f5ece0" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#dcc8a8" }}>
              {data.faculty}
            </div>
            <div className="text-[14px] mb-2" style={{ color: "#c4a882" }}>
              {data.major}
            </div>
            <div className="text-[12px]" style={{ color: "#b89a74" }}>
              Student No. {data.studentId}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={52}
              bgColor="transparent"
              fgColor="#dcc8a8"
            />
            <div className="flex flex-col items-center gap-0.5 mt-2">
              <div
                className="w-16 border-b"
                style={{ borderColor: "#c4a882" }}
              />
              <div className="text-[10px]" style={{ color: "#b89a74" }}>
                Signature
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-between mt-2 text-[11px]"
          style={{ color: "#b89a74" }}
        >
          <span>
            Valid: {formatDate(data.issueDate)} – {formatDate(data.expiryDate)}
          </span>
          <span>VERITAS</span>
        </div>
      </div>
    </div>
  );
}

// ===== 3. Korean University - Vertical =====
export function KoreanCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[270px] h-[428px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #5c6bc0 0%, #7986cb 40%, #9fa8da 100%)",
      }}
    >
      <MicroPattern color="rgba(200,210,240,0.06)" />
      <HologramOverlay color="rgba(200,210,240,0.08)" />
      <div className="relative z-10 flex flex-col items-center h-full p-5">
        <UniLogo text="K" color="#c5cae9" size={40} logoUrl={data.universityLogo} />
        <div
          className="text-[16px] mt-2 tracking-wider text-center"
          style={{ color: "#e8eaf6" }}
        >
          {data.universityName}
        </div>
        <div
          className="text-[11px] tracking-[0.15em] uppercase mb-4"
          style={{ color: "#c5cae9" }}
        >
          Student ID
        </div>
        <PhotoFrame
          url={data.photoUrl}
          size={100}
          rounded
          border="3px solid #c5cae9"
        />
        <div className="mt-3 text-center">
          <div className="text-[20px]" style={{ color: "#f5f5ff" }}>
            {data.fullName}
          </div>
          <div className="text-[14px] mt-1" style={{ color: "#dde0f2" }}>
            {data.studentId}
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-[14px]" style={{ color: "#c5cae9" }}>
            {data.faculty}
          </div>
          <div className="text-[13px]" style={{ color: "#b0b8d6" }}>
            {data.major}
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center gap-1">
          <QRCodeSVG
            value={`STU:${data.studentId}`}
            size={48}
            bgColor="transparent"
            fgColor="#c5cae9"
          />
          <div className="text-[11px]" style={{ color: "#b0b8d6" }}>
            Valid: {formatDate(data.issueDate)} ~ {formatDate(data.expiryDate)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 4. European University =====
export function EuropeanCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #5b8fbf 0%, #6d9fcb 50%, #80afd6 100%)",
      }}
    >
      <WatermarkPattern text="UNIVERSITAS" color="rgba(200,225,245,0.05)" />
      <MicroPattern color="rgba(200,225,245,0.05)" />
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background:
            "linear-gradient(90deg, #a8cce0, #b8d6e8, #a8cce0)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-3">
          <UniLogo text="E" color="#cce0f0" size={34} logoUrl={data.universityLogo} />
          <div>
            <div className="text-[17px]" style={{ color: "#e8f0f8" }}>
              {data.universityName}
            </div>
            <div
              className="text-[12px] tracking-widest uppercase"
              style={{ color: "#a8cce0" }}
            >
              European Student Card
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {["#7aa8cc", "#a8cce0"].map((c, i) => (
              <div
                key={i}
                className="w-2 h-3 rounded-sm"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={85}
            border="2px solid #b8d6e8"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[21px] mb-1" style={{ color: "#f0f6fb" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#cce0f0" }}>
              {data.faculty}
            </div>
            <div className="text-[14px] mb-2" style={{ color: "#a8cce0" }}>
              {data.major}
            </div>
            <div
              className="flex gap-3 text-[12px]"
              style={{ color: "#94bdd6" }}
            >
              <span>No. {data.studentId}</span>
              <span>
                Valid: {formatDate(data.issueDate)} –{" "}
                {formatDate(data.expiryDate)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-2">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={50}
              bgColor="transparent"
              fgColor="#b8d6e8"
            />
            <div style={{ color: "#a8cce0" }}>
              <BarcodeBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 5. Tech University =====
export function TechCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2d3e50 0%, #34495e 50%, #3d566e 100%)",
      }}
    >
      <MicroPattern color="rgba(120,180,180,0.04)" />
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,190,180,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(100,170,180,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-2">
          <UniLogo text="T" color="#8fbcb8" size={30} logoUrl={data.universityLogo} />
          <div>
            <div
              className="text-[17px] tracking-wider"
              style={{ color: "#b0d4d0" }}
            >
              {data.universityName}
            </div>
            <div
              className="text-[11px] tracking-[0.3em] uppercase font-mono"
              style={{ color: "#7aa8a4" }}
            >
              {/* STUDENT_ACCESS_CARD */}
              {"// STUDENT_ACCESS_CARD"}
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <div className="flex flex-col items-center gap-2">
            <PhotoFrame
              url={data.photoUrl}
              size={85}
              border="2px solid #8fbcb8"
            />
            <div className="text-[12px] font-mono" style={{ color: "#7aa8a4" }}>
              {data.studentId}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[21px] mb-1" style={{ color: "#d0e8e6" }}>
              {data.fullName}
            </div>
            <div className="text-[14px] font-mono" style={{ color: "#8fbcb8" }}>
              <span style={{ color: "#7aa8a4" }}>faculty:</span> {data.faculty}
            </div>
            <div className="text-[13px] font-mono" style={{ color: "#7aa8a4" }}>
              <span style={{ color: "#6a9894" }}>major:</span> {data.major}
            </div>
            <div
              className="mt-2 text-[12px] font-mono"
              style={{ color: "#6a9894" }}
            >
              valid: {formatDate(data.issueDate)} →{" "}
              {formatDate(data.expiryDate)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={54}
              bgColor="transparent"
              fgColor="#8fbcb8"
            />
          </div>
        </div>
        <div
          className="mt-1 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, #8fbcb8, transparent)",
          }}
        />
      </div>
    </div>
  );
}

// ===== 6. Minimal Modern =====
export function MinimalCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f0eb, #ede6df, #e8e0d8)",
      }}
    >
      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div
              className="text-[18px] tracking-wide"
              style={{ color: "#6b5e52" }}
            >
              {data.universityName}
            </div>
            <div
              className="text-[12px] tracking-[0.15em] uppercase"
              style={{ color: "#a0917f" }}
            >
              Student Card
            </div>
          </div>
          <UniLogo text="U" color="#a0917f" size={28} logoUrl={data.universityLogo} />
        </div>
        <div className="flex gap-5 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={80}
            rounded
            border="2px solid #cec3b6"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[22px] mb-0.5" style={{ color: "#5a4e43" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#8a7c6e" }}>
              {data.faculty} · {data.major}
            </div>
            <div className="text-[14px] mt-1" style={{ color: "#a0917f" }}>
              ID: {data.studentId}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={48}
              bgColor="transparent"
              fgColor="#8a7c6e"
            />
          </div>
        </div>
        <div
          className="flex justify-between text-[11px] mt-3 pt-2 border-t"
          style={{ color: "#a0917f", borderColor: "#d6ccc0" }}
        >
          <span>
            {formatDate(data.issueDate)} – {formatDate(data.expiryDate)}
          </span>
          <span>Property of {data.universityName}</span>
        </div>
      </div>
    </div>
  );
}

// ===== 7. Colorful Campus =====
export function ColorfulCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #e8a87c, #d4896a, #c07a60)",
      }}
    >
      <WatermarkPattern text="CAMPUS" color="rgba(255,230,210,0.06)" />
      <HologramOverlay color="rgba(255,220,200,0.08)" />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-2">
          <UniLogo text="C" color="#f5ddd0" size={34} logoUrl={data.universityLogo} />
          <div>
            <div className="text-[18px]" style={{ color: "#fef0e8" }}>
              {data.universityName}
            </div>
            <div
              className="text-[12px] tracking-widest uppercase"
              style={{ color: "#f0c8b0" }}
            >
              Campus Life Card
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={88}
            rounded
            border="3px solid #f5ddd0"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[22px] mb-1" style={{ color: "#fef5f0" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#f5ddd0" }}>
              {data.faculty}
            </div>
            <div className="text-[14px] mb-2" style={{ color: "#e8c4ae" }}>
              {data.major}
            </div>
            <div
              className="inline-flex rounded-full px-3 py-0.5 text-[13px] w-fit"
              style={{
                background: "rgba(255,240,230,0.25)",
                color: "#f5ddd0",
              }}
            >
              {data.studentId}
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-1">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={50}
              bgColor="transparent"
              fgColor="#f5ddd0"
            />
            <div className="text-[11px]" style={{ color: "#e8c4ae" }}>
              {formatDate(data.expiryDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 8. Dark Mode =====
export function DarkModeCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2c3e50, #34495e, #3d566e)",
      }}
    >
      <MicroPattern color="rgba(160,180,200,0.04)" />
      <HologramOverlay color="rgba(160,180,200,0.05)" />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-2">
          <UniLogo text="D" color="#8ea8c0" size={32} logoUrl={data.universityLogo} />
          <div>
            <div className="text-[17px]" style={{ color: "#c0d0de" }}>
              {data.universityName}
            </div>
            <div
              className="text-[12px] tracking-widest uppercase"
              style={{ color: "#7a94aa" }}
            >
              Student Identity
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={85}
            border="2px solid #8ea8c0"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[21px] mb-1" style={{ color: "#d8e2ec" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#a0b4c6" }}>
              {data.faculty}
            </div>
            <div className="text-[14px] mb-2" style={{ color: "#8ea8c0" }}>
              {data.major}
            </div>
            <div className="text-[13px]" style={{ color: "#7a94aa" }}>
              #{data.studentId}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between py-1">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={50}
              bgColor="transparent"
              fgColor="#8ea8c0"
            />
            <div className="text-[11px]" style={{ color: "#7a94aa" }}>
              {formatDate(data.issueDate)} – {formatDate(data.expiryDate)}
            </div>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div
            className="flex-1 h-px"
            style={{
              background: "linear-gradient(90deg, #7a94aa, transparent)",
            }}
          />
          <div className="text-[10px]" style={{ color: "#6a8498" }}>
            SECURED
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 9. Plastic Card =====
export function PlasticCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden shadow-lg"
      style={{
        background:
          "linear-gradient(160deg, #d8d0e8, #cec6de, #c4bcd4)",
      }}
    >
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
        }}
      />
      <MicroPattern color="rgba(140,120,170,0.05)" />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-3 mb-2">
          <UniLogo text="P" color="#8878a0" size={32} logoUrl={data.universityLogo} />
          <div>
            <div className="text-[17px]" style={{ color: "#5a4d6e" }}>
              {data.universityName}
            </div>
            <div
              className="text-[12px] tracking-widest uppercase"
              style={{ color: "#9888b0" }}
            >
              Student ID Card
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#c0b0d8" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#b0a0cc" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#a090c0" }}
            />
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={88}
            border="2px solid #b0a0cc"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[22px] mb-1" style={{ color: "#4a3d5e" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#7868a0" }}>
              {data.faculty}
            </div>
            <div className="text-[14px] mb-2" style={{ color: "#9888b0" }}>
              {data.major}
            </div>
            <div className="text-[13px]" style={{ color: "#a898b8" }}>
              ID: {data.studentId}
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-1">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={48}
              bgColor="transparent"
              fgColor="#8878a0"
            />
            <div style={{ color: "#a898b8" }}>
              <BarcodeBlock />
            </div>
          </div>
        </div>
        <div
          className="mt-2 text-[11px] flex justify-between"
          style={{ color: "#a898b8" }}
        >
          <span>Issued: {formatDate(data.issueDate)}</span>
          <span>Expires: {formatDate(data.expiryDate)}</span>
        </div>
      </div>
    </div>
  );
}

// ===== 10. Smart Card =====
export function SmartCardTemplate({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #4a4035, #584d40, #665a4c)",
      }}
    >
      <MicroPattern color="rgba(200,180,140,0.04)" />
      <HologramOverlay color="rgba(200,180,140,0.06)" />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <UniLogo text="S" color="#c8b48c" size={30} logoUrl={data.universityLogo} />
            <div>
              <div className="text-[17px]" style={{ color: "#ddd0b8" }}>
                {data.universityName}
              </div>
              <div
                className="text-[11px] tracking-[0.2em] uppercase"
                style={{ color: "#a89870" }}
              >
                Smart Student Card
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#b8a878" }}
            />
            <span className="text-[11px]" style={{ color: "#b8a878" }}>
              ACTIVE
            </span>
          </div>
        </div>
        <div className="flex gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <PhotoFrame
              url={data.photoUrl}
              size={80}
              border="2px solid #c8b48c"
            />
            <ChipIcon />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-[21px] mb-1" style={{ color: "#ece0cc" }}>
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#c8b48c" }}>
              {data.faculty}
            </div>
            <div className="text-[14px]" style={{ color: "#b0a070" }}>
              {data.major}
            </div>
            <div className="mt-2 flex gap-2">
              <span
                className="text-[12px] px-2 py-0.5 rounded"
                style={{
                  background: "rgba(200,180,140,0.15)",
                  color: "#c8b48c",
                }}
              >
                {data.studentId}
              </span>
              <span
                className="text-[12px] px-2 py-0.5 rounded"
                style={{
                  background: "rgba(200,180,140,0.10)",
                  color: "#b0a070",
                }}
              >
                NFC
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={52}
              bgColor="transparent"
              fgColor="#c8b48c"
            />
            <div className="text-[11px]" style={{ color: "#a89870" }}>
              {formatDate(data.expiryDate)}
            </div>
          </div>
        </div>
        <div
          className="mt-1 h-px"
          style={{
            background:
              "linear-gradient(90deg, #c8b48c33, transparent, #c8b48c33)",
          }}
        />
      </div>
    </div>
  );
}

// ===== 11. Medical School - Vertical =====
export function MedicalCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[270px] h-[428px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #5a8a78 0%, #6b9a88 50%, #7caa98 100%)",
      }}
    >
      <MicroPattern color="rgba(180,220,200,0.05)" />
      <WatermarkPattern text="MEDICAL" color="rgba(180,220,200,0.04)" />
      <div className="relative z-10 flex flex-col items-center h-full p-5">
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 2h4v6h6v4h-6v6H8v-6H2V8h6V2z"
              fill="#c0dcd0"
            />
          </svg>
          <div className="text-[15px]" style={{ color: "#dceee4" }}>
            {data.universityName}
          </div>
        </div>
        <div
          className="text-[12px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "#a8ccb8" }}
        >
          Medical Student ID
        </div>
        <PhotoFrame
          url={data.photoUrl}
          size={100}
          border="3px solid #b0d4c0"
        />
        <div className="mt-3 text-center">
          <div className="text-[20px]" style={{ color: "#f0f8f4" }}>
            {data.fullName}
          </div>
          <div className="text-[14px] mt-1" style={{ color: "#c0dcd0" }}>
            {data.studentId}
          </div>
        </div>
        <div className="mt-2 text-center">
          <div className="text-[14px]" style={{ color: "#a8ccb8" }}>
            {data.faculty}
          </div>
          <div className="text-[13px]" style={{ color: "#98c0ac" }}>
            {data.major}
          </div>
        </div>
        <div className="mt-auto w-full flex flex-col items-center gap-2">
          <QRCodeSVG
            value={`STU:${data.studentId}`}
            size={46}
            bgColor="transparent"
            fgColor="#b0d4c0"
          />
          <div
            className="w-20 border-b"
            style={{ borderColor: "#a8ccb8" }}
          />
          <div className="text-[10px]" style={{ color: "#98c0ac" }}>
            Authorized Signature
          </div>
          <div className="text-[11px]" style={{ color: "#a8ccb8" }}>
            {formatDate(data.issueDate)} ~ {formatDate(data.expiryDate)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 12. Art School =====
export function ArtSchoolCard({ data }: CardProps) {
  return (
    <div
      className="relative w-[428px] h-[270px] rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #8e6a8a, #a07c9c, #b08eae)",
      }}
    >
      <HologramOverlay color="rgba(220,200,220,0.06)" />
      <div
        className="absolute top-4 right-4 w-24 h-24 rounded-full border-2"
        style={{ borderColor: "rgba(220,200,220,0.12)" }}
      />
      <div
        className="absolute bottom-8 left-8 w-16 h-16 border rotate-45"
        style={{ borderColor: "rgba(220,200,220,0.08)" }}
      />
      <div className="relative z-10 flex flex-col h-full p-5">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="text-[20px] tracking-tight"
            style={{ color: "#e8d8e6" }}
          >
            {data.universityName}
          </div>
        </div>
        <div
          className="text-[12px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "#c8b0c4" }}
        >
          School of Art & Design · Student
        </div>
        <div className="flex gap-4 flex-1">
          <PhotoFrame
            url={data.photoUrl}
            size={90}
            rounded
            border="3px solid #d0bece"
          />
          <div className="flex-1 flex flex-col justify-center">
            <div
              className="text-[22px] mb-1 italic"
              style={{ color: "#f4eaf2" }}
            >
              {data.fullName}
            </div>
            <div className="text-[15px]" style={{ color: "#d8c4d4" }}>
              {data.faculty}
            </div>
            <div className="text-[14px]" style={{ color: "#c8b0c4" }}>
              {data.major}
            </div>
          </div>
          <div className="flex flex-col items-center justify-end gap-2">
            <QRCodeSVG
              value={`STU:${data.studentId}`}
              size={48}
              bgColor="transparent"
              fgColor="#d0bece"
            />
            <div className="text-[12px]" style={{ color: "#c8b0c4" }}>
              {data.studentId}
            </div>
          </div>
        </div>
        <div className="mt-2 text-[11px]" style={{ color: "#b8a0b4" }}>
          {formatDate(data.issueDate)} – {formatDate(data.expiryDate)} · Create.
          Inspire. Innovate.
        </div>
      </div>
    </div>
  );
}

export const templateComponents: Record<string, React.FC<CardProps>> = {
  mit: MITCard,
  harvard: HarvardCard,
  korean: KoreanCard,
  european: EuropeanCard,
  tech: TechCard,
  minimal: MinimalCard,
  colorful: ColorfulCard,
  darkmode: DarkModeCard,
  plastic: PlasticCard,
  smartcard: SmartCardTemplate,
  medical: MedicalCard,
  art: ArtSchoolCard,
};
