import { useEffect, useState } from "react";

interface SplashProps {
  onDone: () => void;
}

export function Splash({ onDone }: SplashProps) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(onDone, 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-tanino transition-opacity duration-600 ${
        hiding ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="animate-fade-in text-center">
        <h1 className="font-display text-5xl tracking-widest text-oro sm:text-6xl">
          KANAIMOWIKI
        </h1>
        <p className="mt-2 text-sm text-neblina-soft/70">
          El pemon vive en su gente
        </p>
        <div className="mx-auto mt-6 h-[3px] w-12 overflow-hidden rounded-full bg-tanino-light">
          <div className="h-full w-1/2 animate-loader rounded-full bg-oro" />
        </div>
      </div>
    </div>
  );
}
