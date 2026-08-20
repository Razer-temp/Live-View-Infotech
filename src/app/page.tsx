import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import AboutSection from '@/components/AboutSection';
import ServicesTabs from '@/components/ServicesTabs';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <ServicesTabs />
        <AboutSection />
      </main>
    </>
  );
}
