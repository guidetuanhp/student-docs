"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Sidebar from "./components/shell/Sidebar";
import TopBar from "./components/shell/TopBar";
import type { Mode } from "./components/shell/ModeSwitcher";
import type { Tab } from "./components/shell/TabSwitcher";
import {
  defaultSelectedCard,
  defaultSelectedDoc,
  defaultSelectedPortal,
  COMMON_SYNC_FIELDS,
} from "@/lib/defaults";
import {
  defaultStudentData,
  cardTemplates,
} from "./components/cards/card-types";
import { templateComponents } from "./components/cards/card-templates";
import { TemplateGallery } from "./components/cards/TemplateGallery";
import EditorPanel from "./components/cards/EditorPanel";
import {
  defaultAdmissionData,
  docTemplates,
} from "./components/docs/doc-types";
import { docTemplateComponents } from "./components/docs/doc-templates";
import { DocTemplateGallery } from "./components/docs/DocTemplateGallery";
import DocEditorPanel from "./components/docs/DocEditorPanel";
import {
  defaultPortalData,
  portalTemplates,
} from "./components/portals/portal-types";
import { portalTemplateComponents } from "./components/portals/portal-templates";
import { PortalTemplateGallery } from "./components/portals/PortalTemplateGallery";
import PortalEditorPanel from "./components/portals/PortalEditorPanel";
import { QuickSwitcher } from "./components/shared/QuickSwitcher";
import { TemplateErrorBoundary } from "./components/shared/TemplateErrorBoundary";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import {
  GeneratedDataProvider,
  type GeneratedData,
} from "./GeneratedDataContext";

export default function DocumentSystemApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState<Mode>("cards");
  const [tab, setTab] = useState<Tab>("templates");
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialLoadDone = useRef(false);

  const [selectedCard, setSelectedCard] = useState(defaultSelectedCard);
  const [selectedDoc, setSelectedDoc] = useState(defaultSelectedDoc);
  const [selectedPortal, setSelectedPortal] = useState(defaultSelectedPortal);

  const [studentData, setStudentData] = useState(defaultStudentData);
  const [admissionData, setAdmissionData] = useState(defaultAdmissionData);
  const [portalData, setPortalData] = useState(defaultPortalData);
  const [generatedData, setGeneratedData] = useState<GeneratedData>({
    courses: [],
    fees: [],
    announcements: [],
    transcript: null,
    signatureUrl: "",
  });

  // Apply session data from API response to local state
  const applySessionData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      if (data.studentData) setStudentData(data.studentData);
      if (data.admissionData) setAdmissionData(data.admissionData);
      if (data.portalData) setPortalData(data.portalData);
      if (data.selectedCard) setSelectedCard(data.selectedCard);
      if (data.selectedDoc) setSelectedDoc(data.selectedDoc);
      if (data.selectedPortal) setSelectedPortal(data.selectedPortal);
      if (data.mode) setMode(data.mode as Mode);
      setGeneratedData({
        courses: data.generatedCourses || [],
        fees: data.generatedFees || [],
        announcements: data.generatedAnnouncements || [],
        transcript: data.generatedTranscript || null,
        signatureUrl: data.signatureUrl || "",
      });
    },
    []
  );

  // Load or create session on mount
  useEffect(() => {
    async function initSession() {
      try {
        const storedId = localStorage.getItem("sessionId");
        if (storedId) {
          const res = await fetch(`/api/session?sessionId=${storedId}`);
          if (res.ok) {
            const data = await res.json();
            sessionIdRef.current = storedId;
            applySessionData(data);
            setLoading(false);
            initialLoadDone.current = true;
            return;
          }
        }
        // Create new session
        const res = await fetch("/api/session", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          sessionIdRef.current = data.sessionId;
          localStorage.setItem("sessionId", data.sessionId);
          applySessionData(data);
        } else {
          toast.error("Failed to create session.");
        }
      } catch {
        toast.error("Failed to load session.");
      } finally {
        setLoading(false);
        initialLoadDone.current = true;
      }
    }
    initSession();
  }, [applySessionData]);

  // Debounced auto-save on state changes
  useEffect(() => {
    if (!initialLoadDone.current || !sessionIdRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        await fetch("/api/session", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            studentData,
            admissionData,
            portalData,
            selectedCard,
            selectedDoc,
            selectedPortal,
            mode,
          }),
        });
      } catch {
        toast.error("Failed to save. Please check your connection.");
      }
    }, 500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [studentData, admissionData, portalData, selectedCard, selectedDoc, selectedPortal, mode]);

  const selectedTemplate =
    mode === "cards"
      ? selectedCard
      : mode === "docs"
        ? selectedDoc
        : selectedPortal;

  const handleSyncData = useCallback(() => {
    const source =
      mode === "cards"
        ? studentData
        : mode === "docs"
          ? admissionData
          : portalData;
    const patch: Record<string, string> = {};
    for (const field of COMMON_SYNC_FIELDS) {
      patch[field] = (source as unknown as Record<string, string>)[field] ?? "";
    }
    setStudentData((prev) => ({ ...prev, ...patch }));
    setAdmissionData((prev) => ({ ...prev, ...patch }));
    setPortalData((prev) => ({ ...prev, ...patch }));
    toast.success("Student data synced across all modules");
  }, [mode, studentData, admissionData, portalData]);

  const handleRegenerate = useCallback(async () => {
    if (!sessionIdRef.current || regenerating) return;
    setRegenerating(true);
    try {
      const res = await fetch("/api/session/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current }),
      });
      if (res.ok) {
        const data = await res.json();
        applySessionData(data);
        toast.success("Session data regenerated");
      } else {
        toast.error("Failed to regenerate data.");
      }
    } catch {
      toast.error("Failed to regenerate data.");
    } finally {
      setRegenerating(false);
    }
  }, [regenerating, applySessionData]);

  // Transparent 1x1 PNG as fallback when image conversion fails
  const TRANSPARENT_PIXEL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIABQABbp6N2QAAAABJRU5ErkJggg==";

  // Convert a single image src to base64 data URL
  const imgToBase64 = useCallback(async (src: string): Promise<string> => {
    if (!src || src.startsWith("data:")) return src;
    try {
      // Check if same origin
      const isSameOrigin = src.startsWith("/") || src.startsWith(window.location.origin);
      if (isSameOrigin) {
        const res = await fetch(src);
        if (!res.ok) return TRANSPARENT_PIXEL;
        const blob = await res.blob();
        return await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string || TRANSPARENT_PIXEL);
          reader.onerror = () => resolve(TRANSPARENT_PIXEL);
          reader.readAsDataURL(blob);
        });
      }
      // External URL — always use proxy to avoid CORS issues
      const res = await fetch(`/api/image-proxy?url=${encodeURIComponent(src)}`);
      if (res.ok) {
        const { dataUrl } = await res.json();
        if (dataUrl) return dataUrl;
      }
    } catch (e) {
      console.warn("Failed to convert image to base64:", src, e);
    }
    // NEVER return the original external URL — toPng can't handle CORS
    return TRANSPARENT_PIXEL;
  }, []);

  const handleExportPng = useCallback(async () => {
    if (!previewRef.current || exporting) return;
    setExporting(true);
    const modePrefix = mode === "cards" ? "card" : mode === "docs" ? "doc" : "portal";
    const templateId = mode === "cards" ? selectedCard : mode === "docs" ? selectedDoc : selectedPortal;
    const sid = studentData.studentId || "unknown";
    const filename = `${modePrefix}-${templateId}-${sid}.png`;

    // Pre-convert all images to base64 to avoid CORS issues
    const imgs = previewRef.current.querySelectorAll("img");
    const originalSrcs: string[] = [];
    try {
      // Convert all images to base64 first
      for (const img of Array.from(imgs)) {
        originalSrcs.push(img.src);
        if (img.src && !img.src.startsWith("data:")) {
          const base64Src = await imgToBase64(img.src);
          img.src = base64Src;
        }
      }

      // Wait for all images to finish loading after src replacement
      await Promise.all(
        Array.from(imgs).map((img) =>
          img.complete
            ? Promise.resolve()
            : img.decode().catch(() => {})
        )
      );

      // Small delay to ensure browser has rendered the new images
      await new Promise((r) => setTimeout(r, 100));

      const dataUrl = await toPng(previewRef.current, {
        pixelRatio: 3,
        skipFonts: true,
      });
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
      toast.success(`Exported successfully as ${filename}`);
    } catch (err) {
      console.error("Export failed:", err);
      toast.error("Export failed. Please try again.");
    } finally {
      // Restore original src attributes
      const currentImgs = previewRef.current?.querySelectorAll("img");
      if (currentImgs) {
        Array.from(currentImgs).forEach((img, i) => {
          if (originalSrcs[i]) img.src = originalSrcs[i];
        });
      }
      setExporting(false);
    }
  }, [mode, selectedCard, selectedDoc, selectedPortal, studentData.studentId, exporting, imgToBase64]);

  // Render sidebar content based on mode and tab
  const renderSidebarContent = () => {
    if (tab === "edit") {
      if (mode === "cards") {
        return (
          <EditorPanel data={studentData} onChange={setStudentData} />
        );
      }
      if (mode === "docs") {
        return (
          <DocEditorPanel data={admissionData} onChange={setAdmissionData} />
        );
      }
      return (
        <PortalEditorPanel data={portalData} onChange={setPortalData} />
      );
    }

    if (mode === "cards") {
      return (
        <TemplateGallery
          selectedId={selectedCard}
          onSelect={setSelectedCard}
        />
      );
    }
    if (mode === "docs") {
      return (
        <DocTemplateGallery
          selectedId={selectedDoc}
          onSelect={setSelectedDoc}
        />
      );
    }
    return (
      <PortalTemplateGallery
        selectedId={selectedPortal}
        onSelect={setSelectedPortal}
      />
    );
  };

  // Render canvas preview
  const renderPreview = () => {
    if (mode === "cards") {
      const CardComponent = templateComponents[selectedCard];
      if (CardComponent) return <CardComponent data={studentData} />;
    }
    if (mode === "docs") {
      const DocComponent = docTemplateComponents[selectedDoc];
      if (DocComponent) return <DocComponent data={admissionData} />;
    }
    if (mode === "portals") {
      const PortalComponent = portalTemplateComponents[selectedPortal];
      if (PortalComponent) return <PortalComponent data={portalData} />;
    }
    return <p className="text-[14px] text-gray-400">No template selected.</p>;
  };

  // Get quick switcher templates for current mode
  const quickSwitcherTemplates =
    mode === "cards"
      ? cardTemplates
      : mode === "docs"
        ? docTemplates
        : portalTemplates;
  const quickSwitcherSelected =
    mode === "cards"
      ? selectedCard
      : mode === "docs"
        ? selectedDoc
        : selectedPortal;
  const quickSwitcherOnSelect =
    mode === "cards"
      ? setSelectedCard
      : mode === "docs"
        ? setSelectedDoc
        : setSelectedPortal;

  // Canvas dimensions
  const isMobilePortal =
    mode === "portals" && selectedPortal === "mobile-first";
  const canvasWidth =
    mode === "cards" ? undefined : mode === "docs" ? 595 : isMobilePortal ? 390 : 960;
  const canvasMinHeight =
    mode === "cards" ? undefined : mode === "docs" ? 842 : isMobilePortal ? 800 : 700;

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <p className="text-[14px] text-gray-500">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        mode={mode}
        onModeChange={setMode}
        tab={tab}
        onTabChange={setTab}
      >
        {renderSidebarContent()}
      </Sidebar>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar
          mode={mode}
          selectedTemplate={selectedTemplate}
          onSyncData={handleSyncData}
          onRegenerate={handleRegenerate}
          onExportPng={handleExportPng}
          exporting={exporting}
        />

        {/* Canvas area */}
        <div className="flex flex-1 items-start justify-center overflow-auto p-8">
          <div className="flex flex-col items-center gap-4">
            {/* Preview container */}
            <div
              ref={previewRef}
              className="rounded-lg bg-white"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))",
                ...(canvasWidth ? { width: canvasWidth } : {}),
                ...(canvasMinHeight ? { minHeight: canvasMinHeight } : {}),
              }}
            >
              <GeneratedDataProvider value={generatedData}>
                <TemplateErrorBoundary>
                  {renderPreview()}
                </TemplateErrorBoundary>
              </GeneratedDataProvider>
            </div>

            {/* Quick switcher */}
            <QuickSwitcher
              templates={quickSwitcherTemplates}
              selectedId={quickSwitcherSelected}
              onSelect={quickSwitcherOnSelect}
            />

            {/* Dimensions text */}
            <p className="text-[12px] text-gray-400">
              {mode === "cards"
                ? "85.6mm x 54mm -- 428 x 270px"
                : mode === "docs"
                  ? "A4 Paper -- 595 x 842px -- Print-ready"
                  : isMobilePortal
                    ? "390px -- Mobile First"
                    : "960 x 640px -- Web Portal"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
