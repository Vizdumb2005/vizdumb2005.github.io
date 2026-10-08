import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";
import { Founder, Credentials, Contact } from "@/components/sections/Rest";

export default function Page() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <Skills />
      <Work />
      <Founder />
      <Credentials />
      <Contact />
    </main>
  );
}
