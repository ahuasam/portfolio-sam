import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProjects } from "@/lib/projects";

export const revalidate = 60;

export default async function Home() {
  const projects = await getProjects();
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Portfolio projects={projects} />
      <Process />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
