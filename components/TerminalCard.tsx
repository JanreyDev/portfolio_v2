import React from 'react';

interface TerminalCardProps {
    title?: string;
    children: React.ReactNode;
}

export const TerminalCard = ({ title, children }: TerminalCardProps) => {
    return (
        <div className="w-full max-w-4xl my-4 rounded-xl overflow-hidden border border-terminal-border bg-terminal-bg shadow-2xl">
            {/* macOS Title Bar */}
            <div className="flex items-center px-4 py-2 border-b border-terminal-border bg-background">
                <div className="flex space-x-2 w-16">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                {title && (
                    <div className="flex-1 text-center text-sm font-semibold opacity-80 text-foreground">
                        {title}
                    </div>
                )}
                <div className="w-16"></div> {/* Spacer for centering title */}
            </div>
            {/* Card Content */}
            <div className="p-6 text-foreground">
                {children}
            </div>
        </div>
    );
};
