import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import { Founder, Credentials, Contact } from "@/components/sections/Rest";

export default function Page() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <Work />
      <Founder />
      <Credentials />
      <Contact />
    </main>
  );
}
