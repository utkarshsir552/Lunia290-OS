import React, { useState } from 'react';
import { Search as SearchIcon, ArrowRight, TrendingUp, History } from 'lucide-react';
import { Widget } from '../components/Widget';
import { cn } from '../lib/utils';

interface SearchProps {
  isLightTheme: boolean;
}

export const Search: React.FC<SearchProps> = ({ isLightTheme }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    // Mock search results
    setResults([
      `Result for "${query}" - System Update`,
      `Result for "${query}" - Creative Assets`,
      `Result for "${query}" - Documentation`,
      `Result for "${query}" - Project Archive`
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="relative group">
        <div className={cn(
          "absolute -inset-1 rounded-[2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200",
          isLightTheme ? "bg-sky-400" : "bg-indigo-600"
        )} />
        <div className={cn(
          "relative flex items-center p-2 rounded-[1.8rem] border shadow-2xl transition-all",
          isLightTheme ? "bg-white border-sky-100" : "bg-slate-900 border-slate-800"
        )}>
          <SearchIcon className={cn("ml-4", isLightTheme ? "text-sky-400" : "text-slate-500")} size={24} />
          <input 
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search Lunia290 OS..." 
            className={cn(
              "flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg font-medium",
              isLightTheme ? "text-sky-900 placeholder:text-sky-200" : "text-white placeholder:text-slate-600"
            )}
            autoFocus
          />
          <button 
            onClick={handleSearch}
            className={cn(
              "p-3 rounded-2xl transition-all",
              isLightTheme ? "bg-sky-600 text-white hover:bg-sky-700" : "bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Widget title="Recent Searches" isLightTheme={isLightTheme}>
          <div className="space-y-3">
            {results.length > 0 ? results.map((res, i) => (
              <div key={i} className={cn(
                "p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all",
                isLightTheme ? "hover:bg-sky-50 text-sky-900" : "hover:bg-slate-800 text-slate-300"
              )}>
                <History size={14} className="opacity-40" />
                <span className="text-xs font-medium">{res}</span>
              </div>
            )) : (
              ['System Preferences', 'Project Alpha', 'User Settings'].map((item, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all",
                  isLightTheme ? "hover:bg-sky-50 text-sky-900" : "hover:bg-slate-800 text-slate-300"
                )}>
                  <History size={14} className="opacity-40" />
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))
            )}
          </div>
        </Widget>

        <Widget title="Trending" isLightTheme={isLightTheme}>
          <div className="space-y-3">
            {['Lunia290 OS 3.0', '3D UI Kit', 'Motion Design'].map((item, i) => (
              <div key={i} className={cn(
                "p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all",
                isLightTheme ? "hover:bg-sky-50 text-sky-900" : "hover:bg-slate-800 text-slate-300"
              )}>
                <TrendingUp size={14} className="text-emerald-500" />
                <span className="text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </div>
  );
};
