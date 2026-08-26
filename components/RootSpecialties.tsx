import Link from "next/link";
import { Activity, ArrowRight, Baby, Bone, Brain, Ear, Eye, HeartPulse, Ribbon, ScanFace, Stethoscope } from "lucide-react";

const icons: Record<string, typeof HeartPulse> = {
  Cardiologia: HeartPulse,
  "Clínica Médica": Stethoscope,
  Dermatologia: ScanFace,
  Endocrinologia: Ribbon,
  "Ginecologia e Obstetrícia": Baby,
  Neurologia: Brain,
  Oftalmologia: Eye,
  "Ortopedia e Traumatologia": Bone,
  Otorrinolaringologia: Ear,
  Pediatria: Baby,
  Psiquiatria: Brain,
  Urologia: Activity,
};

export function RootSpecialties({ specialties, city }: { specialties: string[]; city: string }) {
  const cityParam = encodeURIComponent(city);
  return (
    <section className="root-specialties" aria-labelledby="root-specialties-title">
      <div className="shell">
        <div className="root-specialties-head">
          <h2 id="root-specialties-title">Encontre por especialidade</h2>
          <p>Escolha uma área da saúde para encontrar profissionais perto de você.</p>
        </div>
        <div className="root-specialties-grid">
          {specialties.map((specialty) => {
            const Icon = icons[specialty] ?? Stethoscope;
            return <Link key={specialty} href={`/buscar?cidade=${cityParam}&especialidade=${encodeURIComponent(specialty)}&tipo=profissionais`}>
              <span className="root-specialty-icon"><Icon size={26} strokeWidth={1.8} /></span>
              <span>{specialty}</span>
            </Link>;
          })}
        </div>
        <Link className="root-specialties-more" href={`/buscar?cidade=${cityParam}&tipo=profissionais`}>Ver todas as especialidades <ArrowRight size={15} /></Link>
      </div>
    </section>
  );
}
