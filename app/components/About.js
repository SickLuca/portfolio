// "About" section: personality, mindset and way of working, plus a motto.
const paragraphs = [
  "I'm driven by a constant search for new challenges and chances to learn, and I'm ambitious about where that can take me. I believe the fastest growth comes from hands-on experience and from the people around me, so I like to experiment, learn from my own mistakes, and do it in the open, where everyone grows together.",
  "I'm deliberately critical of everything I build, especially with AI. I want to understand what I ship all the way down, and I'll gladly go back and redo something when it doesn't meet the standard I set for it. I don't want to be a traditional developer who ignores AI, or a prompt engineer who can't get into the code: I aim to stand exactly in between, using AI with real engineering judgment.",
];

const closing =
  "I know how much I still have to learn to truly master this field. I'm only at the beginning, and that's exactly what excites me.";

export default function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Curious, critical, always growing
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="flex flex-col justify-center rounded-2xl border border-line bg-surface p-8">
            <p className="font-display text-2xl font-semibold text-navy md:text-3xl">
              &ldquo;Per aspera ad astra&rdquo;
            </p>
            <p className="mt-2 text-muted">Through hardships to the stars.</p>
            <p className="mt-6 text-ink/70">{closing}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
