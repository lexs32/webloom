import * as React from "react";

export interface GooglyEyesProps {
  scleraColor?: string;
  pupilColor?: string;
  outline?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
  eyeRadius?: number;
  pupilRadius?: number;
  gap?: number;
  margin?: number;
  smoothness?: number;
  background?: string;
  sizing?: "fit" | "fill";
  blinking?: boolean;
  blinkInterval?: number;
}

export default function GooglyEyes(props: GooglyEyesProps) {
  const {
    scleraColor = "#ffffff",
    pupilColor = "#000000",
    outline = false,
    outlineColor = "#000000",
    outlineWidth = 2,
    eyeRadius = 16,
    pupilRadius = 6,
    gap = 36,
    margin = 2,
    smoothness = 0.18,
    background = "transparent",
    sizing = "fit",
    blinking = true,
    blinkInterval = 3000,
  } = props;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ w: 80, h: 40 });
  const [pointer, setPointer] = React.useState({ x: 0, y: 0 });

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize((s) =>
        s.w === r.width && s.h === r.height ? s : { w: r.width, h: r.height }
      );
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setPointer({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = size;
    if (w <= 0 || h <= 0) return null;

    const desiredTotalW = gap + 2 * eyeRadius;
    const desiredTotalH = 2 * eyeRadius;
    const scale = Math.min(w / desiredTotalW, h / desiredTotalH, 1);

    const R = eyeRadius * scale;
    const rP = Math.min(pupilRadius * scale, R - margin - 1);
    const G = gap * scale;

    const cxL = w / 2 - G / 2;
    const cxR = w / 2 + G / 2;
    const cy = h / 2;

    const maxOffset = Math.max(0, R - rP - margin);
    return { R, rP, cxL, cxR, cy, maxOffset };
  }, [size, eyeRadius, pupilRadius, gap, margin]);

  const targets = React.useMemo(() => {
    if (!metrics || !containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const localX = pointer.x - rect.left;
    const localY = pointer.y - rect.top;

    const calc = (cx: number, cy: number) => {
      const dx = localX - cx;
      const dy = localY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(metrics.maxOffset, dist) / dist;
      return { x: cx + dx * k, y: cy + dy * k };
    };

    return {
      left: calc(metrics.cxL, metrics.cy),
      right: calc(metrics.cxR, metrics.cy),
    };
  }, [pointer, metrics]);

  const [pupils, setPupils] = React.useState(() => ({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  }));

  const [blink, setBlink] = React.useState(false);

  React.useEffect(() => {
    if (!blinking) {
      setBlink(false);
      return;
    }
    let blinkTimeout: number, phaseTimeout: number;
    function startBlinkSequence() {
      setBlink(true);
      phaseTimeout = window.setTimeout(() => {
        setBlink(false);
        blinkTimeout = window.setTimeout(startBlinkSequence, blinkInterval);
      }, 140);
    }
    blinkTimeout = window.setTimeout(startBlinkSequence, blinkInterval);
    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(phaseTimeout);
    };
  }, [blinking, blinkInterval]);

  React.useEffect(() => {
    let raf = 0;
    const step = () => {
      if (!targets || !metrics) {
        raf = requestAnimationFrame(step);
        return;
      }
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const t = Math.max(0, Math.min(1, smoothness));
      setPupils((p) => ({
        left: {
          x: lerp(p.left.x || metrics.cxL, targets.left.x, t),
          y: lerp(p.left.y || metrics.cy, targets.left.y, t),
        },
        right: {
          x: lerp(p.right.x || metrics.cxR, targets.right.x, t),
          y: lerp(p.right.y || metrics.cy, targets.right.y, t),
        },
      }));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [targets, metrics, smoothness]);

  const desiredTotalW = gap + 2 * eyeRadius;
  const desiredTotalH = 2 * eyeRadius;
  const aspect = desiredTotalW / Math.max(1, desiredTotalH);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: sizing === "fill" ? "100%" : "auto",
    aspectRatio: sizing === "fit" ? String(aspect) : undefined,
    background,
    display: "inline-block",
  };

  if (!metrics) return <div ref={containerRef} style={containerStyle} />;

  return (
    <div ref={containerRef} style={containerStyle}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx={metrics.cxL}
          cy={metrics.cy}
          r={metrics.R}
          fill={scleraColor}
          stroke={outline ? outlineColor : "none"}
          strokeWidth={outline ? outlineWidth : 0}
        />
        <circle
          cx={metrics.cxR}
          cy={metrics.cy}
          r={metrics.R}
          fill={scleraColor}
          stroke={outline ? outlineColor : "none"}
          strokeWidth={outline ? outlineWidth : 0}
        />

        {blink ? (
          <>
            <ellipse
              cx={pupils.left.x || metrics.cxL}
              cy={pupils.left.y || metrics.cy}
              rx={metrics.rP}
              ry={metrics.rP * 0.18}
              fill={pupilColor}
            />
            <ellipse
              cx={pupils.right.x || metrics.cxR}
              cy={pupils.right.y || metrics.cy}
              rx={metrics.rP}
              ry={metrics.rP * 0.18}
              fill={pupilColor}
            />
          </>
        ) : (
          <>
            <circle
              cx={pupils.left.x || metrics.cxL}
              cy={pupils.left.y || metrics.cy}
              r={metrics.rP}
              fill={pupilColor}
            />
            <circle
              cx={pupils.right.x || metrics.cxR}
              cy={pupils.right.y || metrics.cy}
              r={metrics.rP}
              fill={pupilColor}
            />
          </>
        )}
      </svg>
    </div>
  );
}
