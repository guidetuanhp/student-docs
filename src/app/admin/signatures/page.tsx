"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SigFile {
  filename: string;
  url: string;
  size: number;
}

export default function SignaturesPage() {
  const [signatures, setSignatures] = useState<SigFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchSignatures = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/signatures");
      if (res.ok) setSignatures(await res.json());
    } catch {
      toast.error("Failed to load signatures.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSignatures();
  }, [fetchSignatures]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/signatures", { method: "POST", body: fd });
      if (res.ok) {
        toast.success("Signature uploaded.");
        fetchSignatures();
      } else {
        const data = await res.json();
        toast.error(data.error || "Upload failed.");
      }
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm(`Delete ${filename}?`)) return;
    try {
      const res = await fetch(`/api/admin/signatures/${filename}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Signature deleted.");
        fetchSignatures();
      } else {
        toast.error("Delete failed.");
      }
    } catch {
      toast.error("Delete failed.");
    }
  }

  if (loading) return <p className="text-gray-500">Loading signatures...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Signatures ({signatures.length})
        </h2>
        <label
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <Upload size={16} />
          {uploading ? "Uploading..." : "Upload Signature"}
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {signatures.map((s) => (
          <div
            key={s.filename}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.url}
              alt={s.filename}
              className="aspect-[3/1] w-full object-contain bg-gray-50 p-2"
            />
            <div className="px-2 py-1.5">
              <p className="truncate text-[11px] text-gray-600">{s.filename}</p>
            </div>
            <button
              onClick={() => handleDelete(s.filename)}
              className="absolute right-1 top-1 rounded bg-white/80 p-1 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>
        ))}
        {signatures.length === 0 && (
          <p className="col-span-full py-8 text-center text-gray-400">
            No signatures uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
