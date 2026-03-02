import React from 'react';
import { motion } from 'framer-motion';
import { Search, LayoutGrid, Image as ImageIcon, User, Home, Sun, Mail, Settings, Power } from 'lucide-react';
import { cn } from '../lib/utils';

export const dockItems = [
  { id: 'search', icon: Search, label: 'Search', mobile: true },
  { id: 'apps', icon: LayoutGrid, label: 'Apps', mobile: true },
  { id: 'gallery', icon: ImageIcon, label: 'Gallery', mobile: false },
  { id: 'profile', icon: User, label: 'Profile', mobile: false },
  { id: 'home', icon: Home, label: 'Home', mobile: true },
  { id: 'theme', icon: Sun, label: 'Theme', mobile: false },
  { id: 'messages', icon: Mail, label: 'Messages', mobile: true },
  { id: 'settings', icon: Settings, label: 'Settings', mobile: false },
  { id: 'power', icon: Power, label: 'Power', mobile: true },
];

interface DockProps {
  activeId: string;
  onItemClick: (id: string) => void;
  isLightTheme: boolean;
}

export const Dock: React.FC<DockProps> = ({ activeId, onItemClick, isLightTheme }) => {
  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center gap-1 sm:gap-2 p-2 sm:p-3 backdrop-blur-2xl border rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl mx-auto w-max",
          isLightTheme 
            ? "bg-slate-50/70 border-sky-200 shadow-sky-200/20" 
            : "bg-black/40 border-white/20 shadow-black/40"
        )}
      >
        {dockItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              whileHover={{ scale: 1.2, y: -10 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative p-3 sm:p-4 rounded-full transition-all group shrink-0",
                !item.mobile && "hidden sm:flex",
                isActive 
                  ? (isLightTheme ? "bg-blue-600 text-white" : "bg-white text-black")
                  : (isLightTheme ? "text-blue-600 hover:bg-blue-50" : "text-white hover:bg-white/10")
              )}
            >
              <item.icon size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
              <span className={cn(
                "absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block",
                isLightTheme ? "bg-blue-600 text-white" : "bg-black/80 text-white"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-dot"
                  className={cn(
                    "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                    isLightTheme ? "bg-blue-600" : "bg-white"
                  )}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
