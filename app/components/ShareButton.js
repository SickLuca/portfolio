"use client";

import { useState } from "react";

// Uses the native share sheet on mobile; falls back to copying the link on desktop.
export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: "Luca Repupilli - Software Engineer",
      text: "Luca Repupilli - Software Engineer & aspiring AI engineer",
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user dismissed the share sheet: nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable: nothing to do
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-navy/50"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
      </svg>
      {copied ? "Link copied!" : "Share"}
    </button>
  );
}
