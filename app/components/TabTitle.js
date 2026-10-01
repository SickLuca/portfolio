"use client";

import { useEffect } from "react";

const AWAY_TITLE = "✨ Come back, the stars miss you";

// Small easter egg: while the visitor is on another browser tab, this tab's
// title becomes a little "come back" message; the real title is restored as
// soon as they return. Renders nothing.
export default function TabTitle() {
  useEffect(() => {
    let saved = null;

    const onVisibility = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = AWAY_TITLE;
      } else if (saved !== null) {
        document.title = saved;
        saved = null;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (saved !== null) document.title = saved;
    };
  }, []);

  return null;
}
