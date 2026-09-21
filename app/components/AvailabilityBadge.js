// Small status pill for the hero.
// Flip AVAILABLE to switch between the green "available" and red "not available"
// states (label + colors update together).
const AVAILABLE = true;

export default function AvailabilityBadge() {
  const label = AVAILABLE
    ? "Currently available for new work opportunities"
    : "Currently unavailable for new work opportunities";
  const dot = AVAILABLE ? "bg-emerald-500" : "bg-rose-500";
  const shell = AVAILABLE
    ? "border-emerald-600/20 bg-emerald-500/10"
    : "border-rose-600/20 bg-rose-500/10";
  const text = AVAILABLE ? "text-emerald-700" : "text-rose-700";

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 ${shell}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:hidden ${dot}`}
        />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      <span className={`text-sm font-medium ${text}`}>{label}</span>
    </div>
  );
}
