import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Dock } from './components/Dock';
import { cn } from './lib/utils';

// Pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Apps } from './pages/Apps';
import { Gallery } from './pages/Gallery';
import { Messages } from './pages/Messages';
import { Settings } from './pages/Settings';
import { Power } from './pages/Power';
import { Profile } from './pages/Profile';

const tags = [
  '#Product Design',
  '#Frontend',
  '#React',
  '#Motion',
  '#3D UI',
  '#iPadOS',
  '#Creative',
  '#TypeScript'
];

const LoadingPage = ({ isLightTheme }: { isLightTheme: boolean }) => (
  <div className={cn(
    "fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-700",
    isLightTheme ? "bg-[#e2e8f0]" : "bg-slate-950"
  )}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center gap-8"
    >
      <div className={cn(
        "relative w-24 h-24 flex items-center justify-center rounded-[2.5rem] overflow-hidden shadow-2xl",
        isLightTheme ? "bg-sky-600 shadow-sky-200" : "bg-indigo-600 shadow-indigo-900/40"
      )}>
        <span className="text-white font-black text-5xl italic">L</span>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className={cn("font-black tracking-[0.4em] uppercase text-2xl leading-none mb-4", isLightTheme ? "text-sky-900" : "text-white")}>
          Lunia290 OS
        </h1>
        <div className="w-48 h-1 bg-slate-800/20 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={cn("absolute inset-0 w-1/2", isLightTheme ? "bg-sky-600" : "bg-indigo-600")}
          />
        </div>
        <span className={cn("mt-4 text-[10px] uppercase tracking-[0.3em] font-bold opacity-40", isLightTheme ? "text-sky-600" : "text-slate-400")}>
          Initializing System...
        </span>
      </div>
    </motion.div>
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(65);
  const [isPlaying, setIsPlaying] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Rivera",
    role: "Senior Creative Engineer",
    rating: 4.9,
    image: "https://picsum.photos/seed/alex/400/400",
    description: "Crafting digital experiences that bridge the gap between imagination and reality. Specialized in high-performance motion design and immersive 3D interfaces."
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  const handleDockClick = (id: string) => {
    if (id === 'theme') {
      toggleTheme();
    } else {
      setActivePage(id);
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home 
            isLightTheme={isLightTheme} 
            tags={tags} 
            setActivePage={setActivePage}
            volume={volume}
            setVolume={setVolume}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            profileData={profileData}
          />
        );
      case 'search':
        return <Search isLightTheme={isLightTheme} />;
      case 'apps':
        return <Apps isLightTheme={isLightTheme} setActivePage={setActivePage} />;
      case 'gallery':
        return <Gallery isLightTheme={isLightTheme} />;
      case 'messages':
        return <Messages isLightTheme={isLightTheme} />;
      case 'settings':
        return <Settings isLightTheme={isLightTheme} />;
      case 'profile':
        return <Profile isLightTheme={isLightTheme} profileData={profileData} setProfileData={setProfileData} />;
      case 'power':
        return <Power isLightTheme={isLightTheme} />;
      default:
        return <div className="text-white text-center py-20">Page not found</div>;
    }
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-700 overflow-x-hidden overflow-y-auto selection:bg-indigo-500 selection:text-white",
      isLightTheme ? "bg-[#e2e8f0]" : "bg-slate-950"
    )}>
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={cn(
          "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000",
          isLightTheme ? "bg-sky-400/10" : "bg-indigo-900/20"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000",
          isLightTheme ? "bg-blue-400/10" : "bg-purple-900/20"
        )} />
      </div>

      <AnimatePresence>
        {isLoading && <LoadingPage isLightTheme={isLightTheme} />}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-64 sm:pb-80">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 sm:mb-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {activePage !== 'home' && (
              <ArrowLeft className={cn("transition-transform group-hover:-translate-x-1", isLightTheme ? "text-sky-600" : "text-slate-400")} size={18} />
            )}
            <div className={cn(
              "relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 group-hover:rotate-12",
              isLightTheme ? "bg-sky-600 shadow-xl shadow-sky-200" : "bg-indigo-600 shadow-xl shadow-indigo-900/40"
            )}>
              <span className="text-white font-black text-lg sm:text-xl italic">L</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col">
              <h1 className={cn("font-black tracking-[0.2em] uppercase text-xs sm:text-sm leading-none", isLightTheme ? "text-sky-900" : "text-white")}>
                {activePage === 'home' ? 'Lunia290 OS' : activePage}
              </h1>
              <span className={cn("text-[8px] uppercase tracking-[0.4em] font-bold opacity-40", isLightTheme ? "text-sky-600" : "text-slate-400")}>
                Version 3.0.0
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={cn(
              "font-mono text-xs sm:text-sm px-4 py-2 rounded-2xl border backdrop-blur-md transition-all duration-500",
              isLightTheme 
                ? "text-sky-600 bg-white/50 border-sky-100 shadow-sm" 
                : "text-slate-200 bg-slate-900/50 border-slate-800 shadow-xl"
            )}
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* App Dock */}
      <Dock activeId={activePage} onItemClick={handleDockClick} isLightTheme={isLightTheme} />

      {/* Floating Particles/Elements */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0 
            }}
            animate={{ 
              y: [null, -150],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 6 + Math.random() * 6, 
              repeat: Infinity,
              ease: "linear"
            }}
            className={cn("absolute w-0.5 h-0.5 rounded-full", isLightTheme ? "bg-sky-400" : "bg-indigo-400")}
          />
        ))}
      </div>
    </div>
  );
}
