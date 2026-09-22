import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Experience from "./components/Experience";
import Education from "./components/Education";
import About from "./components/About";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Faq />
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
