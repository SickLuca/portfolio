// Page footer. It sits at the bottom of the navy Contact sheet (see page.js),
// so it is styled for a dark background; role="contentinfo" keeps it the
// page footer landmark even though it now lives inside <main>.
export default function Footer() {
  return (
    <footer role="contentinfo" className="relative z-10 border-t border-white/10">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Luca Repupilli</p>
        <p className="font-mono text-xs">Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}
