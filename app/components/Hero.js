import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="wrap grid items-center gap-12 pt-32 pb-20 md:grid-cols-[1.2fr_0.8fr] md:pt-40 md:pb-28">
        {/* left: intro */}
        <div className="animate-rise">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Software Engineer
          </p>
          <h1 className="font-display text-[54px] font-semibold leading-[1.05] tracking-tight text-navy md:text-[68px]">
            Luca
            <br />
            Repupilli
          </h1>
          <p className="mt-6 max-w-2xl text-[20px] leading-relaxed text-ink/80 md:text-[22px]">
            Computer Science graduate and aspiring AI engineer, aiming to
            specialize in AI &amp; agentic systems. Hands-on experience building
            multi-agent LLM applications that combine tool-execution pipelines with
            Retrieval-Augmented Generation (RAG), and designing RESTful backends in
            Java / Spring Boot and C# / ASP.NET Core. Shipped a conversational
            multi-agent assistant (LangChain / LangGraph) as a bachelor&apos;s
            thesis, and delivered LLM automation workflows during an industry
            internship. Comfortable across Python, Java, and C#, and eager to grow
            as an AI engineer in a team that builds real-world, high-impact
            software.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
            >
              Selected work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-navy/20 px-5 py-2.5 text-sm font-medium text-navy transition-colors hover:border-navy/50"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* right: photo */}
        <div className="animate-rise-delay flex justify-center md:justify-end">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full bg-gradient-to-br from-accent/20 to-navy/5 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative h-64 w-64 overflow-hidden rounded-full bg-surface ring-2 ring-accent/25 ring-offset-4 ring-offset-bg md:h-80 md:w-80">
              <Image
                src="/luca.png"
                alt="Luca Repupilli"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
