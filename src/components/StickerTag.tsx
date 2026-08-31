
import { motion } from "framer-motion";
import { Box, PenTool, Palette } from "lucide-react";

export type StickerVariant = "purple" | "pink" | "blue" | "lime";

interface StickerTagProps {
  label: string;
  variant?: StickerVariant;
  rotate?: number;
  className?: string;
  icon?: "box" | "pen" | "palette";
}

export default function StickerTag({
  label,
  variant = "purple",
  rotate = 0,
  className = "",
  icon = "box",
}: StickerTagProps) {
  const styles = {
    purple: {
      bg: "bg-[#f5f3ff]",
      badgeBg: "bg-[#8b5cf6]",
      corner: "bg-[#7c3aed]",
      text: "text-zinc-900",
      border: "border-purple-200/60",
    },
    pink: {
      bg: "bg-[#fdf2f8]",
      badgeBg: "bg-[#ec4899]",
      corner: "bg-[#db2777]",
      text: "text-zinc-900",
      border: "border-pink-200/60",
    },
    blue: {
      bg: "bg-[#f0f9ff]",
      badgeBg: "bg-[#0284c7]",
      corner: "bg-[#0369a1]",
      text: "text-zinc-900",
      border: "border-sky-200/60",
    },
    lime: {
      bg: "bg-[#f7fee7]",
      badgeBg: "bg-[#84cc16]",
      corner: "bg-[#65a30d]",
      text: "text-zinc-900",
      border: "border-lime-200/60",
    },
  }[variant];

  const IconComponent = {
    box: Box,
    pen: PenTool,
    palette: Palette,
  }[icon];

  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: rotate + 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      style={{ rotate: `${rotate}deg` }}
      className={`relative inline-flex items-center pl-3 pr-8 py-2.5 rounded-2xl shadow-xl border ${styles.bg} ${styles.border} ${className} select-none cursor-grab active:cursor-grabbing`}
    >
      {/* Paperclip Graphic */}
      <div className="absolute -left-2.5 -top-2.5 z-20 pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
          <path
            d="M21.438 11.662l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
            stroke="#6366f1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Circle Icon Badge */}
      <div
        className={`size-8 rounded-full ${styles.badgeBg} text-white flex items-center justify-center shadow-md mr-3 shrink-0`}
      >
        <IconComponent className="size-4" />
      </div>

      {/* Label Typography */}
      <span className={`text-[15px] font-bold font-jakarta tracking-normal ${styles.text}`}>
        
        {label}
      </span>

      {/* Folded Corner Sticker Effect */}
      <div
        className={`absolute top-0 right-0 size-4 ${styles.corner} rounded-bl-lg shadow-sm`}
      />
    </motion.div>
  );
}
