import React from 'react';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const VolumeSlider: React.FC<{ 
  isLightTheme?: boolean;
  volume: number;
  setVolume: (v: number) => void;
}> = ({ isLightTheme, volume, setVolume }) => {
  return (
    <div className="flex flex-col items-center gap-4 h-full py-2">
      <div 
        className={cn(
          "relative flex-1 w-12 rounded-full overflow-hidden flex flex-col justify-end cursor-pointer group",
          isLightTheme ? "bg-sky-200/50" : "bg-white/10"
        )}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const y = e.clientY - rect.top;
          const v = Math.round(100 - (y / rect.height) * 100);
          setVolume(Math.max(0, Math.min(100, v)));
        }}
      >
        <motion.div 
          animate={{ height: `${volume}%` }}
          className={cn(
            "w-full transition-all duration-300",
            isLightTheme ? "bg-sky-600" : "bg-white"
          )}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className={cn("w-1 h-8 rounded-full mb-2", isLightTheme ? "bg-blue-900/20" : "bg-black/20")} />
          <div className={cn("w-1 h-4 rounded-full", isLightTheme ? "bg-blue-900/20" : "bg-black/20")} />
        </div>
      </div>
      <div className={cn(
        "p-3 rounded-full transition-colors",
        isLightTheme ? "bg-sky-200/50 text-sky-600" : "bg-white/10 text-white"
      )}>
        <Volume2 size={20} />
      </div>
    </div>
  );
};
