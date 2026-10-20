
import { useRef, useState, useEffect } from "react";

const CELL_SIZE_DESKTOP = 48;
const CELL_SIZE_MOBILE = 36;
const MOBILE_BREAKPOINT = 640;
const MAX_RADIUS = 14;
const WAVE_DELAY = 55;
const DURATION = 500;
const PEAK_OPACITY = 32;
const FALLOFF = 1.8;
const HOVER_OPACITY = 16;
const HOVER_DURATION = 900;

function getAccentColor(opacityPercent) {
  return `color-mix(in srgb, var(--accent) ${opacityPercent}%, transparent)`;
}

export default function BackgroundGrid({ children }) {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    size: CELL_SIZE_DESKTOP,
    cols: 0,
    rows: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = el;
      const size =
        clientWidth < MOBILE_BREAKPOINT
          ? CELL_SIZE_MOBILE
          : CELL_SIZE_DESKTOP;

      let cols = Math.ceil(clientWidth / size) + 1;
      if (cols % 2 === 0) cols += 1;

      const rows = Math.ceil(clientHeight / size);

      setDimensions((prev) =>
        prev.size === size &&
        prev.cols === cols &&
        prev.rows === rows
          ? prev
          : { size, cols, rows }
      );
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const { size, cols, rows } = dimensions;
    let lastHoveredIndex = -1;

    function getCoords(e) {
      const rect = grid.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / size);
      const row = Math.floor((e.clientY - rect.top) / size);

      if (col < 0 || col >= cols || row < 0 || row >= rows) {
        return null;
      }

      return { row, col };
    }

    function handleClick(e) {
      const coords = getCoords(e);
      if (!coords) return;

      const cells = grid.children;
      const minRow = Math.max(0, coords.row - MAX_RADIUS);
      const maxRow = Math.min(rows - 1, coords.row + MAX_RADIUS);
      const minCol = Math.max(0, coords.col - MAX_RADIUS);
      const maxCol = Math.min(cols - 1, coords.col + MAX_RADIUS);

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const dist = Math.hypot(r - coords.row, c - coords.col);
          if (dist > MAX_RADIUS) continue;

          const opacity = Math.max(4, PEAK_OPACITY - dist * FALLOFF);
          const cellIndex = r * cols + c;

          if (cells[cellIndex]) {
            cells[cellIndex].animate(
              [
                { backgroundColor: getAccentColor(0) },
                {
                  backgroundColor: getAccentColor(opacity),
                  offset: 0.35,
                },
                { backgroundColor: getAccentColor(0) },
              ],
              { duration: DURATION, delay: dist * WAVE_DELAY }
            );
          }
        }
      }
    }

    function handlePointerMove(e) {
      if (e.pointerType === "touch") return;

      const coords = getCoords(e);
      const idx = coords ? coords.row * cols + coords.col : -1;

      if (idx !== lastHoveredIndex) {
        lastHoveredIndex = idx;

        if (idx >= 0 && grid.children[idx]) {
          grid.children[idx].animate(
            [
              { backgroundColor: getAccentColor(HOVER_OPACITY) },
              { backgroundColor: getAccentColor(0) },
            ],
            { duration: HOVER_DURATION, easing: "ease-out" }
          );
        }
      }
    }

    container.addEventListener("click", handleClick);
    container.addEventListener("pointermove", handlePointerMove);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("pointermove", handlePointerMove);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      className="relative isolate w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        backgroundColor: "#160824",
        backgroundImage: `
          radial-gradient(
            ellipse at 15% 15%,
            rgba(126, 34, 206, 0.42),
            transparent 55%
          ),
          radial-gradient(
            ellipse at 85% 40%,
            rgba(88, 28, 135, 0.35),
            transparent 50%
          ),
          linear-gradient(
            135deg,
            #160824 0%,
            #24103b 50%,
            #160824 100%
          )
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        ref={gridRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${dimensions.cols}, ${dimensions.size}px)`,
          gridAutoRows: `${dimensions.size}px`,
          maskImage: "linear-gradient(to bottom, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 50%, transparent 100%)",
        }}
      >
        {Array.from(
          { length: dimensions.cols * dimensions.rows },
          (_, i) => (
            <div
              key={i}
              className="border-r border-b opacity-40"
              style={{ borderColor: "rgba(167, 139, 250, 0.22)" }}
            />
          )
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
