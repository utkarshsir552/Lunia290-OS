import React from 'react';
import { Widget } from './Widget';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  isLightTheme?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, category, isLightTheme, className }) => {
  return (
    <Widget title={`Project 0${id}`} className={cn("group/card", className)} isLightTheme={isLightTheme}>
      <div className="flex flex-col h-full">
        <div className={cn(
          "aspect-video rounded-xl overflow-hidden mb-3 border relative shrink-0",
          isLightTheme ? "border-sky-100" : "border-slate-700/50"
        )}>
          <img 
            src={`https://picsum.photos/seed/project${id}/800/600`} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">View Case Study</span>
          </div>
        </div>
        <div className="px-1 flex-1 flex flex-col justify-center">
          <h4 className={cn("font-black text-[11px] sm:text-xs truncate tracking-tight", isLightTheme ? "text-sky-900" : "text-slate-200")}>{title}</h4>
          <p className={cn("text-[9px] mt-0.5 truncate font-bold opacity-40 uppercase tracking-widest", isLightTheme ? "text-sky-600" : "text-slate-400")}>{category}</p>
        </div>
      </div>
    </Widget>
  );
};
