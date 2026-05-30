"use client";

import React, { useState, useCallback } from "react";

export default function ServerIP() {
  const [copied, setCopied] = useState(false);
  const ip = "play.rootssky.com";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = ip;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <button
      onClick={handleCopy}
      className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-border bg-obsidian/80 hover:border-emerald transition-all duration-300 cursor-pointer"
      title="Click to copy server IP"
      id="server-ip-widget"
    >
      {/* Status dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
      </span>

      {/* IP text */}
      <span className="font-jetbrains text-sm sm:text-base text-emerald-light tracking-wider">
        {ip}
      </span>

      {/* Copy icon / Copied state */}
      <span className="text-xs text-slate-400 group-hover:text-emerald transition-colors">
        {copied ? (
          <span className="text-emerald animate-fade-in">✓ Copied!</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
