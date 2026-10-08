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
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <h2 className="display text-5xl md:text-7xl">Say hello</h2>
      <p className="mt-6"><a className="mono" href={`mailto:${person.email}`}>{person.email}</a></p>
      <p className="mono mt-6 text-xs text-cool">
        <a href={person.links.github}>GitHub</a> / <a href={person.links.gitlab}>GitLab</a> / <a href={person.links.linkedin}>LinkedIn</a>
      </p>
    </section>
  );
}
