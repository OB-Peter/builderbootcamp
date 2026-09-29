import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import About from "../components/About";
import Courses from "../components/Courses";
import WhyUs from "../components/WhyUs";
import HowItWorks from "../components/HowItWorks";
import Outcomes from "../components/Outcomes";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <main className="landing-page">
      <Hero />
      <TrustStrip />
      <About />
      <Courses />
      <WhyUs />
      <HowItWorks />
      <Outcomes />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
