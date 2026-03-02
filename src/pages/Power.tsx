import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power as PowerIcon, RotateCcw, Moon, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface PowerProps {
  isLightTheme: boolean;
}

export const Power: React.FC<PowerProps> = ({ isLightTheme }) => {
  const [status, setStatus] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setStatus(action);
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="h-[calc(100vh-250px)] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {status ? (
          <motion.div
            key="status"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-6"
          >
            <div className={cn(
              "w-24 h-24 rounded-full mx-auto flex items-center justify-center animate-pulse",
              isLightTheme ? "bg-sky-600 text-white" : "bg-indigo-600 text-white"
            )}>
              <RotateCcw size={40} className="animate-spin" />
            </div>
            <h2 className={cn("text-2xl font-black uppercase tracking-[0.4em]", isLightTheme ? "text-sky-900" : "text-white")}>
              {status}...
            </h2>
            <p className={cn("text-xs opacity-60", isLightTheme ? "text-sky-600" : "text-slate-400")}>
              Please do not disconnect the system.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-6 max-w-md w-full"
          >
            {[
              { id: 'Restarting', label: 'Restart', icon: RotateCcw, color: 'bg-blue-500' },
              { id: 'Sleeping', label: 'Sleep', icon: Moon, color: 'bg-indigo-500' },
              { id: 'Shutting Down', label: 'Shut Down', icon: PowerIcon, color: 'bg-rose-500' },
              { id: 'Logging Out', label: 'Log Out', icon: LogOut, color: 'bg-amber-500' }
            ].map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={cn(
                  "p-8 rounded-[2.5rem] flex flex-col items-center gap-4 transition-all hover:scale-105 active:scale-95 group border",
                  isLightTheme 
                    ? "bg-white border-sky-100 hover:shadow-xl hover:shadow-sky-100" 
                    : "bg-slate-900 border-slate-800 hover:shadow-xl hover:shadow-indigo-900/20"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12",
                  action.color
                )}>
                  <action.icon size={32} />
                </div>
                <span className={cn("text-xs font-black uppercase tracking-widest", isLightTheme ? "text-sky-900" : "text-white")}>
                  {action.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
