import Pinned from "./Pinned";
import Sheet from "./Sheet";

// Stacked-sheets scroll: every entry after the first (a section, or a group
// of sections rendered as one block) slides up over the one before it, which
// stays pinned underneath (see Pinned / Sheet). Each pinned section and everything after it share a parent,
// because sticky only lasts until the end of the parent:
//   <div> <Pinned>A</Pinned> <div z-10> <Pinned><Sheet>B</Sheet></Pinned> <div z-10> ... </div></div></div>
// `className` gives each sheet its opaque background (required, since the
// pinned section underneath would otherwise show through).
export default function SheetStack({ sections, index = 0 }) {
  const { node, className } = sections[index];
  const content = index === 0 ? node : <Sheet className={className}>{node}</Sheet>;
  if (index === sections.length - 1) return content;

  return (
    <div>
      <Pinned>{content}</Pinned>
      <div className="relative z-10">
        <SheetStack sections={sections} index={index + 1} />
      </div>
    </div>
  );
}
