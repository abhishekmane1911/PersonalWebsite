import { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      <div className={`relative min-h-screen bg-dark-950 overflow-x-clip ${isLoading ? 'overflow-hidden h-screen' : ''}`}>
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Particle Background */}
        <ParticleBackground />

        {/* Global top-left violet glow — visible across the whole site */}
        <div className="fixed -top-32 -left-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-violet-500/[0.10] rounded-full blur-[100px] sm:blur-[150px] pointer-events-none z-0" />

        {/* Main Content */}
        <Navbar />
        <main>

          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
