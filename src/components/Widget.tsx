import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';

interface WidgetProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  isLightTheme?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({ children, className, title, isLightTheme }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative group backdrop-blur-2xl border rounded-[1.5rem] p-5 overflow-hidden transition-all duration-300",
        isLightTheme 
          ? "bg-slate-50/80 border-sky-100 shadow-[0_8px_32px_rgba(0,100,255,0.08)] hover:shadow-[0_20px_40px_rgba(0,100,255,0.12)]" 
          : "bg-slate-900/40 border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <div style={{ transform: "translateZ(60px)" }} className="h-full flex flex-col relative z-10">
        {title && (
          <h3 className={cn(
            "text-[9px] uppercase tracking-[0.25em] font-bold mb-3",
            isLightTheme ? "text-sky-600/60" : "text-slate-400/60"
          )}>
            {title}
          </h3>
        )}
        <div style={{ transform: "translateZ(30px)" }} className="flex-1 flex flex-col min-h-0">
          {children}
        </div>
      </div>
      
      {/* Subtle Inner Glow */}
      <div className={cn(
        "absolute inset-0 pointer-events-none opacity-50",
        isLightTheme 
          ? "bg-gradient-to-br from-white/40 to-transparent" 
          : "bg-gradient-to-br from-slate-400/10 to-transparent"
      )} />
    </motion.div>
  );
};
