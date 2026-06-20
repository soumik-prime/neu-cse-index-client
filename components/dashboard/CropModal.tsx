import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconZoomIn,
  IconZoomOut,
  IconRotate2,
  IconX,
} from "@tabler/icons-react";

// ============================================================
// 📐 OUTPUT SIZE — change these two numbers to control crop shape
// ============================================================
// These control the resolution of the SAVED file. The preview box
// below automatically matches this aspect ratio (just scaled down
// to fit the modal), and the circular guide always inscribes itself
// inside that box.
//
//   • Square photo (default)  → keep OUTPUT_WIDTH === OUTPUT_HEIGHT
//   • Portrait, e.g. 4:5      → OUTPUT_WIDTH = 1600, OUTPUT_HEIGHT = 2000
//   • Landscape, e.g. 16:9    → OUTPUT_WIDTH = 1920, OUTPUT_HEIGHT = 1080
const OUTPUT_WIDTH = 1600;
const OUTPUT_HEIGHT = 1600;

// How hard we push JPEG quality to land close to this size.
const TARGET_FILE_SIZE_BYTES = 2 * 1024 * 1024; // ~2MB
// ============================================================

const ASPECT = OUTPUT_WIDTH / OUTPUT_HEIGHT;
const PREVIEW_MAX = 280; // longer side of the preview box, px
const DISPLAY_W = ASPECT >= 1 ? PREVIEW_MAX : Math.round(PREVIEW_MAX * ASPECT);
const DISPLAY_H = ASPECT >= 1 ? Math.round(PREVIEW_MAX / ASPECT) : PREVIEW_MAX;

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

function dataUrlBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const padding = (base64.match(/=+$/)?.[0] ?? "").length;
  return Math.floor((base64.length * 3) / 4) - padding;
}

// Largest ASPECT-shaped window, at the given zoom/offset, that fits
// inside the source image. Used identically by the preview canvas
// and the final export so what you see is exactly what you get.
function getCropRect(
  img: HTMLImageElement,
  zoom: number,
  offset: { x: number; y: number },
) {
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  let baseW: number, baseH: number;
  if (W / H > ASPECT) {
    baseH = H;
    baseW = H * ASPECT;
  } else {
    baseW = W;
    baseH = W / ASPECT;
  }
  const sw = baseW / zoom;
  const sh = baseH / zoom;
  const sx = (W - sw) / 2 + offset.x;
  const sy = (H - sh) / 2 + offset.y;
  return { sx, sy, sw, sh };
}

export default function CropModal({
  src,
  onSave,
  onClose,
}: {
  src: string;
  onSave: (d: string) => void;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const imgRef = useRef(new Image());

  const clampOffset = useCallback(
    (off: { x: number; y: number }, z: number) => {
      const img = imgRef.current;
      if (!img.naturalWidth) return off;
      const { sw, sh } = getCropRect(img, z, { x: 0, y: 0 });
      const maxX = (img.naturalWidth - sw) / 2;
      const maxY = (img.naturalHeight - sh) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, off.x)),
        y: Math.max(-maxY, Math.min(maxY, off.y)),
      };
    },
    [],
  );

  const draw = useCallback(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const w = DISPLAY_W;
    const h = DISPLAY_H;
    ctx.clearRect(0, 0, w, h);

    const img = imgRef.current;
    if (img.naturalWidth) {
      const { sx, sy, sw, sh } = getCropRect(img, zoom, offset);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }

    // dark overlay everywhere EXCEPT inside the circle (the hole is
    // created by drawing the arc in the opposite winding direction)
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2 - 2;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "rgba(15, 23, 42, 0.55)";
    ctx.fill();
    ctx.restore();

    // rule-of-thirds grid across the full box
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      const x = (w * i) / 3;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      const y = (h * i) / 3;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();

    // circle guide border
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // outer box border
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, w - 2, h - 2);
  }, [zoom, offset]);

  useEffect(() => {
    const img = imgRef.current;
    img.onload = () => {
      setZoom(MIN_ZOOM);
      setOffset({ x: 0, y: 0 });
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    draw();
  }, [draw]);

  const updateZoom = (z: number) => {
    const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z));
    setZoom(next);
    setOffset((o) => clampOffset(o, next));
  };

  const handleExport = useCallback(() => {
    const img = imgRef.current;
    const out = document.createElement("canvas");
    out.width = OUTPUT_WIDTH;
    out.height = OUTPUT_HEIGHT;
    const ctx = out.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const { sx, sy, sw, sh } = getCropRect(img, zoom, offset);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

    // step quality down until we land near TARGET_FILE_SIZE_BYTES
    let quality = 0.97;
    let dataUrl = out.toDataURL("image/jpeg", quality);
    while (dataUrlBytes(dataUrl) > TARGET_FILE_SIZE_BYTES && quality > 0.5) {
      quality -= 0.05;
      dataUrl = out.toDataURL("image/jpeg", quality);
    }
    return dataUrl;
  }, [zoom, offset]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-gray-900">
            Crop photo
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <IconX size={16} />
          </button>
        </div>

        <div className="flex justify-center mb-3">
          <canvas
            ref={canvasRef}
            width={DISPLAY_W}
            height={DISPLAY_H}
            className="cursor-move rounded-xl border border-gray-200 shadow-inner touch-none select-none"
            onMouseDown={(e) => {
              dragging.current = true;
              dragStart.current = {
                x: e.clientX,
                y: e.clientY,
                ox: offset.x,
                oy: offset.y,
              };
            }}
            onMouseMove={(e) => {
              if (!dragging.current) return;
              const img = imgRef.current;
              if (!img.naturalWidth) return;
              const { sw } = getCropRect(img, zoom, { x: 0, y: 0 });
              const scale = sw / DISPLAY_W;
              const next = {
                x:
                  dragStart.current.ox -
                  (e.clientX - dragStart.current.x) * scale,
                y:
                  dragStart.current.oy -
                  (e.clientY - dragStart.current.y) * scale,
              };
              setOffset(clampOffset(next, zoom));
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onWheel={(e) => {
              e.preventDefault();
              updateZoom(zoom - e.deltaY * 0.0015);
            }}
          />
        </div>

        <p className="text-center text-[11px] text-gray-400 mb-4">
          Drag to reposition, scroll to zoom — the lit circle previews how this
          will look as a round avatar; the full box is what gets saved.
        </p>

        <label className="block text-[12px] text-gray-500 mb-1">Zoom</label>
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => updateZoom(zoom - 0.25)}
            className="text-gray-400 hover:text-[#02644A] transition-colors"
            aria-label="Zoom out"
          >
            <IconZoomOut size={16} />
          </button>
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step={0.05}
            value={zoom}
            onChange={(e) => updateZoom(+e.target.value)}
            className="w-full accent-[#02644A]"
          />
          <button
            onClick={() => updateZoom(zoom + 0.25)}
            className="text-gray-400 hover:text-[#02644A] transition-colors"
            aria-label="Zoom in"
          >
            <IconZoomIn size={16} />
          </button>
          <button
            onClick={() => {
              setZoom(MIN_ZOOM);
              setOffset({ x: 0, y: 0 });
            }}
            className="text-gray-400 hover:text-[#02644A] transition-colors"
            aria-label="Reset"
          >
            <IconRotate2 size={14} />
          </button>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={saving}
            onClick={() => {
              setSaving(true);
              const dataUrl = handleExport();
              onSave(dataUrl);
              onClose();
            }}
            className="px-4 py-2 text-[13px] font-medium rounded-lg bg-[#02644A] text-white hover:bg-[#024d3a] disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving…" : "Save photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
