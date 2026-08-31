import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useRef, useMemo, memo } from "react";

function squircleRadius(r: number | string): React.CSSProperties {
  return {
    borderRadius: r,
  };
}

export type LinkTarget = "same" | "new";

export interface HoverTextConfig {
  bgColor: string;
  textColor: string;
  size: number;
  padding: number;
}

export interface DockItem {
  id: string;
  title: string;
  image?: string;
  link?: string;
  linkTarget?: LinkTarget;
}

export interface AppleDockProps {
  items?: DockItem[];
  activeId?: string;
  baseSize?: number;
  magnification?: number;
  distance?: number;
  gap?: number;
  borderRadius?: number;
  backgroundColor?: string;
  hoverText?: HoverTextConfig;
  trayPaddingX?: number;
  trayPaddingY?: number;
  trayBorderRadius?: number;
  onSelect?: (item: DockItem) => void;
}

const DEFAULT_ITEMS: DockItem[] = [
  {
    id: "about",
    title: "About",
    image: "/assets/asset_28.png",
    linkTarget: "same",
  },
  {
    id: "projects",
    title: "Projects",
    image: "/assets/asset_29.png",
    linkTarget: "same",
  },
  {
    id: "services",
    title: "Services",
    image: "/assets/asset_30.png",
    linkTarget: "same",
  },
  {
    id: "contact",
    title: "Contact",
    image: "/assets/asset_31.png",
    linkTarget: "same",
  },
];

export default function AppleDock({
  items = DEFAULT_ITEMS,
  activeId,
  baseSize = 72,
  magnification = 1.5,
  distance = 200,
  gap = 14,
  borderRadius = 18,
  backgroundColor = "transparent",
  hoverText = {
    bgColor: "rgba(0, 0, 0, 0.75)",
    textColor: "rgba(255, 255, 255, 0.9)",
    size: 13,
    padding: 6,
  },
  trayPaddingX = 16,
  trayPaddingY = 10,
  trayBorderRadius = 26,
  onSelect,
}: AppleDockProps) {
  const mouseX = useMotionValue(Infinity);

  const finalItems = useMemo(() => {
    return items || DEFAULT_ITEMS;
  }, [items]);

  const trayHeight = baseSize + trayPaddingY * 2;

  return (
    <motion.nav
      aria-label="Apple Dock Navigation"
      role="menubar"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        height: baseSize * magnification + 20 + trayPaddingY * 2 + 20,
        paddingBottom: 10,
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <motion.div
        layout
        transition={{
          layout: {
            type: "spring",
            mass: 0.1,
            stiffness: 150,
            damping: 12,
          },
        }}
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: trayHeight,
          paddingLeft: trayPaddingX,
          paddingRight: trayPaddingX,
          paddingBottom: trayPaddingY,
          ...squircleRadius(trayBorderRadius),
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 100%)",
          backdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
          WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: [
            "0 0 0 0.5px rgba(0, 0, 0, 0.08)",
            "0 12px 40px rgba(0, 0, 0, 0.25)",
            "0 2px 8px rgba(0, 0, 0, 0.10)",
            "inset 0 1.5px 0 rgba(255, 255, 255, 0.65)",
            "inset 0 -1px 0 rgba(0, 0, 0, 0.06)",
            "inset 0 0 24px rgba(255, 255, 255, 0.15)",
          ].join(", "),
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            ...squircleRadius(trayBorderRadius),
            backgroundColor: "rgba(32, 29, 29, 0.05)",
            mixBlendMode: "color-burn",
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            ...squircleRadius(trayBorderRadius),
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.00) 60%)",
            mixBlendMode: "overlay",
            boxShadow:
              "inset 1.5px 1.5px 1px -1px rgba(255,255,255,0.8), inset -1.5px -1.5px 1px -1px rgba(180,180,180,0.3)",
            pointerEvents: "none",
          }}
        />

        <ul
          style={{
            display: "flex",
            margin: 0,
            padding: 0,
            listStyle: "none",
            gap: gap,
            alignItems: "flex-end",
            zIndex: 1,
            position: "relative",
          }}
        >
          {finalItems.map((item, index) => (
            <DockIcon
              key={index}
              mouseX={mouseX}
              item={item}
              isActive={activeId === item.id}
              baseSize={baseSize}
              magnification={magnification}
              distance={distance}
              borderRadius={borderRadius}
              backgroundColor={backgroundColor}
              hoverText={hoverText}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}

interface DockIconProps {
  mouseX: any;
  item: DockItem;
  isActive: boolean;
  baseSize: number;
  magnification: number;
  distance: number;
  borderRadius: number;
  backgroundColor: string;
  hoverText: HoverTextConfig;
  onSelect?: (item: DockItem) => void;
}

const DockIcon = memo(function DockIcon({
  mouseX,
  item,
  isActive,
  baseSize,
  magnification,
  distance,
  borderRadius,
  backgroundColor,
  hoverText,
  onSelect,
}: DockIconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [baseSize, baseSize * magnification, baseSize]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [isHovered, setHovered] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);

  const finalWidth = shouldReduceMotion ? baseSize : width;

  return (
    <li role="none" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <motion.button
        ref={ref}
        role="menuitem"
        aria-label={item.title}
        tabIndex={0}
        onClick={() => onSelect?.(item)}
        whileTap={{ scale: 0.85 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: finalWidth,
          height: finalWidth,
          ...squircleRadius(borderRadius),
          backgroundColor: backgroundColor,
          cursor: "pointer",
          display: "block",
          position: "relative",
          outline: "none",
          border: "none",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
          overflow: "visible",
          willChange: "transform",
          transform: "translateZ(0)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatePresence>
            {(isHovered || isFocused) && (
              <motion.div
                role="tooltip"
                initial={{ opacity: 0, y: 0, x: "-50%" }}
                animate={{ opacity: 1, y: -12, x: "-50%" }}
                exit={{ opacity: 0, y: 0, x: "-50%" }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  top: -(hoverText.size + hoverText.padding * 2 + 4),
                  left: "50%",
                  background: hoverText.bgColor,
                  color: hoverText.textColor,
                  padding: `${hoverText.padding}px ${hoverText.padding * 1.5}px`,
                  borderRadius: "8px",
                  fontSize: hoverText.size,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 20,
                  fontFamily: "inherit",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {item.title}
              </motion.div>
            )}
          </AnimatePresence>

          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                pointerEvents: "none",
                ...squircleRadius(borderRadius),
                position: "relative",
                zIndex: 2,
                userSelect: "none",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                ...squircleRadius(borderRadius),
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              {item.title?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>
      </motion.button>

      {/* Active Indicator Dot */}
      {isActive && (
        <motion.span
          layoutId="dock-active-dot"
          className="size-1.5 rounded-full bg-white shadow-md mt-1"
        />
      )}
    </li>
  );
});
