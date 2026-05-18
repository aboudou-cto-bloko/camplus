import Image from "next/image";
import { Nav } from "@/components/nav";
import { Viewfinder } from "@/components/viewfinder";
import { VoiceSection } from "@/components/manifeste-form";
import { SchoolTicker } from "@/components/school-ticker";
import {
  MaskReveal,
  ScrambleReveal,
  LineReveal,
  StaggerLines,
  BigStatement,
} from "@/components/kinetic-text";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen bg-campus-black flex flex-col items-center justify-center overflow-hidden px-6">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#8DFF2F 1px, transparent 1px), linear-gradient(90deg, #8DFF2F 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative text-center space-y-10 max-w-2xl w-full">
        {/* Real logo */}
        <div className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both flex justify-center">
          <div className="relative w-52 md:w-64">
            <Image
              src="/assets/logo-dark.jpeg"
              alt="CAMPUS+"
              width={256}
              height={256}
              className="w-full rounded-2xl"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-campus-black to-transparent rounded-b-2xl" />
          </div>
        </div>

        {/* Kinetic title */}
        <MaskReveal
          text="Le campus mérite mieux."
          as="h1"
          className="font-heading text-4xl md:text-6xl text-white leading-none tracking-tight"
          delay={400}
          staggerMs={60}
          duration={800}
        />

        <div className="animate-in fade-in duration-700 delay-1000 fill-mode-both space-y-6">
          <p className="text-white/40 text-lg">
            Par les étudiants. Pour les étudiants.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#moment-1"
              className="border border-white/20 text-white font-semibold px-7 py-4 rounded-2xl hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              Lire le manifeste ↓
            </a>
            <a
              href="#voix"
              className="bg-campus-green text-campus-black font-bold px-7 py-4 rounded-2xl hover:bg-campus-deep transition-all duration-200 animate-pulse-green"
            >
              Donner ma voix →
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center gap-1 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 1 — LE CONSTAT
══════════════════════════════════════════════════════════════════════════════ */
function Moment1() {
  return (
    <section
      id="moment-1"
      className="relative min-h-screen bg-campus-black flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-campus-green/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-[900px] mx-auto w-full space-y-14">
        <LineReveal className="text-campus-green text-xs uppercase tracking-[0.3em]" delay={0}>
          — Le manifeste · 01
        </LineReveal>

        <div className="space-y-4">
          <MaskReveal
            text="Dans nos universités,"
            as="h2"
            className="font-heading text-5xl md:text-[5.5rem] text-white/50 leading-none tracking-tight"
            staggerMs={40}
            delay={100}
            duration={600}
          />
          <MaskReveal
            text="il se passe"
            as="h2"
            className="font-heading text-5xl md:text-[5.5rem] text-white leading-none tracking-tight"
            staggerMs={40}
            delay={250}
            duration={600}
          />
          <MaskReveal
            text="ÉNORMÉMENT de choses."
            as="h2"
            className="font-heading text-5xl md:text-[5.5rem] text-campus-green leading-none tracking-tight"
            staggerMs={40}
            delay={400}
            duration={700}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 2 — L'INVENTAIRE
══════════════════════════════════════════════════════════════════════════════ */
function Moment2() {
  const items = [
    "Des événements.",
    "Des initiatives.",
    "Des projets.",
    "Des talents.",
    "Des opportunités.",
  ];

  return (
    <section className="relative min-h-screen bg-campus-black flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] bg-campus-green/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[900px] mx-auto w-full">
        <StaggerLines
          staggerMs={120}
          delay={100}
          duration={700}
          distance={50}
          className="space-y-2"
        >
          {items.map((item, i) => (
            <p
              key={item}
              className="font-heading leading-none tracking-tight"
              style={{
                fontSize: `clamp(2.5rem, ${7 - i * 0.4}vw, ${6 - i * 0.3}rem)`,
                color: i === items.length - 1 ? "#8DFF2F" : `rgba(255,255,255,${0.3 + i * 0.15})`,
              }}
            >
              {item}
            </p>
          ))}
        </StaggerLines>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 3 — LE PARADOXE
══════════════════════════════════════════════════════════════════════════════ */
function Moment3() {
  return (
    <section className="relative min-h-screen bg-campus-black flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[900px] mx-auto w-full space-y-20">
        <BigStatement>
          <p className="font-heading text-3xl md:text-5xl text-white/30 leading-tight">
            Et pourtant...
          </p>
        </BigStatement>

        <BigStatement>
          <p className="font-heading text-6xl md:text-[8rem] text-white leading-none tracking-tight">
            RESTE{" "}
            <ScrambleReveal
              text="INVISIBLE."
              className="text-campus-green"
              delay={400}
              duration={1000}
            />
          </p>
        </BigStatement>

        <StaggerLines staggerMs={130} delay={200} duration={600} distance={30} className="space-y-4 border-l-2 border-campus-green/20 pl-8">
          {[
            "L'information circule mal.",
            "Les annonces se perdent.",
            "Les initiatives vivent isolées.",
            "Les réussites passent inaperçues.",
          ].map((line) => (
            <p key={line} className="text-white/40 text-xl md:text-2xl">{line}</p>
          ))}
        </StaggerLines>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 4 — LE CONTRASTE
══════════════════════════════════════════════════════════════════════════════ */
function Moment4() {
  return (
    <section className="relative min-h-screen bg-campus-surface/10 flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[900px] mx-auto w-full space-y-16">
        <LineReveal className="text-campus-green text-xs uppercase tracking-[0.3em]">
          — Le contraste
        </LineReveal>

        <div className="space-y-3">
          <MaskReveal
            text="Pendant ce temps, les étudiants évoluent dans un monde"
            className="text-white/35 text-xl md:text-2xl leading-snug"
            staggerMs={35}
            duration={550}
          />
          <MaskReveal
            text="numérique, rapide, visuel et connecté."
            className="text-white text-xl md:text-2xl leading-snug"
            staggerMs={35}
            delay={300}
            duration={550}
          />
          <div className="pt-4">
            <MaskReveal
              text="Un monde où l'information doit être :"
              className="text-white/35 text-xl md:text-2xl leading-snug"
              staggerMs={35}
              delay={600}
              duration={550}
            />
          </div>
        </div>

        <StaggerLines staggerMs={100} delay={0} duration={500} distance={30} className="grid grid-cols-2 gap-4">
          {["Accessible", "Claire", "Engageante", "Collaborative"].map((w) => (
            <div key={w} className="border border-campus-green/20 rounded-2xl p-5">
              <p className="font-heading text-2xl md:text-3xl text-campus-green">{w}</p>
            </div>
          ))}
        </StaggerLines>

        <BigStatement>
          <div className="py-8 border-t border-b border-white/8 space-y-2">
            <MaskReveal
              text="L'université produit de la vie."
              className="font-heading text-3xl md:text-4xl text-white/60"
              staggerMs={45}
              duration={600}
            />
            <MaskReveal
              text="Mais cette vie n'est pas suffisamment racontée."
              className="font-heading text-3xl md:text-4xl text-campus-green"
              staggerMs={35}
              delay={300}
              duration={600}
            />
          </div>
        </BigStatement>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 5 — CONVICTION
══════════════════════════════════════════════════════════════════════════════ */
function Moment5() {
  return (
    <section className="relative min-h-screen bg-campus-black flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[20vw] text-white/[0.02] leading-none tracking-tight">
          CROIRE
        </span>
      </div>

      <div className="relative max-w-[900px] mx-auto w-full space-y-16">
        <LineReveal className="text-campus-green text-xs uppercase tracking-[0.3em]">
          — Notre conviction
        </LineReveal>

        <div className="space-y-1">
          <MaskReveal
            text='"Les campus africains méritent'
            as="blockquote"
            className="font-heading text-4xl md:text-6xl text-white leading-tight tracking-tight"
            staggerMs={40}
            duration={700}
          />
          <MaskReveal
            text="une communication à la"
            as="blockquote"
            className="font-heading text-4xl md:text-6xl text-white/50 leading-tight tracking-tight"
            staggerMs={40}
            delay={300}
            duration={700}
          />
          <MaskReveal
            text='hauteur de leur potentiel."'
            as="blockquote"
            className="font-heading text-4xl md:text-6xl text-campus-green leading-tight tracking-tight"
            staggerMs={40}
            delay={600}
            duration={700}
          />
        </div>

        <StaggerLines staggerMs={100} delay={0} duration={600} distance={32} className="space-y-5">
          {[
            "Découvrir ce qui se passe, facilement.",
            "Accéder aux opportunités, sans effort.",
            "Valoriser ses projets, publiquement.",
            "Se sentir connecté à son campus.",
          ].map((belief) => (
            <div key={belief} className="flex items-center gap-5">
              <span className="w-2 h-2 rounded-full bg-campus-green shrink-0" />
              <p className="text-white text-xl md:text-2xl">{belief}</p>
            </div>
          ))}
        </StaggerLines>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 6 — LES PROBLÈMES
══════════════════════════════════════════════════════════════════════════════ */
const PROBLEMS = [
  {
    num: "01",
    title: "Information fragmentée",
    body: "Chaque école communique en silo. Les étudiants ratent des opportunités. Des initiatives similaires ne collaborent jamais.",
  },
  {
    num: "02",
    title: "Formats dépassés",
    body: "Les usages ont changé. Les étudiants consomment du contenu visuel, du format court. La communication universitaire reste sur les affiches.",
  },
  {
    num: "03",
    title: "Mémoire inexistante",
    body: "Chaque année, des projets disparaissent. Des initiatives meurent avec leurs organisateurs. Les nouvelles générations recommencent à zéro.",
  },
];

function Moment6() {
  return (
    <section className="relative min-h-screen bg-campus-surface/10 flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[900px] mx-auto w-full space-y-16">
        <LineReveal className="text-campus-green text-xs uppercase tracking-[0.3em]">
          — Le problème
        </LineReveal>

        <div className="space-y-12">
          {PROBLEMS.map((p, i) => (
            <LineReveal key={p.num} delay={i * 120} duration={700}>
              <div className="flex gap-8 group">
                <ScrambleReveal
                  text={p.num}
                  className="font-heading text-6xl text-campus-green/20 leading-none shrink-0 group-hover:text-campus-green/50 transition-colors duration-500"
                  delay={i * 120}
                  duration={600}
                  chars="numbers"
                />
                <div className="space-y-3 pt-2">
                  <MaskReveal
                    text={p.title}
                    as="h3"
                    className="font-heading text-2xl md:text-3xl text-white"
                    staggerMs={50}
                    duration={600}
                  />
                  <MaskReveal
                    text={p.body}
                    className="text-white/40 text-base md:text-lg leading-relaxed"
                    staggerMs={18}
                    delay={150}
                    duration={500}
                  />
                </div>
              </div>
            </LineReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 7 — CAMPUS+ EST NÉ
══════════════════════════════════════════════════════════════════════════════ */
function Moment7() {
  return (
    <section className="relative min-h-screen bg-campus-black flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[22vw] text-campus-green/[0.03] leading-none">
          C+
        </span>
      </div>

      <div className="relative max-w-[900px] mx-auto w-full space-y-16">
        <BigStatement>
          <ScrambleReveal
            text="CAMPUS+ EST NÉ DE CE CONSTAT."
            as="h2"
            className="font-heading text-4xl md:text-7xl text-white leading-none tracking-tight"
            duration={1500}
            chars="uppercase"
          />
        </BigStatement>

        <StaggerLines staggerMs={80} delay={800} duration={500} distance={24} className="space-y-3">
          <p className="text-white/40 text-xl">Un média :</p>
          {["Moderne.", "Dynamique.", "Collaboratif.", "Inter-campus."].map((q) => (
            <p key={q} className="font-heading text-3xl md:text-4xl text-campus-green">{q}</p>
          ))}
        </StaggerLines>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOMENT 8 — L'AMBITION
══════════════════════════════════════════════════════════════════════════════ */
function Moment8() {
  return (
    <section className="relative min-h-screen bg-campus-surface/10 flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[900px] mx-auto w-full space-y-16">
        <LineReveal className="text-campus-green text-xs uppercase tracking-[0.3em]">
          — Notre ambition
        </LineReveal>

        <StaggerLines staggerMs={250} delay={0} duration={800} distance={60} className="space-y-4">
          <MaskReveal
            text="Commencer par un campus."
            className="font-heading text-4xl md:text-[5rem] text-white leading-none tracking-tight"
            staggerMs={35}
            duration={700}
          />
          <MaskReveal
            text="Puis connecter plusieurs."
            className="font-heading text-4xl md:text-[5rem] text-white/30 leading-none tracking-tight"
            staggerMs={35}
            delay={200}
            duration={700}
          />
          <MaskReveal
            text="Créer un réseau vivant."
            className="font-heading text-4xl md:text-[5rem] text-campus-green leading-none tracking-tight"
            staggerMs={35}
            delay={400}
            duration={700}
          />
        </StaggerLines>

        <BigStatement>
          <Viewfinder className="p-8 md:p-12 rounded-2xl bg-campus-surface/40" size={22}>
            <MaskReveal
              text={`"Faire en sorte que plus rien d'important sur le campus ne passe inaperçu."`}
              className="font-heading text-2xl md:text-3xl text-white text-center leading-snug"
              staggerMs={30}
              duration={600}
            />
          </Viewfinder>
        </BigStatement>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VOICE TRANSITION
══════════════════════════════════════════════════════════════════════════════ */
function VoiceTransition() {
  return (
    <section className="relative min-h-screen bg-campus-black flex flex-col justify-center py-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-heading text-[30vw] text-white/[0.015] leading-none">TOI</span>
      </div>

      <div className="relative max-w-[900px] mx-auto w-full space-y-16">
        <LineReveal className="text-campus-green text-xs uppercase tracking-[0.3em]">
          — Ta voix
        </LineReveal>

        <StaggerLines staggerMs={200} delay={0} duration={800} distance={60} className="space-y-2">
          <MaskReveal
            text="Maintenant,"
            className="font-heading text-6xl md:text-[7rem] text-white leading-none tracking-tight"
            staggerMs={40}
            duration={700}
          />
          <MaskReveal
            text="c'est ton tour."
            className="font-heading text-6xl md:text-[7rem] text-campus-green leading-none tracking-tight"
            staggerMs={40}
            delay={200}
            duration={700}
          />
        </StaggerLines>

        <BigStatement>
          <p className="text-white/40 text-xl leading-relaxed max-w-lg">
            Ce manifeste, on ne l'a pas écrit dans un bureau.
            On l'a construit en observant. Mais on veut tes mots, pas les nôtres.
          </p>
        </BigStatement>

        <LineReveal delay={400} duration={600}>
          <div className="flex flex-wrap gap-5 text-sm text-white/25">
            {["3 minutes", "Anonyme si tu veux", "Impact direct sur le produit"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-campus-green" />
                {item}
              </span>
            ))}
          </div>
        </LineReveal>

        <LineReveal delay={600} duration={600}>
          <a
            href="#voix"
            className="inline-flex items-center gap-3 bg-campus-green text-campus-black font-bold text-xl px-10 py-5 rounded-2xl hover:bg-campus-deep transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Donner ma voix <span>→</span>
          </a>
        </LineReveal>

        <LineReveal delay={700} duration={700}>
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/assets/students.jpeg"
              alt="Étudiants béninois"
              width={800}
              height={360}
              className="w-full object-cover"
              style={{ objectPosition: "center 25%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-campus-black via-campus-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
              {["ENEAM", "EPAC", "UAC", "FASEG", "ESGIS", "UP"].map((s) => (
                <span key={s} className="px-3 py-1 bg-campus-black/70 backdrop-blur-sm border border-white/10 text-white/60 text-xs rounded-xl">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </LineReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-campus-black border-t border-white/6 py-10 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image src="/assets/icon-dark.jpeg" alt="Campus+" width={28} height={28} className="rounded-md opacity-80" />
          <span className="font-heading text-sm uppercase tracking-tight text-white/50">
            CAMPUS<span className="text-campus-green">+</span>
          </span>
        </div>
        <p className="text-white/15 text-xs text-center">
          © 2026 · Le campus en mieux · Club Entrepreneuriat ENEAM · Version beta
        </p>
        <p className="text-white/10 text-xs">En construction</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Moment1 />
        <Moment2 />
        <Moment3 />
        <Moment4 />
        <Moment5 />
        <Moment6 />
        <Moment7 />
        <Moment8 />
        <VoiceTransition />
        <SchoolTicker />
        <VoiceSection />
      </main>
      <Footer />
    </>
  );
}
