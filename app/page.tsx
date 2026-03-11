"use client";

import { Terminal } from "@/components/Terminal";
import { executeCommand } from "@/components/commands";
import { ChevronDown, ChevronRight, Ellipsis, FileCode, FileCode2, FileText, Folder, GitBranch, House, Menu, Monitor, Plus, Search, Settings, TerminalSquare, User, X } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DUMMY_CODE = `import React, { useState, useEffect } from 'react';
import { executeCommand } from '../utils/commands';
import { CommandLine } from './CommandLine';

export const PortfolioLayer = () => {
    const [systemReady, setSystemReady] = useState(false);
    const [activeConnections, setActiveConnections] = useState(0);

    useEffect(() => {
        // Boot sequence initiation
        console.log("[SYSTEM] Booting portfolio core v2.4.1...");
        const init = async () => {
            await initializeFileSystem();
            await connectToCyberSpace();
            setSystemReady(true);
        };
        init();
    }, []);

    const handleInput = async (cmd: string) => {
        if (!systemReady) return "System not ready.";
        return await executeCommand(cmd, { env: 'production' });
    };

    return (
        <div className="matrix-container relative overflow-hidden">
            <CommandLine 
                onInput={handleInput} 
                status={systemReady ? 'ONLINE' : 'BOOTING'}
            />
        </div>
    );
};

// ... more internal methods ...
function initializeFileSystem() { return Promise.resolve(); }
function connectToCyberSpace() { return Promise.resolve(); }
`;

type UserMode = "advanced" | "normal";
type EntryPhase = "splash" | "chooser" | "ready";

const SPLASH_DURATION_MS = 3000;

export default function Home() {
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFile, setActiveFile] = useState("page.tsx");
  const [entryPhase, setEntryPhase] = useState<EntryPhase>("splash");
  const [userMode, setUserMode] = useState<UserMode | null>(null);
  const [isModeChooserOpen, setIsModeChooserOpen] = useState(false);
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
  const [terminalSessionKey, setTerminalSessionKey] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const advancedModeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setEntryPhase("chooser");
    }, SPLASH_DURATION_MS);

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  const applyUserMode = useCallback((mode: UserMode) => {
    setUserMode(mode);
    if (mode === "advanced") {
      setTerminalSessionKey((prev) => prev + 1);
      setTerminalMinimized(false);
    } else {
      setTerminalMinimized(true);
    }
    setEntryPhase("ready");
    setIsModeChooserOpen(false);
  }, []);

  const openModeChooser = useCallback(() => {
    if (entryPhase === "ready") {
      setIsModeChooserOpen(true);
    }
  }, [entryPhase]);

  const closeModeChooser = useCallback(() => {
    if (entryPhase === "ready") {
      setIsModeChooserOpen(false);
    }
  }, [entryPhase]);

  const isChooserVisible = entryPhase === "chooser" || isModeChooserOpen;

  useEffect(() => {
    if (!isChooserVisible) return;
    const focusTimer = setTimeout(() => {
      advancedModeButtonRef.current?.focus();
    }, 20);
    return () => clearTimeout(focusTimer);
  }, [isChooserVisible]);

  useEffect(() => {
    if (!isModeChooserOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModeChooserOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModeChooserOpen]);

  const handleMinimize = useCallback(() => {
    setIsAnimating(true);
    setTerminalMinimized(true);
    setActiveFile("Home.md");
    setTimeout(() => setIsAnimating(false), 600);
  }, []);

  const handleRestore = useCallback(() => {
    setTerminalMinimized(false);
  }, []);

  const handleSidebarItemClick = (file: string) => {
    setActiveFile(file);
    setMobileExplorerOpen(false);
    if (file === "page.tsx" && terminalMinimized) {
      setTerminalMinimized(false);
    }
  };

  const navItems = [
    { name: "Home.md", command: "home", icon: <House size={15} className="text-cyan-300" /> },
    { name: "About.md", command: "about", icon: <FileText size={15} className="text-emerald-300" /> },
    { name: "Skills.md", command: "skills", icon: <FileText size={15} className="text-blue-300" /> },
    { name: "Services.md", command: "services", icon: <FileText size={15} className="text-orange-300" /> },
    { name: "Projects.md", command: "projects", icon: <FileText size={15} className="text-amber-300" /> },
    { name: "Contact.md", command: "contact", icon: <FileText size={15} className="text-rose-300" /> },
  ];
  const editorTabs = [
    { name: "page.tsx", icon: <FileCode2 size={14} className="text-amber-300" /> },
    ...navItems
  ];
  const activeDocumentItem = navItems.find((item) => item.name === activeFile);
  const showDocumentView = Boolean(activeDocumentItem);
  const documentContent = activeDocumentItem ? executeCommand(activeDocumentItem.command) : null;
  const getFileIcon = (name: string) => {
    if (name.endsWith(".md")) return <FileText size={15} className="text-cyan-300" />;
    if (name.endsWith(".tsx")) return <FileCode2 size={15} className="text-amber-300" />;
    return <FileCode size={15} className="text-slate-300" />;
  };
  const fileStatus: Record<string, string> = {
    "page.tsx": "M",
    "Home.md": "U",
    "About.md": "U",
    "Skills.md": "U",
    "Services.md": "U",
    "Projects.md": "U",
    "Contact.md": "U",
    "Terminal.tsx": "U",
    "TerminalCard.tsx": "U",
  };
  const getStatusClass = (status: string) => {
    if (status === "M") return "text-amber-300";
    if (status === "U") return "text-emerald-300";
    return "text-ide-text/40";
  };

  return (
    <main className="w-full h-[100dvh] flex bg-ide-bg text-ide-text overflow-hidden font-sans relative">
      {/* Activity Bar (Icon sidebar) */}
      <div className="hidden md:flex w-12 h-full bg-ide-activity flex-col items-center py-4 gap-6 shrink-0 z-0">
        <div className="p-2 cursor-pointer text-white/90 border-l-2 border-primary"><FileCode size={24} /></div>
        <div className="p-2 cursor-pointer text-white/60 hover:text-white/90"><Search size={24} /></div>
        <div className="p-2 cursor-pointer text-white/60 hover:text-white/90"><GitBranch size={24} /></div>
        <AnimatePresence>
          {terminalMinimized && (
            <motion.button
              onClick={handleRestore}
              initial={{ opacity: 0, y: -8, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className="p-2 cursor-pointer text-emerald-400 border-l-2 border-emerald-400 bg-white/5 hover:bg-white/10 rounded-r-md"
              aria-label="Restore terminal"
              title="Restore terminal"
            >
              <TerminalSquare size={24} />
            </motion.button>
          )}
        </AnimatePresence>
        <div className="flex-grow"></div>
        <div className="p-2 cursor-pointer text-white/60 hover:text-white/90"><Settings size={24} /></div>
      </div>

      {mobileExplorerOpen && (
        <button
          aria-label="Close explorer"
          className="md:hidden absolute inset-0 z-30 bg-black/45"
          onClick={() => setMobileExplorerOpen(false)}
        />
      )}

      {/* Primary Sidebar (File tree) */}
      <div
        ref={sidebarRef}
        className={`w-72 md:w-64 h-full bg-[#111418] flex flex-col border-r border-[#2b3038] shrink-0 z-40 md:z-0 transition-transform duration-200 ${mobileExplorerOpen ? "absolute left-0 top-0 translate-x-0" : "absolute left-0 top-0 -translate-x-full"
          } md:relative md:translate-x-0`}
      >
        <div className="px-3 pt-4 pb-2 text-xs tracking-widest font-semibold uppercase text-[#aab4c0]">Explorer</div>
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#2b3038]">
          <div className="flex items-center gap-1 text-sm font-semibold text-[#d7dee8]">
            <ChevronDown size={14} className="text-[#8fa0b5]" />
            JANREYDEV
          </div>
          <div className="flex items-center gap-2 text-[#8fa0b5]">
            <Plus size={14} className="cursor-pointer hover:text-white" />
            <Ellipsis size={14} className="cursor-pointer hover:text-white" />
            <X size={14} className="cursor-pointer hover:text-white md:hidden" onClick={() => setMobileExplorerOpen(false)} />
          </div>
        </div>

        <div className="flex flex-col text-sm w-full pt-2 overflow-y-auto">
          <div className="flex items-center gap-2 px-4 py-1.5 text-[#8fa0b5]">
            <ChevronRight size={14} />
            <Folder size={15} className="text-[#7aa2f7]" />
            <span>.next</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 text-[#d7dee8]">
            <ChevronDown size={14} className="text-[#8fa0b5]" />
            <Folder size={15} className="text-[#7aa2f7]" />
            <span>app</span>
          </div>
          <div
            onClick={() => handleSidebarItemClick("page.tsx")}
            className={`flex items-center justify-between gap-2 pl-12 pr-3 py-1.5 cursor-pointer transition-colors ${activeFile === "page.tsx" ? "bg-[#264f78] text-white" : "hover:bg-white/5 text-[#c7d0db]"}`}
          >
            <span className="flex items-center gap-2">
              {getFileIcon("page.tsx")}
              <span>page.tsx</span>
            </span>
            <span className={`text-xs font-semibold ${getStatusClass(fileStatus["page.tsx"])}`}>{fileStatus["page.tsx"]}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 mt-1 text-[#d7dee8]">
            <ChevronDown size={14} className="text-[#8fa0b5]" />
            <Folder size={15} className="text-[#7aa2f7]" />
            <span>content</span>
          </div>
          {navItems.map(item => (
            <div
              key={item.name}
              onClick={() => handleSidebarItemClick(item.name)}
              className={`flex items-center justify-between gap-2 pl-12 pr-3 py-1.5 cursor-pointer transition-colors ${activeFile === item.name ? "bg-[#264f78] text-white" : "hover:bg-white/5 text-[#c7d0db]"}`}
            >
              <span className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </span>
              <span className={`text-xs font-semibold ${getStatusClass(fileStatus[item.name])}`}>{fileStatus[item.name]}</span>
            </div>
          ))}

          <div className="flex items-center gap-2 px-4 py-1.5 mt-1 text-[#d7dee8]">
            <ChevronDown size={14} className="text-[#8fa0b5]" />
            <Folder size={15} className="text-[#7aa2f7]" />
            <span>components</span>
          </div>
          <div
            onClick={() => handleSidebarItemClick("Terminal.tsx")}
            className={`flex items-center justify-between gap-2 pl-12 pr-3 py-1.5 cursor-pointer transition-colors ${activeFile === "Terminal.tsx" ? "bg-[#264f78] text-white" : "hover:bg-white/5 text-[#c7d0db]"}`}
          >
            <span className="flex items-center gap-2">
              {getFileIcon("Terminal.tsx")}
              <span>Terminal.tsx</span>
            </span>
            <span className={`text-xs font-semibold ${getStatusClass(fileStatus["Terminal.tsx"])}`}>{fileStatus["Terminal.tsx"]}</span>
          </div>
          <div
            onClick={() => handleSidebarItemClick("TerminalCard.tsx")}
            className={`flex items-center justify-between gap-2 pl-12 pr-3 py-1.5 cursor-pointer transition-colors ${activeFile === "TerminalCard.tsx" ? "bg-[#264f78] text-white" : "hover:bg-white/5 text-[#c7d0db]"}`}
          >
            <span className="flex items-center gap-2">
              {getFileIcon("TerminalCard.tsx")}
              <span>TerminalCard.tsx</span>
            </span>
            <span className={`text-xs font-semibold ${getStatusClass(fileStatus["TerminalCard.tsx"])}`}>{fileStatus["TerminalCard.tsx"]}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 mt-1 text-[#8fa0b5]">
            <ChevronRight size={14} />
            <Folder size={15} className="text-[#7aa2f7]" />
            <span>data</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 text-[#8fa0b5]">
            <ChevronRight size={14} />
            <Folder size={15} className="text-[#7aa2f7]" />
            <span>public</span>
          </div>
          <div className="flex items-center gap-2 px-8 py-1.5 text-[#8fa0b5]">
            <FileText size={14} className="text-[#8fa0b5]" />
            <span>README.md</span>
          </div>

        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 h-full flex flex-col bg-ide-bg relative z-10 w-full">
        <div className="md:hidden h-10 bg-ide-sidebar border-b border-ide-border/60 flex items-center justify-between px-3 shrink-0">
          <button
            onClick={() => setMobileExplorerOpen(true)}
            className="inline-flex items-center gap-2 text-ide-text/90 hover:text-ide-text"
            aria-label="Open explorer"
          >
            <Menu size={18} />
            <span className="text-xs uppercase tracking-[0.18em]">Explorer</span>
          </button>
          <div className="text-xs text-ide-text/70 truncate max-w-[45%]">{activeFile}</div>
          {terminalMinimized ? (
            <button
              onClick={handleRestore}
              className="text-emerald-300 hover:text-emerald-200"
              aria-label="Restore terminal"
              title="Restore terminal"
            >
              <TerminalSquare size={18} />
            </button>
          ) : (
            <span className="w-[18px]" />
          )}
        </div>

        {/* Editor Tabs */}
        <div className="h-10 bg-ide-sidebar flex items-center shadow-sm shrink-0 overflow-x-auto scrollbar-none">
          {editorTabs.map(tab => {
            const isActive = activeFile === tab.name;
            return (
              <div
                key={tab.name}
                onClick={() => handleSidebarItemClick(tab.name)}
                className={`h-full border-t-2 px-6 flex items-center gap-2 text-sm border-r border-ide-border transition-colors whitespace-nowrap ${isActive
                  ? "bg-ide-tab border-primary text-ide-text font-medium"
                  : "text-ide-text/60 cursor-pointer hover:bg-ide-tab/50 border-transparent"
                  }`}
              >
                {tab.icon ?? getFileIcon(tab.name)}
                <span>{tab.name}</span>
              </div>
            );
          })}
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 w-full bg-ide-bg relative overflow-hidden">
          <AnimatePresence mode="wait">
            {showDocumentView ? (
              <motion.div
                className="absolute inset-0 z-20"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                <div className="h-full w-full p-6 md:p-12">
                  <div className="flex h-full font-mono text-xs md:text-sm">
                    <div className="flex flex-col text-ide-text/20 text-right pr-6 select-none border-r border-ide-border/30 mr-6 shrink-0">
                      {Array.from({ length: 40 }).map((_, index) => (
                        <span key={index}>{index + 1}</span>
                      ))}
                    </div>
                    <div className="min-w-0 flex-1 overflow-y-auto text-sm text-foreground">
                      {documentContent}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Dummy Code Background */}
                <div className="absolute inset-0 p-6 md:p-12 font-mono text-xs md:text-sm text-ide-text/40 whitespace-pre overflow-hidden pointer-events-none select-none">
                  <div className="flex">
                    {/* Line numbers */}
                    <div className="flex flex-col text-ide-text/20 text-right pr-6 select-none border-r border-ide-border/30 mr-6">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </div>
                    {/* Code */}
                    <div>
                      {DUMMY_CODE.split("\n").map((line, i) => (
                        <div key={i}>{line || " "}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Centered Main Terminal with Animation */}
                <AnimatePresence mode="wait">
                  {entryPhase === "ready" && !terminalMinimized && (
                    <motion.div
                      ref={terminalRef}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.1,
                        x: -300,
                        y: 100,
                        transition: {
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1],
                          x: { duration: 0.6, ease: "easeInOut" },
                          y: { duration: 0.6, ease: "easeInOut" },
                          scale: { duration: 0.5, ease: "easeIn" },
                        },
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="absolute inset-0 flex items-center justify-center p-4 z-20"
                    >
                      <motion.div className="w-full max-w-5xl shadow-2xl relative" layoutId="terminal-window">
                        <Terminal key={terminalSessionKey} isMinimized={terminalMinimized} onMinimize={handleMinimize} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Flying Terminal Animation - Shows during minimize */}
                <AnimatePresence>
                  {entryPhase === "ready" && isAnimating && (
                    <motion.div
                      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 0.2,
                        x: -400,
                        y: 50,
                        transition: {
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      }}
                      exit={{ opacity: 0 }}
                      className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                    >
                      <div className="w-64 h-12 bg-terminal-bg border border-terminal-border rounded-lg shadow-2xl flex items-center px-4 gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-sm text-foreground font-mono">Terminal</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-ide-status w-full shrink-0 flex items-center px-3 text-xs text-white z-20">
          <div className="flex gap-4">
            <button
              onClick={openModeChooser}
              className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"
              aria-label="Change access mode"
              title="Change access mode"
            >
              Mode: {userMode === "advanced" ? "ADVANCED" : userMode === "normal" ? "NORMAL" : "SELECTING"}
            </button>
            <span className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 rounded transition-colors"><GitBranch size={12} /> main*</span>
            <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">0 errors, 0 warnings</span>
          </div>
          <div className="flex-grow"></div>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">Ln 27, Col 43</span>
            <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">Spaces: 4</span>
            <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">UTF-8</span>
            <span className="cursor-pointer hover:bg-white/20 px-1 rounded transition-colors">TypeScript React</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {entryPhase === "splash" && (
          <motion.div
            className="absolute inset-0 z-[70] overflow-hidden bg-[#03060a] text-emerald-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(16,185,129,0.22), rgba(16,185,129,0.22) 1px, transparent 1px, transparent 3px)",
              }}
            />
            <motion.div
              className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"
              animate={{ y: ["-110%", "110%"], opacity: [0.12, 0.2, 0.12] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center font-mono">
              <motion.p
                className="mb-2 text-xs tracking-[0.4em] text-emerald-400/70"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                SECURITY PROTOCOL OVERRIDE
              </motion.p>
              <motion.h2
                className="text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] text-emerald-300"
                animate={{ textShadow: ["0 0 8px rgba(16,185,129,0.35)", "0 0 16px rgba(16,185,129,0.7)", "0 0 8px rgba(16,185,129,0.35)"] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              >
                Unauthorized Access Detected
              </motion.h2>
              <div className="mt-6 max-w-xl space-y-1 text-left text-[11px] md:text-xs text-emerald-200/80">
                <p>&gt; Backdoor handshake established...</p>
                <p>&gt; Injecting shell payload... success</p>
                <p>&gt; Escalating privileges... root granted</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChooserVisible && (
          <motion.div
            className="absolute inset-0 z-[80] overflow-hidden flex items-center justify-center bg-black/70 px-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModeChooser}
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(16,185,129,0.22), rgba(16,185,129,0.22) 1px, transparent 1px, transparent 3px)",
              }}
              animate={{ opacity: [0.18, 0.32, 0.2, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(to bottom, transparent 0%, rgba(16,185,129,0.25) 50%, transparent 100%)",
                backgroundSize: "100% 35%",
                backgroundRepeat: "no-repeat",
              }}
              animate={{
                backgroundPosition: ["0% -120%", "0% 140%"],
                opacity: [0.1, 0.24, 0.12],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="access-mode-title"
              className="w-full max-w-2xl border border-emerald-400/40 bg-[#07131a] p-6 md:p-8 font-mono text-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-400/75">Access Gateway</p>
                  <h3 id="access-mode-title" className="mt-2 text-xl md:text-2xl font-bold text-emerald-300">Select Access Mode</h3>
                  <p className="mt-2 text-sm text-emerald-100/80">
                    Advanced opens the terminal immediately. Normal starts with IDE view and minimized terminal.
                  </p>
                </div>
                {isModeChooserOpen && (
                  <button
                    onClick={closeModeChooser}
                    className="rounded border border-emerald-400/40 px-2 py-1 text-xs hover:bg-emerald-400/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    aria-label="Close mode chooser"
                  >
                    ESC
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  ref={advancedModeButtonRef}
                  onClick={() => applyUserMode("advanced")}
                  className="group flex items-start gap-4 rounded-xl border border-emerald-400/60 bg-emerald-500/10 p-5 text-left transition-all hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 active:scale-95"
                >
                  <div className="shrink-0 p-3 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Monitor size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Advanced Mode</p>
                    <p className="mt-2 text-xs text-emerald-100/80 leading-relaxed">
                      Terminal-first experience for power users. Full shell access enabled.
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => applyUserMode("normal")}
                  className="group flex items-start gap-4 rounded-xl border border-cyan-300/40 bg-cyan-500/10 p-5 text-left transition-all hover:bg-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 active:scale-95"
                >
                  <div className="shrink-0 p-3 rounded-lg bg-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">Normal Mode</p>
                    <p className="mt-2 text-xs text-cyan-100/80 leading-relaxed">
                      IDE-first experience with terminal minimized. Clean browsing.
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
