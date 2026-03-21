import Navbar from '@/components/ui/Navbar';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ImpactNumbers from '@/components/sections/ImpactNumbers';
import Journey from '@/components/sections/Journey';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Achievements from '@/components/sections/Achievements';
import DeepTech from '@/components/sections/DeepTech';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <ImpactNumbers />
        <Journey />
        <Projects />
        <Skills />
        <Achievements />
        <DeepTech />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
