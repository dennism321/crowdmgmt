import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import WorkConveyor from "@/components/WorkConveyor";
import About from "@/components/About";
import Services from "@/components/Services";
import Compare from "@/components/Compare";
import Roster from "@/components/Roster";
import Story from "@/components/Story";
import Resume from "@/components/Resume";
import Testimonials from "@/components/Testimonials";
import GlamAlerts from "@/components/GlamAlerts";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function App() {
  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-ink-950 text-white">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <WorkConveyor />
        <About />
        <Services />
        <Compare />
        <Roster />
        <Story />
        <Resume />
        <Testimonials />
        <GlamAlerts />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
