"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

interface University {
  _id: string;
  name: string;
  logoUrl?: string;
  emailSuffix?: string;
  address?: string;
  faculties?: string[];
}

interface UniversitySelectProps {
  value: string;
  onChange: (name: string, logo: string, address: string) => void;
}

export function UniversitySelect({ value, onChange }: UniversitySelectProps) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/universities")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUniversities(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = universities.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      <label className="text-[12px] font-medium text-gray-500">
        University Name
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value, "", "");
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Select or type university name"
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-8 text-[13px] text-gray-900 outline-none transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <ChevronDown size={14} />
        </button>

        {isOpen && filtered.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="sticky top-0 border-b border-gray-100 bg-white px-3 py-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Search size={12} />
                <span className="text-[11px]">
                  {filtered.length} universities
                </span>
              </div>
            </div>
            {filtered.map((u) => (
              <button
                key={u._id}
                type="button"
                onClick={() => {
                  onChange(u.name, u.logoUrl || "", u.address || "");
                  setIsOpen(false);
                  setSearch("");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-gray-700 transition-colors hover:bg-blue-50"
              >
                {u.logoUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={u.logoUrl} alt="" className="h-5 w-5 rounded-full object-cover flex-shrink-0" />
                )}
                {u.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
