import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Globe, MapPin, Github, Twitter, Linkedin, Edit3, Check } from 'lucide-react';
import { Widget } from '../components/Widget';
import { cn } from '../lib/utils';

interface ProfileProps {
  isLightTheme: boolean;
  profileData: {
    name: string;
    role: string;
    rating: number;
    image: string;
    description: string;
  };
  setProfileData: (data: any) => void;
}

export const Profile: React.FC<ProfileProps> = ({ isLightTheme, profileData, setProfileData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(profileData);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Profile Header */}
        <div className="col-span-12">
          <Widget isLightTheme={isLightTheme} className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative group">
                <div className={cn(
                  "w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 shadow-2xl",
                  isLightTheme ? "border-sky-100" : "border-white/10"
                )}>
                  <img src={profileData.image} alt={profileData.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className={cn("text-3xl font-black tracking-tight", isLightTheme ? "text-sky-900" : "text-white")}>
                      {isEditing ? (
                        <input 
                          value={tempData.name} 
                          onChange={e => setTempData({...tempData, name: e.target.value})}
                          className="bg-transparent border-b border-sky-500 outline-none w-full"
                        />
                      ) : profileData.name}
                    </h2>
                    <p className={cn("text-sm font-bold uppercase tracking-[0.2em] opacity-60", isLightTheme ? "text-sky-600" : "text-slate-400")}>
                      {isEditing ? (
                        <input 
                          value={tempData.role} 
                          onChange={e => setTempData({...tempData, role: e.target.value})}
                          className="bg-transparent border-b border-sky-500 outline-none w-full mt-2"
                        />
                      ) : profileData.role}
                    </p>
                  </div>
                  <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 mx-auto md:mx-0",
                      isLightTheme 
                        ? "bg-sky-600 text-white hover:bg-sky-700" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    )}
                  >
                    {isEditing ? <Check size={14} /> : <Edit3 size={14} />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className={cn("text-sm leading-relaxed max-w-2xl", isLightTheme ? "text-sky-800/70" : "text-slate-400")}>
                  {isEditing ? (
                    <textarea 
                      value={tempData.description} 
                      onChange={e => setTempData({...tempData, description: e.target.value})}
                      className="bg-transparent border border-sky-500/30 rounded-lg p-2 outline-none w-full h-24 resize-none"
                    />
                  ) : profileData.description}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                  {[
                    { icon: Mail, label: 'alex@zenith.os' },
                    { icon: Globe, label: 'zenith.os' },
                    { icon: MapPin, label: 'San Francisco, CA' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 opacity-60">
                      <item.icon size={14} className={isLightTheme ? "text-sky-600" : "text-indigo-400"} />
                      <span className={cn("text-xs font-medium", isLightTheme ? "text-sky-900" : "text-white")}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Widget>
        </div>

        {/* Stats & Socials */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <Widget title="Social Presence" isLightTheme={isLightTheme}>
            <div className="space-y-4">
              {[
                { icon: Github, label: 'GitHub', value: '@arivera' },
                { icon: Twitter, label: 'Twitter', value: '@alex_creative' },
                { icon: Linkedin, label: 'LinkedIn', value: 'alex-rivera-dev' }
              ].map((social, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg border transition-colors",
                      isLightTheme ? "bg-sky-50 border-sky-100 text-sky-600" : "bg-slate-800 border-slate-700 text-slate-400 group-hover:text-white"
                    )}>
                      <social.icon size={16} />
                    </div>
                    <span className={cn("text-xs font-bold", isLightTheme ? "text-sky-900" : "text-slate-300")}>{social.label}</span>
                  </div>
                  <span className={cn("text-[10px] opacity-40", isLightTheme ? "text-sky-600" : "text-slate-500")}>{social.value}</span>
                </div>
              ))}
            </div>
          </Widget>

          <Widget title="System Stats" isLightTheme={isLightTheme}>
            <div className="space-y-4">
              {[
                { label: 'Projects Completed', value: '42' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Experience', value: '8 Years' }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className={cn("text-[10px] uppercase font-bold tracking-widest opacity-40", isLightTheme ? "text-sky-900" : "text-slate-400")}>{stat.label}</span>
                  <span className={cn("text-sm font-black", isLightTheme ? "text-sky-600" : "text-white")}>{stat.value}</span>
                </div>
              ))}
            </div>
          </Widget>
        </div>

        {/* Skills & Experience */}
        <div className="col-span-12 md:col-span-8">
          <Widget title="Core Expertise" isLightTheme={isLightTheme} className="h-full">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Motion Design', value: 95 },
                { label: 'React Architecture', value: 90 },
                { label: '3D Rendering', value: 85 },
                { label: 'User Experience', value: 88 }
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className={cn("text-xs font-bold", isLightTheme ? "text-sky-900" : "text-slate-200")}>{skill.label}</span>
                    <span className={cn("text-[10px] font-mono opacity-40", isLightTheme ? "text-sky-600" : "text-slate-500")}>{skill.value}%</span>
                  </div>
                  <div className={cn("h-1.5 rounded-full overflow-hidden", isLightTheme ? "bg-sky-100" : "bg-slate-800")}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full", isLightTheme ? "bg-sky-600" : "bg-indigo-500")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};
