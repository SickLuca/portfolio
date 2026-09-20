export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Luca Repupilli</p>
        <p className="font-mono text-xs">Built with Next.js and Tailwind CSS</p>
      </div>
    </footer>
  );
}
