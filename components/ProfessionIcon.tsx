import type { SVGProps } from "react";
import { Activity, Apple, Brain, Dumbbell, Ear, HeartPulse, Pill, Syringe, Stethoscope, UserRound } from "lucide-react";

export function ToothIcon({ size = 25, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path
        d="M12 4.45c-1.54 0-2.44-1.16-4.1-.86-2.27.41-3.45 2.24-3.4 4.66.05 2.06.94 3.3 1.55 4.64.69 1.5.54 5.45 2.29 6.44 1.57.89 2.13-1.36 2.54-3.13.29-1.24.54-2.07 1.12-2.07s.83.83 1.12 2.07c.41 1.77.97 4.02 2.54 3.13 1.75-.99 1.6-4.94 2.29-6.44.61-1.34 1.5-2.58 1.55-4.64.05-2.42-1.13-4.25-3.4-4.66-1.66-.3-2.56.86-4.1.86Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M9.4 5.05c.83.42 1.65.62 2.6.62" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

export function ProfessionIcon({ profession, size = 25 }: { profession: string; size?: number }) {
  if (profession === "Médico") return <Stethoscope size={size} />;
  if (profession === "Dentista") return <ToothIcon size={size} />;
  if (profession === "Fisioterapeuta") return <Activity size={size} />;
  if (profession === "Psicólogo") return <Brain size={size} />;
  if (profession === "Nutricionista") return <Apple size={size} />;
  if (profession === "Fonoaudiólogo") return <Ear size={size} />;
  if (profession === "Enfermeiro") return <Syringe size={size} />;
  if (profession === "Farmacêutico") return <Pill size={size} />;
  if (profession === "Educador físico") return <Dumbbell size={size} />;
  if (profession === "Terapeuta") return <HeartPulse size={size} />;
  return <UserRound size={size} />;
}
