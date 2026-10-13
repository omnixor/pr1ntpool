import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, FileUp, QrCode, Clock, Printer, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import printStillLife from "@/assets/print-still-life.jpg";
import printPickup from "@/assets/print-pickup.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Pr1ntpool — Better printing, together" },
    { name: "description", content: "One document. One link. Everyone's copies, ready at their slot. Group-buy your printing with Pr1ntpool." },
    { property: "og:title", content: "Pr1ntpool — Better printing, together" },
    { property: "og:description", content: "One document. One link. Everyone's copies, ready at their slot." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const steps = [
  { icon: FileUp, title: "Upload & lock.", text: "One PDF. The same print settings for everyone." },
  { icon: QrCode, title: "Share the link.", text: "Bring your class, team or club into the pool." },
  { icon: Clock, title: "Pick a slot.", text: "Everyone chooses a pickup time. No extra trips." },
];

function Index() {
  const pageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pageRef.current?.style.setProperty("--parallax", `${motion.matches ? 0 : Math.min(window.scrollY * 0.12, 64)}px`);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    motion.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); motion.removeEventListener("change", update); };
  }, []);

  return (
    <main ref={pageRef} className="editorial-page">
      <section className="editorial-intro">
        <div className="edition-line"><span>LESS QUEUING. MORE TOGETHER.</span><span>THE COLLECTIVE PRINT CLUB ↗</span></div>
        <h1>Pr1ntpool<span className="text-detail">®</span><span className="headline-dot">.</span></h1>
        <div className="intro-bottom">
          <p>One document. One link.<br /><strong>Everyone’s copies, ready at their slot.</strong></p>
          <Button asChild size="lg" className="rounded-full"><Link to="/signup">Start a pool <ArrowUpRight /></Link></Button>
        </div>
      </section>

      <section className="bento-grid" aria-label="Printing, together">
        <article className="bento-item photo-tile">
          <img src={printStillLife} alt="Yellow-covered printed booklets, white paper, and a burnt-orange binder clip" width={1024} height={1024} className="parallax-photo" />
          <span className="photo-label">GOOD ON PAPER. BETTER TOGETHER.</span>
          <div className="paper-stamp"><Printer size={22} /><span>ONE FILE.<br />MANY COPIES.</span></div>
        </article>
        <article className="bento-item solution-tile">
          <div className="tile-top"><span>01 / THE BIG IDEA</span><ArrowUpRight size={25} /></div>
          <h2>Small effort.<br />Big print<br /><span className="editorial-italic">energy.</span></h2>
          <p>One coordinator. One locked file. One bulk order. A little less hassle for everyone.</p>
          <div className="tile-footer"><Users size={18} /><span>Made for classes, teams & clubs</span></div>
        </article>
        <article className="bento-item photo-tile photo-tile--tall">
          <img src={printPickup} alt="Row of stapled booklets on a print-shop pickup counter with a burnt-orange pickup tag" width={1024} height={1024} loading="lazy" className="parallax-photo" />
          <span className="photo-label">READY WHEN YOU ARE.</span>
        </article>
        <article className="bento-item problem-tile">
          <span className="tile-eyebrow">02 / SOUND FAMILIAR?</span>
          <h2>Thirty people.<br /><span className="crossed">Thirty print-shop trips.</span></h2>
          <p>The same file. Different settings. Separate queues. Let’s not do that again.</p>
        </article>
        <article className="bento-item pickup-tile">
          <Clock size={27} strokeWidth={1.5} />
          <div><span className="tile-eyebrow">ON YOUR TIME</span><h2>Pick up.<br />Carry on.</h2></div>
          <ArrowUpRight size={25} />
        </article>
      </section>

      <section className="steps-section">
        <div className="section-heading"><div><span className="tile-eyebrow">THE PROCESS</span><h2>Three steps. All set.</h2></div><span className="process-note">FROM PDF TO PICKUP ↗</span></div>
        <div className="steps-grid">{steps.map((step, i) => (
          <article key={step.title} className="step-item"><div className="step-top"><span>0{i + 1}</span><step.icon size={24} strokeWidth={1.5} /></div><h3>{step.title}</h3><p>{step.text}</p></article>
        ))}</div>
      </section>
      <section className="closing-section"><h2>Make it a<br /><span className="editorial-italic">group thing.</span></h2><Button asChild size="lg" className="rounded-full"><Link to="/signup">Let’s pool it <ArrowRight /></Link></Button></section>
      <footer className="page-footer"><span>Pr1ntpool © {new Date().getFullYear()}</span><span>A little coordination. A lot less hassle.</span><Link to="/login">Log in <ArrowUpRight size={14} /></Link></footer>
    </main>
  );
}
