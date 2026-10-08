import { certs, education, founder, person } from "@/lib/content";

export function Founder() {
  return (
    <section id="founder" className="mx-auto grid max-w-6xl gap-10 px-6 py-28 md:grid-cols-12">
      <div className="md:col-span-7">
        <h2 className="display text-5xl md:text-7xl">{founder.company}</h2>
        <p className="mono mt-3 text-xs text-cool">{founder.role}, since {founder.since}</p>
        <p className="measure mt-6">{founder.line}</p>
      </div>
      <div className="md:col-span-5">
        <picture>
          <source type="image/webp" srcSet="/portrait-480.webp 480w, /portrait-960.webp 960w" sizes="(min-width: 768px) 440px, 100vw" />
          <img src="/portrait-960.jpg" srcSet="/portrait-480.jpg 480w, /portrait-960.jpg 960w" sizes="(min-width: 768px) 440px, 100vw" width={960} height={1200} loading="lazy" decoding="async"
            alt="Portrait of Viren Singh, smiling, in a navy blazer and white shirt" className="aspect-[4/5] w-full max-w-md border border-line object-cover" />
        </picture>
      </div>
    </section>
  );
}

export function Credentials() {
  return (
    <section id="credentials" className="mx-auto max-w-6xl px-6 py-28">
      <h2 className="display text-5xl md:text-7xl">Credentials</h2>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <ul className="space-y-3">{certs.map((c) => <li key={c} className="border-t border-line pt-3">{c}</li>)}</ul>
        <ul className="space-y-3">{education.map((e) => <li key={e} className="border-t border-line pt-3">{e}</li>)}</ul>
      </div>
    </section>
  );
}

export function Contact() {
  const nav = [["Work", "#work"], ["Skills", "#skills"], ["Founder", "#founder"], ["Credentials", "#credentials"]];
  const connect = [["GitHub", person.links.github], ["GitLab", person.links.gitlab], ["LinkedIn", person.links.linkedin], ["Hugging Face", "https://huggingface.co/Vir007"]];
  return (
    <footer id="contact" className="relative mt-10 overflow-hidden">
      <div className="site-foot-panel relative mx-auto max-w-[1600px] px-6 pb-24 pt-20 md:px-16 md:pb-32 md:pt-24">
        <div className="relative mx-auto grid max-w-5xl gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="display text-4xl md:text-5xl">Say hello</h2>
            <p className="mt-3 max-w-xs text-sm text-cool">Got a hard data problem or an AI idea worth building? Write to me.</p>
            <a href={`mailto:${person.email}`} className="foot-cta mono mt-6 inline-flex min-h-11 max-w-full items-center rounded-full px-5 text-[13px] no-underline">
              <span className="truncate">{person.email}</span>
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 text-sm md:col-span-7 md:grid-cols-3">
            <div>
              <p className="mono mb-4 text-xs text-ember">Explore</p>
              <ul className="space-y-2.5">{nav.map(([l, h]) => <li key={h}><a className="foot-link" href={h}>{l}</a></li>)}</ul>
            </div>
            <div>
              <p className="mono mb-4 text-xs text-ember">Contact</p>
              <ul className="space-y-2.5">
                <li><a className="foot-link" href={`mailto:${person.email}`}>Email</a></li>
                <li className="text-cool">{person.location}</li>
              </ul>
            </div>
            <div>
              <p className="mono mb-4 text-xs text-ember">Connect</p>
              <ul className="space-y-2.5">{connect.map(([l, h]) => <li key={l}><a className="foot-link" href={h} rel="noopener">{l}</a></li>)}</ul>
            </div>
          </nav>
        </div>
      </div>
      <div aria-hidden="true" className="foot-word display select-none text-center">{person.name}</div>
      <div className="mx-auto max-w-5xl px-6 pb-10">
        <div className="border-t border-dashed border-white/20 pt-6 text-center text-xs text-cool">&copy; {new Date().getFullYear()} {person.name}. {person.headline}.</div>
      </div>
    </footer>
  );
}
