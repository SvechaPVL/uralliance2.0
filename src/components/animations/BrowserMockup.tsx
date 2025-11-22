"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserMockup({ url, children, className }: BrowserMockupProps) {
  return (
    <div className={cn("flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-2xl", className)}>
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 px-3 py-2">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28CA42]" />
        </div>

        {/* Address bar */}
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 shadow-sm">
          <svg className="h-2.5 w-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[7px] font-medium text-gray-600">{url}</span>
        </div>

        {/* Browser controls */}
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 rounded-sm bg-gray-300" />
          <div className="h-2.5 w-2.5 rounded-sm bg-gray-300" />
        </div>
      </div>

      {/* Website content */}
      <div className="flex-1 overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
}
