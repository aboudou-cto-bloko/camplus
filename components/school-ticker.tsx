import Image from "next/image";
import { cn } from "@/lib/utils";

type School = {
  abbr: string;
  full: string;
  featured?: boolean;
  logo?: string;
};

const SCHOOLS_ROW1: School[] = [
  { abbr: "ENEAM", full: "École Nationale d'Économie Appliquée et de Management", featured: true, logo: "/assets/universities/eneam_thumb.png" },
  { abbr: "EPAC", full: "École Polytechnique d'Abomey-Calavi" },
  { abbr: "UAC", full: "Université d'Abomey-Calavi", logo: "/assets/universities/uac_thumb.png" },
  { abbr: "FASEG", full: "Faculté des Sciences Économiques et de Gestion" },
  { abbr: "ESGIS", full: "École Supérieure de Gestion, d'Informatique et des Sciences" },
  { abbr: "ENA", full: "École Nationale d'Administration" },
  { abbr: "FSS", full: "Faculté des Sciences de la Santé" },
  { abbr: "ESTAC", full: "École Supérieure des Techniques d'Administration et de Commerce" },
  { abbr: "ENS", full: "École Normale Supérieure" },
  { abbr: "IFRI", full: "Institut de Formation et de Recherche en Informatique" },
  { abbr: "FLASH", full: "Faculté des Lettres, Arts et Sciences Humaines" },
  { abbr: "IRGIB", full: "IRGIB-Africa University", logo: "/assets/universities/irgib_thumb.png" },
];

const SCHOOLS_ROW2: School[] = [
  { abbr: "UP", full: "Université de Parakou", logo: "/assets/universities/up_thumb.png" },
  { abbr: "IUTS", full: "Institut Universitaire de Technologie de Savè" },
  { abbr: "FDS", full: "Faculté des Sciences et Techniques" },
  { abbr: "FDSP", full: "Faculté de Droit et de Science Politique" },
  { abbr: "OBADA", full: "OBADA Institute" },
  { abbr: "UCAO", full: "Université Catholique de l'Afrique de l'Ouest", logo: "/assets/universities/ucao_thumb.png" },
  { abbr: "UNA", full: "Université Nationale d'Agriculture" },
  { abbr: "CPGE", full: "Classes Préparatoires aux Grandes Écoles" },
  { abbr: "ISM", full: "Institut Supérieur des Métiers" },
  { abbr: "HECM", full: "Haute École de Commerce et de Management" },
  { abbr: "HELFS", full: "Haute École de Logistique, Finance et Sciences" },
  { abbr: "PIGIER", full: "Pigier Bénin" },
];

function SchoolChip({ abbr, full, featured = false, logo }: School) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl border shrink-0 transition-colors duration-300",
        featured
          ? "bg-campus-green/10 border-campus-green/40"
          : "bg-campus-surface/60 border-white/8"
      )}
    >
      {logo ? (
        <div className="w-9 h-9 flex items-center justify-center shrink-0 rounded-lg overflow-hidden bg-white/5">
          <Image
            src={logo}
            alt={abbr}
            width={36}
            height={36}
            className="object-contain w-full h-full"
            unoptimized
          />
        </div>
      ) : (
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-heading leading-none",
            featured
              ? "bg-campus-green/20 text-campus-green"
              : "bg-white/5 text-white/40"
          )}
        >
          {abbr.slice(0, 2)}
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            "font-heading text-sm leading-none",
            featured ? "text-campus-green" : "text-white"
          )}
        >
          {abbr}
        </span>
        <span className="text-white/30 text-[10px] max-w-[160px] truncate leading-tight">
          {full}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({
  schools,
  reverse = false,
  speed = 40,
}: {
  schools: School[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...schools, ...schools];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-campus-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-campus-black to-transparent z-10 pointer-events-none" />

      <div
        className={cn("flex gap-3", reverse ? "animate-marquee-right" : "animate-marquee-left")}
        style={{ width: "max-content", animationDuration: `${speed}s` }}
      >
        {doubled.map((school, i) => (
          <SchoolChip key={`${school.abbr}-${i}`} {...school} />
        ))}
      </div>
    </div>
  );
}

export function SchoolTicker() {
  return (
    <section className="bg-campus-black py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mb-12 text-center">
        <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Rejoindre</p>
        <h3 className="font-heading text-2xl md:text-3xl text-white">
          Des étudiants de{" "}
          <span className="text-campus-green">toutes les écoles du Bénin</span>
        </h3>
      </div>

      <div className="space-y-4">
        <MarqueeRow schools={SCHOOLS_ROW1} speed={45} />
        <MarqueeRow schools={SCHOOLS_ROW2} reverse speed={55} />
      </div>
    </section>
  );
}
