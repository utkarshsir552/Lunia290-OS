import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Eye, Wifi, Bluetooth, Battery, Moon, Sun, Monitor, Lock, Globe, Volume2 } from 'lucide-react';
import { Widget } from '../components/Widget';
import { cn } from '../lib/utils';

interface SettingsProps {
  isLightTheme: boolean;
}

export const Settings: React.FC<SettingsProps> = ({ isLightTheme }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: !isLightTheme,
    wifi: true,
    bluetooth: false,
    autoBrightness: true,
    location: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: 'Connectivity',
      items: [
        { id: 'wifi', label: 'Wi-Fi', icon: Wifi, color: 'bg-blue-500', value: settings.wifi },
        { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, color: 'bg-indigo-500', value: settings.bluetooth },
      ]
    },
    {
      title: 'Appearance',
      items: [
        { id: 'darkMode', label: 'Dark Mode', icon: Moon, color: 'bg-slate-800', value: settings.darkMode },
        { id: 'autoBrightness', label: 'Auto Brightness', icon: Sun, color: 'bg-amber-500', value: settings.autoBrightness },
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, color: 'bg-rose-500', value: settings.notifications },
        { id: 'location', label: 'Location Services', icon: Globe, color: 'bg-emerald-500', value: settings.location },
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className={cn("text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-2", isLightTheme ? "text-sky-900" : "text-white")}>
              {section.title}
            </h3>
            <Widget isLightTheme={isLightTheme} className="p-2">
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleSetting(item.id as any)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all",
                      isLightTheme ? "hover:bg-sky-50" : "hover:bg-slate-800/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg", item.color)}>
                        <item.icon size={16} />
                      </div>
                      <span className={cn("text-xs font-bold", isLightTheme ? "text-sky-900" : "text-slate-200")}>{item.label}</span>
                    </div>
                    <div className={cn(
                      "w-10 h-5 rounded-full relative transition-colors duration-300",
                      item.value 
                        ? (isLightTheme ? "bg-sky-600" : "bg-indigo-600")
                        : (isLightTheme ? "bg-slate-200" : "bg-slate-800")
                    )}>
                      <motion.div 
                        animate={{ x: item.value ? 20 : 2 }}
                        className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Widget>
          </div>
        ))}

        {/* System Info Widget */}
        <div className="col-span-1 md:col-span-2">
          <Widget title="System Information" isLightTheme={isLightTheme}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
              {[
                { label: 'Storage', value: '128GB / 512GB', icon: Battery },
                { label: 'Memory', value: '16GB LPDDR5', icon: Monitor },
                { label: 'Processor', value: 'Zenith Z1 Chip', icon: Lock },
                { label: 'OS Version', value: '2.5.0 (Stable)', icon: Globe }
              ].map((info, i) => (
                <div key={i} className="space-y-1">
                  <span className={cn("text-[8px] font-bold uppercase tracking-widest opacity-40", isLightTheme ? "text-sky-900" : "text-slate-400")}>{info.label}</span>
                  <p className={cn("text-xs font-black", isLightTheme ? "text-sky-600" : "text-white")}>{info.value}</p>
                </div>
              ))}
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};
