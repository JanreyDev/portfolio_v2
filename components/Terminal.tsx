"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { executeCommand } from './commands';
import { useTheme } from 'next-themes';

interface HistoryItem {
    command: string;
    output: React.ReactNode;
}

interface TerminalProps {
    isMinimized?: boolean;
    onMinimize?: (minimized: boolean) => void;
    command?: string;
}

const ASCII_ART = String.raw`
       __                           
      / /___ _____  ________  __  __
 __  / / __ \`/ __ \/ ___/ _ \/ / / /
/ /_/ / /_/ / / / / /  /  __/ /_/ / 
\____/\__,_/_/ /_/_/   \___/\__, /  
                           /____/   
`;

export function Terminal({ isMinimized: externalMinimized, onMinimize, command: externalCommand }: TerminalProps) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [input, setInput] = useState('');
    const [isBooting, setIsBooting] = useState(true);
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [internalMinimized, setInternalMinimized] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleExecute = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (trimmedCmd) {
            const output = executeCommand(trimmedCmd, setTheme, theme, handleExecute);
            if (output !== null) {
                setHistory(prev => [...prev, { command: trimmedCmd, output }]);
            } else {
                if (trimmedCmd === 'clear') {
                    setHistory([]);
                } else if (trimmedCmd === 'close') {
                    setIsMinimized(true);
                } else if (trimmedCmd !== 'theme') {
                    setHistory(prev => [...prev, { command: trimmedCmd, output: null }]);
                }
            }
        } else {
            setHistory(prev => [...prev, { command: '', output: null }]);
        }
    };

    // Use external state if provided, otherwise use internal state
    const isMinimized = externalMinimized !== undefined ? externalMinimized : internalMinimized;
    const setIsMinimized = (minimized: boolean) => {
        setInternalMinimized(minimized);
        onMinimize?.(minimized);
    };

    // Handle minimize toggle from title bar click
    const handleTitleBarClick = () => {
        if (isMinimized) {
            setIsMinimized(false);
        }
    };

    // Handle minimize button click
    const handleMinimizeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMinimized(true);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    // Safe useTheme
    const { theme, setTheme } = useTheme();

    // Initial focus & theme setup
    useEffect(() => {
        if (!isBooting) {
            inputRef.current?.focus();
        }
    }, [isBooting, setTheme]);

    // Boot sequence animation
    useEffect(() => {
        const sequence = [
            "Initializing portfolio environment...",
            "Loading core dependencies...",
            "Resolving component tree...",
            "Running composer install --no-dev --optimize-autoloader",
            " ",
            "Installing dependencies from lock file",
            "Verifying lock file contents can be installed on current platform.",
            "Package operations: 12 installs, 0 updates, 0 removals",
            "  - Downloading React core packages v19.0.0... 100%",
            "  - Downloading Next.js framework v15.0.0... 100%",
            "  - Downloading TailwindCSS engine v3.4.1... 100%",
            "  - Downloading Lucide icon set v0.420.0... 100%",
            "  - Downloading Framer Motion animation library v11.3.8... 100%",
            " ",
            "  - Installing React core packages (19.0.0): Extracting archive",
            "  - Installing Next.js framework (15.0.0): Extracting archive",
            "  - Installing TailwindCSS engine (3.4.1): Extracting archive",
            "  - Installing Lucide icon set (0.420.0): Extracting archive",
            "  - Installing Framer Motion animation library (11.3.8): Extracting archive",
            " ",
            "Generating optimized autoload files",
            "Dependencies installed successfully",
            "Booting interactive terminal interface...",
            "System Ready."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setBootLines(prev => [...prev, sequence[i]]);
                i++;
                // Scroll to bottom as lines are added
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            } else {
                clearInterval(interval);
                setIsBooting(false);
                const initialCommands = ['help'];
                const initialHistory = initialCommands.map(cmd => ({
                    command: cmd,
                    output: executeCommand(cmd, setTheme, theme, handleExecute)
                }));
                setHistory(initialHistory);
            }
        }, 150); // Delay between lines

        return () => clearInterval(interval);
    }, [theme, setTheme]);

    // Scroll to bottom on history change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, bootLines]); // Added bootLines to dependency array for scrolling during boot

    // Handle external command triggering
    useEffect(() => {
        if (externalCommand && !isBooting) {
            handleExecute(externalCommand);
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [externalCommand, isBooting]);

    // Focus input on click anywhere
    const handleWrapperClick = () => {
        if (!isBooting) {
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isBooting) return;

        if (e.key === 'Enter') {
            handleExecute(input);
            setInput('');
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen w-full bg-background" />; // Avoid hydration mismatch on initial render
    }

    return (
        <div className={`w-full max-w-5xl xl:h-[85vh] rounded-xl overflow-hidden border border-terminal-border bg-terminal-bg shadow-2xl flex flex-col relative font-mono ${isMinimized ? 'h-12' : 'h-[80vh]'} transition-all duration-300`}>
            {/* macOS Title Bar */}
            <div className="flex items-center px-4 py-3 border-b border-terminal-border bg-background shrink-0 cursor-pointer" onClick={handleTitleBarClick}>
                <div className="flex space-x-2 w-16">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <button
                        onClick={handleMinimizeClick}
                        className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors focus:outline-none"
                        aria-label="Minimize terminal"
                    ></button>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center text-sm font-semibold opacity-80 text-foreground">
                    janrey@portfolio: ~
                </div>
                <div className="w-16"></div>
            </div>

            {/* Terminal Content Box */}
            <div
                className={`flex-1 w-full p-4 md:p-8 overflow-y-auto cursor-text text-foreground ${isMinimized ? 'hidden' : ''}`}
                onClick={handleWrapperClick}
            >
                <div className="w-full mx-auto flex flex-col">
                    {/* Boot Sequence or History Log */}
                    {isBooting ? (
                        <div className="flex flex-col gap-1 w-full font-mono text-sm text-foreground/80 whitespace-pre-wrap">
                            {bootLines.map((line, index) => (
                                <div key={index} className={
                                    line?.includes("100%") || line?.includes("successfully") || line?.includes("System Ready")
                                        ? "text-emerald-500"
                                        : line?.includes("composer install")
                                            ? "text-primary font-bold"
                                            : ""
                                }>
                                    {line}
                                </div>
                            ))}
                            <span className="animate-pulse">_</span>
                        </div>
                    ) : (
                        <>
                            {/* Welcome Header */}
                            <pre className="mb-6 text-emerald-500 font-bold overflow-x-auto text-xs md:text-base mt-2 font-mono">
                                {ASCII_ART}
                            </pre>
                            <div className="mb-8 text-foreground/80">
                                <p>Welcome to Janrey's interactive portfolio terminal.</p>
                                <p>Type <span className="text-accent font-bold">"help"</span> to see available commands.</p>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                {history.map((item, index) => (
                                    <div key={index} className="flex flex-col w-full">
                                        <div className="flex items-center gap-2 flex-wrap w-full">
                                            <span className="text-primary font-bold shrink-0">janrey@portfolio:~$</span>
                                            <span className="text-foreground">{item.command}</span>
                                        </div>
                                        {item.output && (
                                            <div className="mt-2 mb-4 w-full">
                                                {item.output}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Active Input Line */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className="text-primary font-bold shrink-0">janrey@portfolio:~$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent border-none outline-none text-foreground caret-accent min-w-[200px]"
                                    autoFocus
                                    spellCheck="false"
                                    autoComplete="off"
                                    disabled={isBooting}
                                />
                            </div>
                        </>
                    )}

                    {/* Scroll anchor */}
                    <div ref={bottomRef} className="h-24 md:h-16 shrink-0" />
                </div>
            </div>
        </div>
    );
}
