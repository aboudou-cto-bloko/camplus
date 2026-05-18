"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────── */
type Answers = {
  ecole: string;
  sources: string[];
  manques: string[];
  interets: string[];
  plateforme: string;
  suggestion: string;
  rejoindre: boolean;
  whatsapp: string;
  email: string;
};

const BLANK: Answers = {
  ecole: "",
  sources: [],
  manques: [],
  interets: [],
  plateforme: "",
  suggestion: "",
  rejoindre: false,
  whatsapp: "",
  email: "",
};

const TOTAL = 7;

/* ── Progress bar ────────────────────────────────────────────────────────── */
function Progress({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="space-y-2">
      <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-campus-green rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-white/20 text-xs text-right">{pct}% complété</p>
    </div>
  );
}

/* ── Pill toggle button ──────────────────────────────────────────────────── */
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-2xl text-sm font-medium border transition-all duration-200 select-none",
        active
          ? "bg-campus-green text-campus-black border-campus-green scale-[1.03]"
          : "bg-transparent text-white/60 border-white/20 hover:border-campus-green/50 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

/* ── Question wrapper ────────────────────────────────────────────────────── */
function Question({
  stepKey,
  num,
  title,
  sub,
  children,
  onNext,
  onBack,
  canNext,
  nextLabel = "Continuer",
  hideNext = false,
}: {
  stepKey: number;
  num: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  canNext: boolean;
  nextLabel?: string;
  hideNext?: boolean;
}) {
  return (
    <div key={stepKey} className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
      {/* Step number */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-heading text-5xl text-campus-green leading-none">{num}</span>
        <span className="text-white/15 text-xl">—</span>
        <span className="text-white/30 text-xs uppercase tracking-widest">{num} sur {String(TOTAL).padStart(2, "0")}</span>
      </div>

      {/* Question */}
      <h2 className="font-heading text-2xl md:text-4xl text-white leading-tight mb-3">{title}</h2>
      {sub && <p className="text-white/35 text-sm mb-8">{sub}</p>}
      {!sub && <div className="mb-8" />}

      {/* Input */}
      <div className="mb-14">{children}</div>

      {/* Nav buttons */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-white/25 hover:text-white/70 text-sm transition-colors duration-200"
          >
            ← Retour
          </button>
        )}
        {!hideNext && (
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200",
              canNext
                ? "bg-campus-green text-campus-black hover:bg-campus-deep hover:scale-[1.02] active:scale-[0.98]"
                : "bg-white/8 text-white/25 cursor-not-allowed"
            )}
          >
            {nextLabel}
            {canNext && <span className="opacity-50">→</span>}
          </button>
        )}
        {!hideNext && canNext && (
          <span className="hidden md:block text-white/15 text-xs">ou Entrée ↵</span>
        )}
      </div>
    </div>
  );
}

/* ── Success screen ──────────────────────────────────────────────────────── */
function Success({ answers }: { answers: Answers }) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both text-center space-y-8 py-12">
      {/* Checkmark */}
      <div className="relative mx-auto w-24 h-24">
        <div className="absolute inset-0 bg-campus-green/20 rounded-full animate-ping" />
        <div className="relative w-24 h-24 bg-campus-green/10 border border-campus-green/30 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-campus-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
              className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both" />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-heading text-3xl md:text-4xl text-white">
          Merci{answers.ecole ? ` de ${answers.ecole}` : ""} !
        </h2>
        <p className="text-white/40 text-lg max-w-md mx-auto leading-relaxed">
          Ta voix fait partie des fondations de Campus+.
          {answers.rejoindre
            ? " On te contactera dès que le projet avance."
            : " Le campus sera plus vivant grâce à toi."}
        </p>
      </div>

      {/* Selected interests summary */}
      {answers.interets.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {answers.interets.map((interest) => (
            <span key={interest} className="px-4 py-1.5 border border-campus-green/30 text-campus-green text-xs rounded-2xl">
              {interest}
            </span>
          ))}
        </div>
      )}

      <p className="text-white/15 text-sm uppercase tracking-widest">Campus+ — Le campus en mieux.</p>
    </div>
  );
}

/* ── Form logic ──────────────────────────────────────────────────────────── */
function FormInner({ onStepChange }: { onStepChange: (s: number) => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Answers>(BLANK);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const submitVoice = useMutation(api.voices.submit);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [k]: v }));

  const toggleArr = (key: "sources" | "manques" | "interets", val: string) => {
    const arr = answers[key];
    set(key, arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const canNext = useCallback(() => {
    switch (step) {
      case 0: return answers.ecole.trim().length > 0;
      case 1: return answers.sources.length > 0;
      case 2: return answers.manques.length > 0;
      case 3: return answers.interets.length > 0;
      case 4: return answers.plateforme.length > 0;
      default: return true;
    }
  }, [step, answers]);

  const goTo = useCallback((n: number) => {
    setStep(n);
    onStepChange(n);
  }, [onStepChange]);

  const next = useCallback(async () => {
    if (step < TOTAL - 1) {
      goTo(step + 1);
    } else {
      setSubmitting(true);
      try {
        await submitVoice({
          ecole: answers.ecole,
          sources: answers.sources,
          manques: answers.manques,
          interets: answers.interets,
          plateforme: answers.plateforme,
          suggestion: answers.suggestion || undefined,
          rejoindre: answers.rejoindre,
          whatsapp: answers.whatsapp || undefined,
          email: answers.email || undefined,
        });
      } finally {
        setSubmitting(false);
        setDone(true);
      }
    }
  }, [step, goTo, answers, submitVoice]);

  const back = () => goTo(Math.max(0, step - 1));

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
      if (canNext()) next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [canNext, next]);

  /* Auto-focus input on step change — skip initial mount */
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const t = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(t);
  }, [step]);

  if (done) return <Success answers={answers} />;
  if (submitting) return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <div className="w-12 h-12 rounded-full border-2 border-campus-green/30 border-t-campus-green animate-spin" />
      <p className="text-white/30 text-sm tracking-widest uppercase">Envoi en cours…</p>
    </div>
  );

  const num = String(step + 1).padStart(2, "0");

  /* Step 0 — École */
  if (step === 0)
    return (
      <Question stepKey={0} num={num} title="Dans quelle école étudies-tu ?"
        sub="ENEAM, EPAC, UAC, FASEG, ESGIS, ESTAC... peu importe."
        onNext={next} canNext={canNext()}>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text" value={answers.ecole}
          onChange={(e) => set("ecole", e.target.value)}
          placeholder="Tape le nom de ton école..."
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-campus-green outline-none text-white text-xl md:text-2xl py-3 placeholder:text-white/15 transition-colors duration-300"
          autoComplete="off"
        />
      </Question>
    );

  /* Step 1 — Sources d'info */
  if (step === 1)
    return (
      <Question stepKey={1} num={num} title="Comment tu t'informes sur ce qui se passe sur ton campus ?"
        sub="Choisis tout ce qui s'applique à toi."
        onNext={next} onBack={back} canNext={canNext()}>
        <div className="flex flex-wrap gap-3">
          {["WhatsApp", "Bouche à oreille", "Délégués de classe", "Affiches", "Instagram / Facebook", "Je rate souvent les infos"].map((opt) => (
            <Pill key={opt} label={opt} active={answers.sources.includes(opt)} onClick={() => toggleArr("sources", opt)} />
          ))}
        </div>
      </Question>
    );

  /* Step 2 — Ce qui manque */
  if (step === 2)
    return (
      <Question stepKey={2} num={num} title="Qu'est-ce qui manque le plus aujourd'hui ?"
        sub="Sois honnête. C'est exactement ce dont on a besoin."
        onNext={next} onBack={back} canNext={canNext()}>
        <div className="flex flex-wrap gap-3">
          {["Infos claires et centralisées", "Visibilité des opportunités", "Couverture des événements", "Valorisation des projets étudiants", "Connexion entre étudiants", "Formats modernes"].map((opt) => (
            <Pill key={opt} label={opt} active={answers.manques.includes(opt)} onClick={() => toggleArr("manques", opt)} />
          ))}
        </div>
      </Question>
    );

  /* Step 3 — Centres d'intérêt */
  if (step === 3)
    return (
      <Question stepKey={3} num={num} title="Qu'est-ce qui t'intéresserait le plus dans Campus+ ?"
        sub="Le média que tu aimerais vraiment avoir."
        onNext={next} onBack={back} canNext={canNext()}>
        <div className="flex flex-wrap gap-3">
          {["Actualités campus", "Portraits d'étudiants", "Concours & bourses", "Vidéos courtes", "Résumés rapides", "Projets étudiants", "Stages & emplois", "Vie associative"].map((opt) => (
            <Pill key={opt} label={opt} active={answers.interets.includes(opt)} onClick={() => toggleArr("interets", opt)} />
          ))}
        </div>
      </Question>
    );

  /* Step 4 — Plateforme (auto-advance) */
  if (step === 4)
    return (
      <Question stepKey={4} num={num} title="Quelle plateforme tu utilises le plus ?"
        sub="Une seule réponse. Ça avance automatiquement."
        onNext={next} onBack={back} canNext={canNext()} hideNext={!answers.plateforme}>
        <div className="flex flex-wrap gap-3">
          {["WhatsApp", "TikTok", "Instagram", "Facebook", "YouTube", "Telegram"].map((opt) => (
            <button key={opt} type="button"
              onClick={() => { set("plateforme", opt); setTimeout(() => next(), 450); }}
              className={cn(
                "px-6 py-3 rounded-2xl text-sm font-medium border transition-all duration-200",
                answers.plateforme === opt
                  ? "bg-campus-green text-campus-black border-campus-green scale-[1.05]"
                  : "bg-transparent text-white/60 border-white/20 hover:border-campus-green/50 hover:text-white"
              )}>
              {opt}
            </button>
          ))}
        </div>
      </Question>
    );

  /* Step 5 — Suggestion libre */
  if (step === 5)
    return (
      <Question stepKey={5} num={num} title="Si tu pouvais changer une chose dans la com universitaire, ce serait quoi ?"
        sub="Optionnel. Mais c'est souvent là que sont les meilleures idées."
        onNext={next} onBack={back} canNext={true}
        nextLabel={answers.suggestion.trim() ? "Continuer" : "Passer →"}>
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={answers.suggestion}
          onChange={(e) => set("suggestion", e.target.value)}
          placeholder="Dis-nous tout. Aucun filtre nécessaire."
          rows={4}
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-campus-green outline-none text-white text-lg py-3 placeholder:text-white/15 transition-colors duration-300 resize-none"
        />
      </Question>
    );

  /* Step 6 — Rejoindre */
  if (step === 6)
    return (
      <Question stepKey={6} num={num} title="Tu veux faire partie de l'aventure ?"
        sub="On te contacte uniquement quand ça avance vraiment."
        onNext={next} onBack={back} canNext={true} nextLabel="Envoyer ma voix →">
        <div className="space-y-8">
          {/* Toggle */}
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => set("rejoindre", !answers.rejoindre)}
              className={cn("relative w-14 h-7 rounded-full transition-all duration-300 shrink-0 cursor-pointer",
                answers.rejoindre ? "bg-campus-green" : "bg-white/15")}>
              <span className={cn("absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300",
                answers.rejoindre ? "left-7" : "left-0.5")} />
            </button>
            <span className={cn("font-medium text-lg transition-colors duration-300",
              answers.rejoindre ? "text-campus-green" : "text-white/35")}>
              {answers.rejoindre ? "Oui, je veux rejoindre !" : "Pas pour l'instant"}
            </span>
          </div>

          {/* Contact fields */}
          <div className={cn("space-y-6 overflow-hidden transition-all duration-500",
            answers.rejoindre ? "max-h-48 opacity-100" : "max-h-0 opacity-0 pointer-events-none")}>
            <div className="border-b-2 border-white/20 focus-within:border-campus-green transition-colors duration-300">
              <input type="tel" value={answers.whatsapp} onChange={(e) => set("whatsapp", e.target.value)}
                placeholder="WhatsApp — +229 00 00 00 00"
                className="w-full bg-transparent outline-none text-white text-lg py-3 placeholder:text-white/15" />
            </div>
            <div className="border-b-2 border-white/20 focus-within:border-campus-green transition-colors duration-300">
              <input type="email" value={answers.email} onChange={(e) => set("email", e.target.value)}
                placeholder="Email (optionnel)"
                className="w-full bg-transparent outline-none text-white text-lg py-3 placeholder:text-white/15" />
            </div>
          </div>
        </div>
      </Question>
    );

  return null;
}

/* ── Exported section ────────────────────────────────────────────────────── */
export function VoiceSection() {
  const [step, setStep] = useState(0);

  return (
    <section id="voix" className="bg-campus-black min-h-screen py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-[640px] mx-auto">
        <div className="mb-16">
          <Progress step={step} total={TOTAL} />
        </div>
        <FormInner onStepChange={setStep} />
      </div>
    </section>
  );
}
