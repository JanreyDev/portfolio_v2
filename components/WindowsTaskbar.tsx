"use client";

import React, { useState, useEffect } from 'react';
import {
    Folder,
    Globe,
    Terminal as TerminalIcon,
    MessageCircle,
    Mail,
    Music,
    Image,
    Settings,
    FileText,
    Calculator,
    Search,
    Wifi,
    Volume2,
    Battery,
    ChevronUp,
    Minus,
    Square,
    X
} from 'lucide-react';

interface TaskbarItem {
    icon: React.ReactNode;
    name: string;
    isActive?: boolean;
    isMinimized?: boolean;
}

export function WindowsTaskbar() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isStartOpen, setIsStartOpen] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const taskbarItems: TaskbarItem[] = [
        { icon: <Folder size={20} />, name: 'File Explorer', isActive: true },
        { icon: <Globe size={20} />, name: 'Microsoft Edge' },
        { icon: <TerminalIcon size={20} />, name: 'Terminal', isActive: true },
        { icon: <MessageCircle size={20} />, name: 'Teams' },
        { icon: <Mail size={20} />, name: 'Outlook' },
        { icon: <Music size={20} />, name: 'Spotify' },
        { icon: <Image size={20} />, name: 'Photos' },
        { icon: <FileText size={20} />, name: 'Word' },
        { icon: <Settings size={20} />, name: 'Settings' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Taskbar */}
            <div className="h-12 bg-[#202020]/95 backdrop-blur-sm flex items-center px-2 border-t border-white/10 shadow-2xl">

                {/* Start Button */}
                <button
                    onClick={() => setIsStartOpen(!isStartOpen)}
                    className="h-9 w-9 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors mr-1"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Windows_logo_-_2021.svg"
                        alt="Windows"
                        className="w-5 h-5"
                    />
                </button>

                {/* Search */}
                <div className="h-9 flex-1 max-w-md mx-2 bg-white/10 hover:bg-white/15 rounded-md flex items-center px-3 cursor-pointer transition-colors">
                    <Search size={16} className="text-white/60 mr-2" />
                    <span className="text-white/60 text-sm">Search for apps, settings, and documents</span>
                </div>

                {/* Taskbar Items */}
                <div className="flex items-center gap-0.5 flex-1 ml-2">
                    {taskbarItems.map((item, index) => (
                        <div
                            key={item.name}
                            className={`
                group relative h-10 px-2 flex items-center gap-2 cursor-pointer rounded-md transition-all
                ${item.isActive ? 'bg-white/20' : 'hover:bg-white/10'}
              `}
                        >
                            <div className={`
                w-1 h-1 rounded-full absolute top-1 left-1/2 -translate-x-1/2
                ${item.isActive ? 'bg-blue-400' : 'opacity-0 group-hover:opacity-100'}
                transition-opacity
              `} />
                            <div className={`
                text-white
                ${item.isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : ''}
              `}>
                                {item.icon}
                            </div>
                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#333] text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                {item.name}
                            </div>
                        </div>
                    ))}
                </div>

                {/* System Tray */}
                <div className="flex items-center gap-1 ml-2">
                    {/* Hidden icons */}
                    <div className="h-9 w-6 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer">
                        <ChevronUp size={16} className="text-white/70" />
                    </div>

                    {/* System icons */}
                    <div className="flex items-center gap-0.5 mr-2">
                        <div className="h-9 w-6 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer">
                            <Wifi size={16} className="text-white" />
                        </div>
                        <div className="h-9 w-6 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer">
                            <Volume2 size={16} className="text-white" />
                        </div>
                        <div className="h-9 w-8 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer">
                            <Battery size={16} className="text-white" />
                        </div>
                    </div>

                    {/* Date/Time */}
                    <div className="h-9 px-2 flex flex-col items-end justify-center hover:bg-white/10 rounded-md cursor-pointer min-w-[90px]">
                        <span className="text-xs text-white">{currentTime}</span>
                        <span className="text-xs text-white/70">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>

                    {/* Show desktop line */}
                    <div className="w-1.5 h-9 hover:bg-white/20 cursor-pointer ml-1" />
                </div>
            </div>

            {/* Start Menu (popup) */}
            {isStartOpen && (
                <div className="absolute bottom-12 left-0 w-[640px] h-[700px] bg-[#202020]/95 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl overflow-hidden">
                    {/* Pinned apps */}
                    <div className="p-4">
                        <h3 className="text-white/60 text-xs font-semibold mb-3">Pinned</h3>
                        <div className="grid grid-cols-6 gap-2">
                            {[
                                { icon: <Globe size={28} />, name: 'Edge' },
                                { icon: <TerminalIcon size={28} />, name: 'Terminal' },
                                { icon: <Mail size={28} />, name: 'Outlook' },
                                { icon: <MessageCircle size={28} />, name: 'Teams' },
                                { icon: <FileText size={28} />, name: 'Word' },
                                { icon: <Settings size={28} />, name: 'Settings' },
                                { icon: <Calculator size={28} />, name: 'Calculator' },
                                { icon: <Folder size={28} />, name: 'Files' },
                                { icon: <Image size={28} />, name: 'Photos' },
                                { icon: <Music size={28} />, name: 'Spotify' },
                            ].map((app, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
                                >
                                    <div className="text-white/80">{app.icon}</div>
                                    <span className="text-white text-xs">{app.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended */}
                    <div className="px-4 pb-4">
                        <h3 className="text-white/60 text-xs font-semibold mb-3">Recommended</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { name: 'portfolio.pdf', time: '2h ago' },
                                { name: 'resume.docx', time: 'Yesterday' },
                                { name: 'project-notes.txt', time: 'Last week' },
                                { name: 'screenshot.png', time: 'Last week' },
                            ].map((file, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
                                >
                                    <FileText size={24} className="text-blue-400" />
                                    <div className="flex flex-col">
                                        <span className="text-white text-sm">{file.name}</span>
                                        <span className="text-white/50 text-xs">{file.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User profile */}
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#2a2a2a] flex items-center justify-between px-4 border-t border-white/5">
                        <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-md cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                JM
                            </div>
                            <span className="text-white text-sm">Janrey Mina</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-md">
                                <Settings size={18} className="text-white" />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-md">
                                <Minus size={18} className="text-white" />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-md">
                                <Square size={14} className="text-white" />
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center hover:bg-red-500 rounded-md">
                                <X size={18} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
