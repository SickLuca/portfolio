import CoinTip from "./CoinTip";

// Page footer. It sits at the bottom of the navy Contact sheet (see page.js),
// so it is styled for a dark background; role="contentinfo" keeps it the
// page footer landmark even though it now lives inside <main>.
// Three columns from sm up (copyright, coffee-tip button centred, credits);
// stacked and centred on mobile. The extra bottom (mobile) / right (sm+)
// padding keeps the text clear of the fixed back-to-top button.
export default function Footer() {
  return (
    <footer role="contentinfo" className="relative z-10 border-t border-white/10">
      <div className="wrap grid items-center justify-items-center gap-4 pt-8 pb-24 text-center text-sm text-white/55 sm:grid-cols-[1fr_auto_1fr] sm:justify-items-stretch sm:pb-8 sm:text-left">
        <p>© {new Date().getFullYear()} Luca Repupilli</p>
        <CoinTip />
        <p className="font-mono text-xs sm:pr-16 sm:text-right">
          Built with Next.js, Tailwind CSS and Claude Code
        </p>
      </div>
    </footer>
  );
}
