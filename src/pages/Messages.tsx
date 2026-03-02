import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, MoreVertical, Phone, Video, Smile, Paperclip } from 'lucide-react';
import { Widget } from '../components/Widget';
import { cn } from '../lib/utils';

const chats = [
  { id: 1, name: 'Komi Shouko', message: 'The design looks amazing!', time: '2m ago', online: true, unread: 2, avatar: 'https://picsum.photos/seed/komi/100/100' },
  { id: 2, name: 'Tadano Hitohito', message: 'Did you see the new update?', time: '1h ago', online: false, unread: 0, avatar: 'https://picsum.photos/seed/tadano/100/100' },
  { id: 3, name: 'Najimi Osana', message: 'PARTY TONIGHT!!! 🥳', time: '3h ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/najimi/100/100' },
  { id: 4, name: 'Agari Himiko', message: 'I finished the report...', time: '5h ago', online: false, unread: 1, avatar: 'https://picsum.photos/seed/agari/100/100' },
  { id: 5, name: 'Manbagi Rumiko', message: 'Let\'s go shopping!', time: '1d ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/rumiko/100/100' },
  { id: 6, name: 'Katai Makoto', message: 'Want to hit the gym?', time: '2d ago', online: false, unread: 0, avatar: 'https://picsum.photos/seed/katai/100/100' },
  { id: 7, name: 'Nakanaka Omoharu', message: 'The dragon awakens...', time: '3d ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/nakanaka/100/100' },
  { id: 8, name: 'Ren Yamai', message: 'Where is Komi-san?', time: '4d ago', online: false, unread: 0, avatar: 'https://picsum.photos/seed/yamai/100/100' },
  { id: 9, name: 'Onemine Nene', message: 'Need any help with that?', time: '5d ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/onemine/100/100' },
  { id: 10, name: 'Otori Kaede', message: 'Slow... and... steady...', time: '1w ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/otori/100/100' },
  { id: 11, name: 'Inaka Nokoko', message: 'The countryside is peaceful.', time: '2w ago', online: false, unread: 0, avatar: 'https://picsum.photos/seed/inaka/100/100' },
  { id: 12, name: 'Ase Shibuki', message: 'I\'m a bit nervous...', time: '2w ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/ase/100/100' },
  { id: 13, name: 'Naruse Shisuto', message: 'Look at my beautiful face!', time: '3w ago', online: false, unread: 0, avatar: 'https://picsum.photos/seed/naruse/100/100' },
  { id: 14, name: 'Kometani Chushaku', message: 'I will take notes.', time: '3w ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/kometani/100/100' },
  { id: 15, name: 'Sato Amami', message: 'Want some sweets?', time: '1m ago', online: true, unread: 0, avatar: 'https://picsum.photos/seed/sato/100/100' },
];

const initialMessages = [
  { id: 1, text: "Hey! How's the Lunia290 OS project going?", sender: 'them', time: '10:00 AM' },
  { id: 2, text: "It's going great! Just finished the message UI.", sender: 'me', time: '10:02 AM' },
  { id: 3, text: "That's awesome! Can't wait to see it.", sender: 'them', time: '10:05 AM' },
];

interface MessagesProps {
  isLightTheme: boolean;
}

export const Messages: React.FC<MessagesProps> = ({ isLightTheme }) => {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="h-[calc(100vh-280px)] lg:h-[600px] flex flex-col lg:flex-row gap-6 pb-10">
      {/* Sidebar */}
      <div className="w-full lg:w-[400px] h-[350px] lg:h-full flex flex-col gap-4 shrink-0">
        <Widget isLightTheme={isLightTheme} className="flex-1 p-4 flex flex-col gap-5 overflow-hidden">
          <div className="relative">
            <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2", isLightTheme ? "text-sky-400" : "text-slate-500")} size={18} />
            <input 
              placeholder="Search messages..." 
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-2xl text-xs font-bold outline-none transition-all",
                isLightTheme ? "bg-sky-50 focus:bg-white border border-sky-100" : "bg-slate-800/50 focus:bg-slate-800 border border-slate-700"
              )}
            />
          </div>

          <div className={cn(
            "flex-1 overflow-y-auto space-y-3 mt-[5px] pr-2 custom-scrollbar",
            isLightTheme ? "scrollbar-sky" : "scrollbar-slate"
          )}>
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedChat(chat)}
                className={cn(
                  "p-4 rounded-[1.8rem] cursor-pointer transition-all flex items-center gap-4",
                  selectedChat.id === chat.id 
                    ? (isLightTheme ? "bg-sky-600 text-white shadow-xl shadow-sky-200" : "bg-indigo-600 text-white shadow-xl shadow-indigo-900/40")
                    : (isLightTheme ? "hover:bg-sky-50" : "hover:bg-slate-800/50")
                )}
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-2xl object-cover" />
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black tracking-tight">{chat.name}</span>
                    <span className={cn("text-[9px] font-bold opacity-50", selectedChat.id === chat.id ? "text-white" : "")}>{chat.time}</span>
                  </div>
                  <p className={cn("text-[10px] truncate font-medium opacity-60", selectedChat.id === chat.id ? "text-white" : "")}>{chat.message}</p>
                </div>
                {chat.unread > 0 && selectedChat.id !== chat.id && (
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-black text-white">{chat.unread}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Widget>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <Widget isLightTheme={isLightTheme} className="flex-1 p-0 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className={cn(
            "px-8 py-5 border-b flex items-center justify-between",
            isLightTheme ? "border-sky-100" : "border-slate-800"
          )}>
            <div className="flex items-center gap-5">
              <img src={selectedChat.avatar} alt={selectedChat.name} className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <h3 className={cn("text-base font-black tracking-tight", isLightTheme ? "text-sky-900" : "text-white")}>{selectedChat.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">Active Now</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[Phone, Video, MoreVertical].map((Icon, i) => (
                <button key={i} className={cn(
                  "p-3 rounded-2xl transition-all hover:scale-110",
                  isLightTheme ? "hover:bg-sky-50 text-sky-600" : "hover:bg-slate-800 text-slate-400"
                )}>
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Messages List */}
          <div className={cn(
            "flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar",
            isLightTheme ? "scrollbar-sky" : "scrollbar-slate"
          )}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex flex-col max-w-[75%]",
                  msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "px-5 py-4 rounded-[1.8rem] text-[13px] font-bold leading-relaxed shadow-sm",
                  msg.sender === 'me' 
                    ? (isLightTheme ? "bg-sky-600 text-white rounded-tr-none" : "bg-indigo-600 text-white rounded-tr-none")
                    : (isLightTheme ? "bg-slate-100 text-sky-900 rounded-tl-none" : "bg-slate-800 text-slate-200 rounded-tl-none")
                )}>
                  {msg.text}
                </div>
                <span className="text-[9px] font-black opacity-40 mt-2 uppercase tracking-[0.2em]">{msg.time}</span>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className={cn(
            "p-6 border-t",
            isLightTheme ? "border-sky-100 bg-slate-50/50" : "border-slate-800 bg-slate-900/50"
          )}>
            <div className="flex items-center gap-4">
              <button className={cn(
                "p-3 rounded-2xl transition-all hover:scale-110 shrink-0",
                isLightTheme ? "text-sky-400 hover:bg-sky-100" : "text-slate-500 hover:bg-slate-800"
              )}>
                <Paperclip size={22} />
              </button>
              <div className="flex-1 relative">
                <input 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..." 
                  className={cn(
                    "w-full pl-6 pr-14 py-4 rounded-[1.8rem] text-xs font-bold outline-none transition-all shadow-inner",
                    isLightTheme ? "bg-white border border-sky-100 focus:border-sky-400" : "bg-slate-800 border border-slate-700 focus:border-indigo-500"
                  )}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600 transition-colors">
                  <Smile size={20} />
                </button>
              </div>
              <button 
                onClick={handleSend}
                className={cn(
                  "p-4 rounded-[1.5rem] transition-all shadow-xl hover:scale-105 active:scale-95 shrink-0",
                  isLightTheme ? "bg-sky-600 text-white hover:bg-sky-700" : "bg-indigo-600 text-white hover:bg-indigo-700"
                )}
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
};
