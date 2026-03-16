"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Upload, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";

interface PhotoFile {
  filename: string;
  url: string;
  size: number;
}

const PAGE_SIZE = 60;

export default function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchPhotos = useCallback(async (p: number, q: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) });
      if (q) params.set("search", q);
      const res = await fetch(`/api/admin/photos?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.files);
        setTotal(data.total);
      }
    } catch {
      toast.error("Failed to load photos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos(page, search);
  }, [fetchPhotos, page, search]);

  function handleSearchChange(value: string) {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setPage(1);
      setSearch(value);
    }, 300);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/photos", { method: "POST", body: fd });
      if (res.ok) {
        toast.success("Photo uploaded.");
        fetchPhotos(page, search);
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
      const res = await fetch(`/api/admin/photos/${filename}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Photo deleted.");
        fetchPhotos(page, search);
      } else {
        toast.error("Delete failed.");
      }
    } catch {
      toast.error("Delete failed.");
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Student Photos ({total})
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="rounded-lg border border-gray-300 py-1.5 pl-8 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <label
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload Photo"}
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading photos...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {photos.map((p) => (
              <div
                key={p.filename}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.url}
                  alt={p.filename}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <div className="px-2 py-1.5">
                  <p className="truncate text-[11px] text-gray-600">{p.filename}</p>
                </div>
                <button
                  onClick={() => handleDelete(p.filename)}
                  className="absolute right-1 top-1 rounded bg-white/80 p-1 opacity-0 shadow transition-opacity group-hover:opacity-100"
                >
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            ))}
            {photos.length === 0 && (
              <p className="col-span-full py-8 text-center text-gray-400">
                {search ? "No photos match your search." : "No photos uploaded yet."}
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <span className="text-sm text-gray-600">
                Page {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
