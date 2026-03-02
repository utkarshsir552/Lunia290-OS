import React from 'react';
import { motion } from 'framer-motion';
import { Chrome, Video, Music, Command, Cloud, Calendar as CalendarIcon, MapPin, Play, Pause, Plus } from 'lucide-react';
import { Widget } from '../components/Widget';
import { ProfileWidget } from '../components/ProfileWidget';
import { MusicWidget } from '../components/MusicWidget';
import { VolumeSlider } from '../components/VolumeSlider';
import { ProjectCard } from '../components/ProjectCard';
import { cn } from '../lib/utils';

interface HomeProps {
  isLightTheme: boolean;
  tags: string[];
  setActivePage: (page: string) => void;
  volume: number;
  setVolume: (v: number) => void;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  profileData: any;
}

export const Home: React.FC<HomeProps> = ({ 
  isLightTheme, 
  tags, 
  setActivePage, 
  volume, 
  setVolume, 
  isPlaying, 
  setIsPlaying,
  profileData
}) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [activeFilter, setActiveFilter] = React.useState('All');

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const projects = [
    { id: 1, title: "Lunia290 OS: The Future", category: "Immersive OS Design", type: "Web" },
    { id: 2, title: "Cyberpunk Dashboard", category: "3D UI", type: "3D" },
    { id: 3, title: "Eco-Tracker App", category: "Mobile App", type: "Mobile" },
    { id: 4, title: "Fluid Motion Graphics", category: "Motion Design", type: "Motion" },
    { id: 5, title: "Crypto Wallet", category: "Web Dev", type: "Web" },
    { id: 6, title: "AR Navigation", category: "3D UI", type: "3D" },
    { id: 7, title: "Fitness Companion", category: "Mobile App", type: "Mobile" },
    { id: 8, title: "Abstract Visuals", category: "Motion Design", type: "Motion" },
    { id: 9, title: "Portfolio 2024", category: "Web Dev", type: "Web" },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.type === activeFilter);

  const quickApps = [
    { name: 'Chrome', icon: Chrome, color: 'text-blue-500' },
    { name: 'VLC', icon: Video, color: 'text-orange-500' },
    { name: 'Spotify', icon: Music, color: 'text-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-12 gap-3 sm:gap-4">
      {/* Left Column */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 sm:gap-4">
        <Widget title="Profile" className="min-h-[250px] sm:min-h-[300px]" isLightTheme={isLightTheme}>
          <ProfileWidget 
            name={profileData.name}
            role={profileData.role}
            rating={profileData.rating}
            image={profileData.image}
            description={profileData.description}
            isLightTheme={isLightTheme}
          />
        </Widget>

        <Widget title="Quick Actions" className="h-28 sm:h-32" isLightTheme={isLightTheme}>
          <div className="grid grid-cols-3 gap-3 h-full">
            {quickApps.map((app) => (
              <div key={app.name} className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
                <div className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all duration-300",
                  isLightTheme 
                    ? "bg-slate-50 border-sky-100 group-hover:bg-sky-600 group-hover:text-white" 
                    : "bg-slate-800/50 border-slate-700 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white"
                )}>
                  <app.icon size={16} className={cn("transition-colors", !isLightTheme && "group-hover:text-white")} />
                </div>
                <span className={cn(
                  "text-[8px] font-bold uppercase tracking-tighter",
                  isLightTheme ? "text-sky-600/50" : "text-slate-500"
                )}>{app.name}</span>
              </div>
            ))}
          </div>
        </Widget>

        {/* New Weather Widget */}
        <Widget title="Weather" className="h-28 sm:h-32" isLightTheme={isLightTheme}>
          <div className="flex items-center justify-between h-full px-2">
            <div className="flex flex-col">
              <span className={cn("text-2xl font-bold", isLightTheme ? "text-sky-900" : "text-white")}>24°C</span>
              <div className="flex items-center gap-1 opacity-60">
                <MapPin size={10} className={isLightTheme ? "text-sky-600" : "text-slate-400"} />
                <span className={cn("text-[8px] uppercase font-bold tracking-widest", isLightTheme ? "text-sky-900" : "text-slate-400")}>Yangon</span>
              </div>
            </div>
            <div className="relative">
              <Cloud size={32} className={isLightTheme ? "text-sky-400" : "text-indigo-400"} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full blur-[2px]" />
            </div>
          </div>
        </Widget>
      </div>

      {/* Center Column */}
      <div className="col-span-12 lg:col-span-6 relative min-h-[350px] sm:min-h-[450px]">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group shadow-2xl border border-white/5">
            <img 
              src="https://picsum.photos/seed/hero/800/1200" 
              alt="Hero Character" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
              isLightTheme ? "from-slate-200/90" : "from-slate-950/90"
            )} />
            
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-sky-400/30 rounded-lg pointer-events-none">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
            </div>

            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-full px-4 sm:px-8 text-center">
              <h2 className={cn(
                "text-4xl sm:text-6xl font-black tracking-tighter opacity-10 select-none",
                isLightTheme ? "text-sky-900" : "text-white"
              )}>ZENITH</h2>
              <div className="flex items-center gap-2 sm:gap-3 mt-[-5px] sm:mt-[-10px]">
                <div className={cn("h-[1px] flex-1", isLightTheme ? "bg-sky-600/20" : "bg-white/10")} />
                <span className={cn(
                  "font-bold tracking-[0.4em] uppercase text-[7px] sm:text-[10px]",
                  isLightTheme ? "text-sky-900" : "text-slate-300"
                )}>Can't Communicate</span>
                <div className={cn("h-[1px] flex-1", isLightTheme ? "bg-sky-600/20" : "bg-white/10")} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-3 sm:gap-4">
        <Widget title="Now Playing" className="h-48 sm:h-56" isLightTheme={isLightTheme}>
          <MusicWidget isLightTheme={isLightTheme} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </Widget>

        <div className="flex-1 grid grid-cols-4 gap-3 sm:gap-4">
          <Widget title="Tags" className="col-span-3 min-h-[180px] sm:min-h-[220px]" isLightTheme={isLightTheme}>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className={cn(
                    "px-2 py-0.5 border rounded-full text-[8px] font-bold transition-all cursor-default",
                    isLightTheme 
                      ? "bg-slate-50 border-sky-100 text-sky-600 hover:bg-sky-600 hover:text-white" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className={cn(
              "mt-3 w-full py-2 border rounded-xl text-[8px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2",
              isLightTheme 
                ? "bg-slate-50 border-sky-100 text-sky-600/40 hover:bg-sky-100 hover:text-sky-600" 
                : "bg-slate-800/50 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-200"
            )}>
              <Plus size={10} />
              Add Widget
            </button>
          </Widget>

          <div className="col-span-1">
            <VolumeSlider isLightTheme={isLightTheme} volume={volume} setVolume={setVolume} />
          </div>
        </div>

        {/* New Calendar Widget */}
        <Widget title="Calendar" className="h-28 sm:h-32" isLightTheme={isLightTheme}>
          <div className="flex items-center gap-4 h-full px-2">
            <div className={cn("w-10 h-10 rounded-xl flex flex-col items-center justify-center border", 
              isLightTheme ? "bg-sky-50 border-sky-100 text-sky-600" : "bg-slate-800/50 border-slate-700 text-indigo-400")}>
              <span className="text-[10px] font-bold uppercase">
                {currentTime.toLocaleString('default', { month: 'short' })}
              </span>
              <span className="text-sm font-black">
                {currentTime.getDate()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className={cn("text-[10px] font-bold", isLightTheme ? "text-sky-900" : "text-white")}>Design Sync</span>
              <span className={cn("text-[8px] opacity-60", isLightTheme ? "text-sky-600" : "text-slate-400")}>10:00 AM - 11:30 AM</span>
            </div>
          </div>
        </Widget>
      </div>

      {/* Projects Section - Bento Grid with Vertical Scroll */}
      <div className="col-span-12 mt-6 sm:mt-10">
        <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className={cn("text-2xl sm:text-3xl font-bold tracking-tight", isLightTheme ? "text-sky-900" : "text-white")}>Project Archive</h2>
            <p className={cn("mt-1 text-xs", isLightTheme ? "text-sky-600/40" : "text-slate-500")}>Explore my full catalog of creative works.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Web', '3D', 'Mobile', 'Motion'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all whitespace-nowrap",
                  activeFilter === filter 
                    ? (isLightTheme ? "bg-sky-600 border-sky-600 text-white" : "bg-indigo-600 border-indigo-600 text-white")
                    : (isLightTheme ? "bg-slate-50 border-sky-100 text-sky-600 hover:bg-sky-50" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800")
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className={cn(
          "relative rounded-[2rem] border p-4 sm:p-6 overflow-hidden",
          isLightTheme ? "bg-slate-50/50 border-sky-100" : "bg-slate-900/30 border-slate-800/50"
        )}>
          {/* Vertical Scrollable Container */}
          <div className="h-[500px] sm:h-[600px] overflow-y-auto pr-2 no-scrollbar scroll-smooth">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project, i) => {
                const isFeatured = i === 0 && activeFilter === 'All';
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "col-span-1",
                      isFeatured && "sm:col-span-2 sm:row-span-2"
                    )}
                  >
                    <ProjectCard 
                      id={project.id} 
                      title={project.title} 
                      category={project.category} 
                      isLightTheme={isLightTheme} 
                      className={isFeatured ? "h-[416px] sm:h-[496px]" : "h-[220px] sm:h-[260px]"}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Scroll Indicators */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t",
            isLightTheme ? "from-slate-100/90 to-transparent" : "from-slate-950/90 to-transparent"
          )} />
        </div>
      </div>
    </div>
  );
};
