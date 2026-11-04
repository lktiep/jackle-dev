import MotionProvider from '@/components/motion/MotionProvider';
import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Proof from '@/components/sections/Proof';
import Practice from '@/components/sections/Practice';
import Work from '@/components/sections/Work';
import Leverage from '@/components/sections/Leverage';
import Experience from '@/components/sections/Experience';
import Capabilities from '@/components/sections/Capabilities';
import Recognition from '@/components/sections/Recognition';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <MotionProvider>
      <div className="progress" aria-hidden />
      <Nav />
      <main id="main">
        <Hero />
        <Proof />
        <Practice />
        <Work />
        <Leverage />
        <Experience />
        <Capabilities />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
