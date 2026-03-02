import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

export const ProfileWidget: React.FC<{ 
  name: string; 
  role: string; 
  rating: number; 
  image: string;
  description: string;
  isLightTheme?: boolean;
}> = ({ name, role, rating, image, description, isLightTheme }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-4 mb-4">
        <div className={cn(
          "w-20 h-20 rounded-[1.5rem] overflow-hidden border-2",
          isLightTheme ? "border-blue-100" : "border-white/10"
        )}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-bold",
              isLightTheme ? "text-blue-600/40" : "text-white/40"
            )}>{role}</span>
          </div>
          <h3 className={cn(
            "text-xl font-bold",
            isLightTheme ? "text-blue-900" : "text-white"
          )}>{name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className={cn(
              "font-mono text-xs",
              isLightTheme ? "text-blue-900" : "text-white"
            )}>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <p className={cn(
        "text-xs leading-relaxed line-clamp-3",
        isLightTheme ? "text-blue-800/60" : "text-white/50"
      )}>
        {description}
      </p>
      <button className={cn(
        "mt-auto text-[10px] font-bold uppercase tracking-widest text-left transition-colors",
        isLightTheme ? "text-blue-600/40 hover:text-blue-600" : "text-white/40 hover:text-white"
      )}>
        Read More →
      </button>
    </div>
  );
};
