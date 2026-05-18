"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormData = {
  nom: string;
  ecole: string;
  filiere: string;
  annee: string;
  sources: string[];
  manques: string[];
  interets: string[];
  plateforme: string;
  suggestion: string;
  rejoindre: boolean;
  contact_whatsapp: string;
  contact_email: string;
};

const initial: FormData = {
  nom: "",
  ecole: "",
  filiere: "",
  annee: "",
  sources: [],
  manques: [],
  interets: [],
  plateforme: "",
  suggestion: "",
  rejoindre: false,
  contact_whatsapp: "",
  contact_email: "",
};

function CheckGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  return (
    <div className="space-y-3">
      <p className="text-white font-medium">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const checked = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={cn(
                "px-4 py-2 rounded-2xl text-sm font-medium border transition-all duration-200",
                checked
                  ? "bg-campus-green text-campus-black border-campus-green"
                  : "bg-transparent text-campus-gray border-white/20 hover:border-campus-green hover:text-white"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RadioGroup({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-white font-medium">{label}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "px-4 py-2 rounded-2xl text-sm font-medium border transition-all duration-200",
              selected === opt
                ? "bg-campus-green text-campus-black border-campus-green"
                : "bg-transparent text-campus-gray border-white/20 hover:border-campus-green hover:text-white"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FeedbackForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-campus-green/20 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-campus-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-3xl text-white">Merci !</h3>
        <p className="text-campus-gray max-w-md mx-auto">
          Tes réponses nous aident à construire Campus+ pour toi. On te tient au courant.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Profil */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl text-campus-green uppercase tracking-wide">
          Ton profil
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-campus-gray text-sm">Nom (optionnel)</Label>
            <Input
              value={form.nom}
              onChange={(e) => set("nom", e.target.value)}
              placeholder="Ton prénom ou pseudonyme"
              className="bg-campus-surface border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-campus-gray text-sm">École *</Label>
            <Input
              value={form.ecole}
              onChange={(e) => set("ecole", e.target.value)}
              placeholder="Ex: ENEAM, UAC, EPAC..."
              required
              className="bg-campus-surface border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-campus-gray text-sm">Filière</Label>
            <Input
              value={form.filiere}
              onChange={(e) => set("filiere", e.target.value)}
              placeholder="Ex: Gestion, Informatique..."
              className="bg-campus-surface border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-campus-gray text-sm">Année</Label>
            <Input
              value={form.annee}
              onChange={(e) => set("annee", e.target.value)}
              placeholder="Ex: L1, L2, M1..."
              className="bg-campus-surface border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl h-12"
            />
          </div>
        </div>
      </div>

      {/* Réalité actuelle */}
      <div className="space-y-8">
        <h3 className="font-heading text-xl text-campus-green uppercase tracking-wide">
          Ta réalité aujourd'hui
        </h3>

        <CheckGroup
          label="Comment t'informes-tu sur les activités de ton campus ?"
          options={["WhatsApp", "Bouche à oreille", "Délégués", "Affiches", "Réseaux sociaux", "Je rate souvent les infos"]}
          selected={form.sources}
          onChange={(v) => set("sources", v)}
        />

        <CheckGroup
          label="Qu'est-ce qui manque aujourd'hui ?"
          options={["Infos claires", "Opportunités", "Vie étudiante", "Projets étudiants", "Événements", "Networking"]}
          selected={form.manques}
          onChange={(v) => set("manques", v)}
        />

        <CheckGroup
          label="Qu'est-ce qui t'intéresserait le plus ?"
          options={["Actualités campus", "Interviews", "Opportunités", "Résumés rapides", "Vidéos courtes", "Spotlight étudiants"]}
          selected={form.interets}
          onChange={(v) => set("interets", v)}
        />

        <RadioGroup
          label="Quelle plateforme utilises-tu le plus ?"
          options={["WhatsApp", "TikTok", "Instagram", "Telegram", "Facebook"]}
          selected={form.plateforme}
          onChange={(v) => set("plateforme", v)}
        />

        <div className="space-y-3">
          <p className="text-white font-medium">
            Si tu pouvais changer une chose dans la communication universitaire, ce serait quoi ?
          </p>
          <Textarea
            value={form.suggestion}
            onChange={(e) => set("suggestion", e.target.value)}
            placeholder="Dis-nous tout..."
            rows={4}
            className="bg-campus-surface border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl resize-none"
          />
        </div>
      </div>

      {/* Rejoindre */}
      <div className="space-y-6 p-6 bg-campus-surface rounded-2xl border border-campus-green/20">
        <p className="text-white font-heading text-lg">Veux-tu rejoindre le mouvement ?</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => set("rejoindre", !form.rejoindre)}
            className={cn(
              "relative w-14 h-7 rounded-full transition-all duration-300",
              form.rejoindre ? "bg-campus-green" : "bg-white/20"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm",
                form.rejoindre ? "left-7" : "left-0.5"
              )}
            />
          </button>
          <span className={cn("font-medium transition-colors", form.rejoindre ? "text-campus-green" : "text-campus-gray")}>
            {form.rejoindre ? "Oui, je veux rejoindre !" : "Pas pour l'instant"}
          </span>
        </div>

        {form.rejoindre && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <Label className="text-campus-gray text-sm">WhatsApp</Label>
              <Input
                value={form.contact_whatsapp}
                onChange={(e) => set("contact_whatsapp", e.target.value)}
                placeholder="+229 00 00 00 00"
                className="bg-campus-black border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-campus-gray text-sm">Email</Label>
              <Input
                type="email"
                value={form.contact_email}
                onChange={(e) => set("contact_email", e.target.value)}
                placeholder="ton@email.com"
                className="bg-campus-black border-white/20 text-white placeholder:text-campus-gray/50 focus:border-campus-green rounded-xl h-12"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-campus-green text-campus-black font-bold text-lg h-14 rounded-2xl hover:bg-campus-deep transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        Envoyer mes réponses →
      </button>
    </form>
  );
}
