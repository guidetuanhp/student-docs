"use client";

import { Camera } from "lucide-react";

interface PhotoDisplayProps {
  photoUrl: string;
  label?: string;
}

export function PhotoDisplay({ photoUrl, label = "Student Photo" }: PhotoDisplayProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-gray-500">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Student photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Camera size={24} className="text-gray-300" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[12px] text-gray-500">
            Randomly assigned on session creation.
          </p>
          <p className="text-[11px] text-gray-400">
            Use Re-generate to get a new photo.
          </p>
        </div>
      </div>
    </div>
  );
}
