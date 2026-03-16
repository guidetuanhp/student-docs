"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface University {
  _id: string;
  name: string;
  faculties: string[];
  address: string;
  logoUrl: string;
  emailSuffix: string;
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [form, setForm] = useState({
    name: "",
    faculties: "",
    address: "",
    logoUrl: "",
    emailSuffix: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/universities");
      if (res.ok) {
        setUniversities(await res.json());
      }
    } catch {
      toast.error("Failed to load universities.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function resetForm() {
    setForm({ name: "", faculties: "", address: "", logoUrl: "", emailSuffix: "" });
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(u: University) {
    setForm({
      name: u.name,
      faculties: u.faculties.join(", "),
      address: u.address || "",
      logoUrl: u.logoUrl || "",
      emailSuffix: u.emailSuffix || "",
    });
    setEditId(u._id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      name: form.name,
      faculties: form.faculties
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      address: form.address,
      logoUrl: form.logoUrl,
      emailSuffix: form.emailSuffix,
    };

    try {
      if (editId) {
        const res = await fetch(`/api/admin/universities/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          toast.success("University updated.");
          resetForm();
          fetchData();
        } else {
          const data = await res.json();
          toast.error(data.error || "Update failed.");
        }
      } else {
        const res = await fetch("/api/admin/universities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          toast.success("University created.");
          resetForm();
          fetchData();
        } else {
          const data = await res.json();
          toast.error(data.error || "Create failed.");
        }
      }
    } catch {
      toast.error("Network error.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this university?")) return;
    try {
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("University deleted.");
        fetchData();
      } else {
        toast.error("Delete failed.");
      }
    } catch {
      toast.error("Network error.");
    }
  }

  const totalPages = Math.max(1, Math.ceil(universities.length / perPage));
  const paginated = useMemo(
    () => universities.slice((page - 1) * perPage, page * perPage),
    [universities, page]
  );

  if (loading)
    return <p className="text-gray-500">Loading universities...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Universities ({universities.length})</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={16} />
          Add University
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={resetForm}>
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editId ? "Edit University" : "New University"}
              </h3>
              <button type="button" onClick={resetForm} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5">
              <div className="grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Faculties</label>
                  <input
                    placeholder="e.g. Computer Science, Engineering, Business"
                    value={form.faculties}
                    onChange={(e) => setForm({ ...form, faculties: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                  <p className="mt-1 text-xs text-gray-400">Comma separated</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Logo URL</label>
                  <input
                    value={form.logoUrl}
                    onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email Suffix</label>
                  <input
                    placeholder="e.g. fpt.edu.vn"
                    value={form.emailSuffix}
                    onChange={(e) => setForm({ ...form, emailSuffix: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button type="button" onClick={resetForm} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Faculties
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Address
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Email Suffix
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr key={u._id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {u.name}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {u.faculties?.join(", ") || "-"}
                </td>
                <td className="px-4 py-3 text-gray-600">{u.address || "-"}</td>
                <td className="px-4 py-3 text-gray-600">{u.emailSuffix || "-"}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(u)}
                    className="mr-2 rounded p-1 text-gray-500 hover:bg-gray-100"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No universities yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, universities.length)} of {universities.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`min-w-[32px] rounded-lg border px-2 py-1 text-sm font-medium ${
                  n === page
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
