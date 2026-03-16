import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy external images to bypass CORS restrictions.
 * Used by html-to-image export to fetch cross-origin images.
 *
 * GET /api/image-proxy?url=<encoded_url>
 * Returns the image as base64 data URL.
 */

// Transparent 1x1 PNG — used as fallback when fetch fails
const TRANSPARENT_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIABQABbp6N2QAAAABJRU5ErkJggg==";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    // Abort after 10 seconds to avoid hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/*,*/*;q=0.8",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Image proxy: failed to fetch ${url} — status ${response.status}`);
      // Return fallback instead of error so export doesn't crash
      return NextResponse.json({ dataUrl: TRANSPARENT_PIXEL });
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ dataUrl });
  } catch (error) {
    console.error("Image proxy error for URL:", url, error);
    // Return fallback instead of error so export doesn't crash
    return NextResponse.json({ dataUrl: TRANSPARENT_PIXEL });
  }
}
