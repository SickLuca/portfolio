import FlipCard from "./FlipCard";

// "About" section: personality, mindset and way of working, plus a motto.
const paragraphs = [
  "I'm driven by a constant search for new challenges and chances to learn, and I'm ambitious about where that can take me. I believe the fastest growth comes from hands-on experience and from the people around me, so I like to experiment, learn from my own mistakes, and do it in the open, where everyone grows together.",
  "I'm deliberately critical of everything I build, especially with AI. I want to understand what I ship all the way down, and I'll gladly go back and redo something when it doesn't meet the standard I set for it. I don't want to be a traditional developer who ignores AI, or a prompt engineer who can't get into the code: I aim to stand exactly in between, using AI with real engineering judgment.",
];

const closing =
  "I know how much I still have to learn to truly master this field. I'm only at the beginning, and that's exactly what excites me.";

// Background images for the two faces. Set to null to fall back to the plain
// light navy style. When set, the face shows the image (object-cover) under a
// navy scrim, with the text and image credit bottom-aligned for legibility.
const frontImage = {
  src: "/TheCrabOfTheSouthernSky.webp",
  alt: "The Southern Crab Nebula, a deep-space Hubble image",
  credit: "Credit: NASA, ESA, and STScI",
};
const backImage = {
  src: "/AlanTuring.webp",
  alt: "Portrait of Alan Turing",
  credit: "Credit: National Portrait Gallery",
};

// Small "flip" affordance shown at the bottom of each face.
function FlipHint({ label, dark }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] ${
        dark ? "text-white/75" : "text-accent"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
      {label}
    </span>
  );
}

// Bottom meta row: the flip hint (left) and, on image faces, the credit (right).
function FaceFooter({ dark, hint, credit }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <FlipHint label={hint} dark={dark} />
      {credit ? (
        <span
          className={`font-mono text-[0.62rem] uppercase tracking-[0.1em] ${
            dark ? "text-white/55" : "text-muted"
          }`}
        >
          {credit}
        </span>
      ) : null}
    </div>
  );
}

// A single face: optional cover image + navy scrim, then the content. With an
// image the content sits at the bottom (over the strongest part of the scrim);
// without one it is vertically centered like the original card.
function Face({ image, children }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col p-6 md:p-10 ${
        image ? "justify-end" : "justify-center"
      }`}
    >
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className={`relative ${image ? "text-white" : ""}`}>{children}</div>
    </div>
  );
}

export default function About() {
  const front = (
    <Face image={frontImage}>
      <p
        className={`font-display text-2xl font-semibold md:text-3xl ${
          frontImage ? "text-white" : "text-navy"
        }`}
      >
        &ldquo;Per aspera ad astra&rdquo;
      </p>
      <p className={`mt-2 ${frontImage ? "text-white/80" : "text-muted"}`}>
        Through hardships to the stars.
      </p>
      <p className={`mt-6 ${frontImage ? "text-white/90" : "text-ink/70"}`}>{closing}</p>
      <FaceFooter
        dark={Boolean(frontImage)}
        hint="Click to flip"
        credit={frontImage?.credit}
      />
    </Face>
  );

  const back = (
    <Face image={backImage}>
      <p
        className={`font-display text-xl font-semibold leading-snug md:text-2xl ${
          backImage ? "text-white" : "text-navy"
        }`}
      >
        &ldquo;We can see only a short distance ahead of us, but we can see plenty
        to do.&rdquo;
      </p>
      <p className={`mt-4 ${backImage ? "text-white/80" : "text-muted"}`}>
        - Alan M. Turing
      </p>
      <FaceFooter
        dark={Boolean(backImage)}
        hint="Click to flip back"
        credit={backImage?.credit}
      />
    </Face>
  );

  return (
    <section id="about" className="border-t border-line">
      <div className="wrap py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Curious, critical, always growing
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <FlipCard
            className="about-flip"
            front={front}
            back={back}
            axis="y"
            radius={20}
            width={520}
            height={400}
            background="#ffffff"
            color="#2b3444"
            glareOpacity={0.14}
            shadowOpacity={0.14}
            perspective={1200}
            ariaLabel="A motto and a quote by Alan Turing. Activate to flip the card."
          />
        </div>
      </div>
    </section>
  );
}
