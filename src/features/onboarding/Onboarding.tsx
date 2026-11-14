import { useState } from "react";
import { BookOpen, Languages, Users } from "lucide-react";
import { TepuyScene } from "./TepuyScene";

const slides = [
  {
    icon: null, // tepuy scene instead
    title: "KANAIMOWIKI",
    text: "Un diccionario vivo del idioma pemon kamarakoto, nacido del libro maestro del profesor Roger en Canaima.",
  },
  {
    icon: BookOpen,
    title: "DICCIONARIO",
    text: "Palabras reales, revisadas por hablantes nativos. Cada entrada lleva su estado: confirmada o en revision.",
  },
  {
    icon: Languages,
    title: "TRADUCIR",
    text: "Busca palabras entre pemon y espanol. Solo se muestran traducciones de datos revisados.",
  },
  {
    icon: Users,
    title: "COMUNIDAD",
    text: "Propone palabras nuevas y grabaciones. Todo aporte pasa por el profesor Roger antes de publicarse.",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[current];

  return (
    <div className="flex h-dvh flex-col bg-tanino">
      {/* Slide content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        {slide.icon ? (
          <slide.icon className="h-20 w-20 text-oro" />
        ) : (
          <TepuyScene />
        )}
        <h2 className="font-display text-3xl tracking-wider text-oro">
          {slide.title}
        </h2>
        <p className="max-w-[280px] text-base text-neblina-soft">
          {slide.text}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center gap-4 px-6 pb-10 pt-4">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-oro" : "w-2 bg-tanino-light"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-full rounded-xl bg-oro py-3.5 font-bold text-tanino transition-all active:scale-[0.97]"
        >
          {current < slides.length - 1 ? "Siguiente" : "Comenzar"}
        </button>

        {current < slides.length - 1 && (
          <button
            type="button"
            onClick={onComplete}
            className="text-sm font-bold text-neblina-soft/60 transition-colors hover:text-neblina"
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  );
}
