import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const MusicWidget: React.FC<{ 
  isLightTheme?: boolean;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
}> = ({ isLightTheme, isPlaying, setIsPlaying }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex gap-3 sm:gap-4 items-center">
        <motion.div 
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg border-2 border-white/20 shrink-0"
        >
          <img 
            src="https://picsum.photos/seed/music/200/200" 
            alt="Album Art" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="min-w-0">
          <h4 className={cn(
            "font-bold text-base sm:text-lg leading-tight truncate",
            isLightTheme ? "text-blue-900" : "text-white"
          )}>Cinderella</h4>
          <p className={cn(
            "text-xs sm:text-sm truncate",
            isLightTheme ? "text-blue-600/60" : "text-white/60"
          )}>Komi Shouko</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-4">
        <div className={cn(
          "relative h-1.5 rounded-full overflow-hidden",
          isLightTheme ? "bg-sky-200/50" : "bg-white/10"
        )}>
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: isPlaying ? "65%" : "24%" }}
            transition={{ duration: isPlaying ? 30 : 0.5 }}
            className={cn(
              "absolute top-0 left-0 h-full",
              isLightTheme ? "bg-sky-600" : "bg-white"
            )}
          />
        </div>
        <div className={cn(
          "flex justify-between items-center text-[10px] font-mono",
          isLightTheme ? "text-blue-600/40" : "text-white/40"
        )}>
          <span>{isPlaying ? "2:45" : "1:12"}</span>
          <span>4:40</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 sm:gap-8">
        <button className={cn(
          "transition-colors",
          isLightTheme ? "text-blue-600/60 hover:text-blue-600" : "text-white/60 hover:text-white"
        )}>
          <SkipBack size={24} fill="currentColor" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl",
            isLightTheme ? "bg-sky-600 text-white" : "bg-white text-black"
          )}
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button className={cn(
          "transition-colors",
          isLightTheme ? "text-blue-600/60 hover:text-blue-600" : "text-white/60 hover:text-white"
        )}>
          <SkipForward size={24} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};
