import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { dockItems } from '../components/Dock';

interface AppsProps {
  isLightTheme: boolean;
  setActivePage: (page: string) => void;
}

export const Apps: React.FC<AppsProps> = ({ isLightTheme, setActivePage }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 sm:gap-6 p-4">
      {dockItems.map((item) => (
        <motion.div 
          key={item.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActivePage(item.id)}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <div className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center justify-center shadow-lg border transition-all duration-300",
            isLightTheme 
              ? "bg-slate-50 border-sky-100 text-sky-600 shadow-sky-200/20" 
              : "bg-slate-800/60 border-slate-700 text-slate-200 shadow-black/20"
          )}>
            <item.icon size={28} />
          </div>
          <span className={cn("text-[9px] font-bold uppercase tracking-widest text-center", isLightTheme ? "text-sky-900" : "text-slate-400")}>{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
};
