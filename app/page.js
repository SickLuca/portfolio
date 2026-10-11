import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import Education from "./components/Education";
import About from "./components/About";
import Faq from "./components/Faq";
import Contact, { ContactSky } from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Reveal from "./components/Reveal";
import SheetStack from "./components/SheetStack";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* The sections slide up over each other (see SheetStack): Hero,
            the stats band, Work, Stack, Experience (+ Education), About
            (+ FAQ), Contact (+ the footer, at the bottom of the navy Contact
            sheet). */}
        <SheetStack
          sections={[
            { node: <Hero /> },
            { node: <Stats />, className: "bg-navy" },
            { node: <Projects />, className: "bg-bg" },
            { node: <Stack />, className: "bg-navy" },
            {
              node: (
                <>
                  <Reveal>
                    <Experience />
                  </Reveal>
                  <Reveal>
                    <Education />
                  </Reveal>
                </>
              ),
              className: "bg-bg",
            },
            {
              node: (
                <>
                  <Reveal>
                    <About />
                  </Reveal>
                  <Faq />
                </>
              ),
              className: "bg-bg",
            },
            {
              node: (
                <div className="relative overflow-hidden">
                  <ContactSky />
                  <Reveal>
                    <Contact />
                  </Reveal>
                  <Footer />
                </div>
              ),
              className: "bg-navy",
            },
          ]}
        />
      </main>
      <BackToTop />
    </>
  );
}
