"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme();

    // Prevents hydration mismatch
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    if (resolvedTheme !== "dark") return null;

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="fixed top-4 right-4 p-2 rounded-full bg-terminal-bg border border-terminal-border text-foreground hover:bg-foreground/10 transition-colors z-50 flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-primary" />
            ) : (
                <Moon className="h-5 w-5 text-primary" />
            )}
        </button>
    );
}
