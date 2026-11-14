import { useState } from "react";
import { Globe, BookOpen, MessageSquare, Star, MapPin, ChevronLeft } from "lucide-react";

interface RegistrationData {
  idioma: string;
  rol: string;
  nombre: string;
  lugar: string;
  nivel: string;
}

interface RegistrationProps {
  onComplete: (data: RegistrationData) => void;
}

export function Registration({ onComplete }: RegistrationProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>({
    idioma: "es",
    rol: "",
    nombre: "",
    lugar: "",
    nivel: "",
  });

  const totalSteps = 4;

  const next = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const canAdvance = () => {
    if (step === 1) return !!data.idioma;
    if (step === 2) return !!data.rol;
    if (step === 3) return true; // name/place optional
    if (step === 4) return !!data.nivel;
    return false;
  };

  return (
    <div className="flex h-dvh flex-col bg-tanino px-6 pb-8 pt-6">
      {/* Progress bars */}
      <div className="mb-8 flex gap-1">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-400 ${
              i < step ? "bg-oro" : "bg-tanino-light"
            }`}
          />
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-1 flex-col gap-6">
        {step === 1 && (
          <>
            <h2 className="font-display text-2xl tracking-wide text-oro">
              IDIOMA DE LA APP
            </h2>
            <p className="text-sm text-neblina-soft">
              Elige en que idioma quieres ver la interfaz.
            </p>
            <div className="flex flex-col gap-2">
              <OptionButton
                icon={Globe}
                label="Espanol"
                selected={data.idioma === "es"}
                onClick={() => setData({ ...data, idioma: "es" })}
              />
              <OptionButton
                icon={Globe}
                label="English"
                tag="Pronto"
                disabled
              />
              <OptionButton
                icon={Globe}
                label="Portugues"
                tag="Pronto"
                disabled
              />
              <OptionButton
                icon={Globe}
                label="Francais"
                tag="Pronto"
                disabled
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display text-2xl tracking-wide text-oro">
              TU ROL
            </h2>
            <p className="text-sm text-neblina-soft">
              Esto nos ayuda a adaptar la experiencia.
            </p>
            <div className="flex flex-col gap-2">
              <OptionButton
                icon={BookOpen}
                label="Aprendiz"
                desc="Quiero aprender pemon"
                selected={data.rol === "aprendiz"}
                onClick={() => setData({ ...data, rol: "aprendiz" })}
              />
              <OptionButton
                icon={MessageSquare}
                label="Hablante"
                desc="Ya hablo algo de pemon"
                selected={data.rol === "hablante"}
                onClick={() => setData({ ...data, rol: "hablante" })}
              />
              <OptionButton
                icon={Star}
                label="Lider comunitario"
                desc="Puedo revisar y validar"
                tag="Requiere aprobacion"
                selected={data.rol === "lider"}
                onClick={() => setData({ ...data, rol: "lider" })}
              />
              <OptionButton
                icon={MapPin}
                label="Visitante"
                desc="Turista o curioso"
                selected={data.rol === "visitante"}
                onClick={() => setData({ ...data, rol: "visitante" })}
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-display text-2xl tracking-wide text-oro">
              NOMBRE Y LUGAR
            </h2>
            <p className="text-sm text-neblina-soft">
              Opcional. Solo sirve para dar credito a tus aportes.
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="reg-name" className="mb-1 block text-xs font-bold text-neblina-soft">
                  Nombre o apodo
                </label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Opcional"
                  autoComplete="off"
                  value={data.nombre}
                  onChange={(e) => setData({ ...data, nombre: e.target.value })}
                  className="w-full rounded-xl border-[1.5px] border-transparent bg-tanino-light px-4 py-3 text-neblina placeholder:text-neblina-soft/50 outline-none focus:border-oro"
                />
              </div>
              <div>
                <label htmlFor="reg-place" className="mb-1 block text-xs font-bold text-neblina-soft">
                  Lugar <span className="font-normal text-neblina-soft/50">(procedencia)</span>
                </label>
                <input
                  id="reg-place"
                  type="text"
                  placeholder="Ej: Canaima, Caracas..."
                  autoComplete="off"
                  value={data.lugar}
                  onChange={(e) => setData({ ...data, lugar: e.target.value })}
                  className="w-full rounded-xl border-[1.5px] border-transparent bg-tanino-light px-4 py-3 text-neblina placeholder:text-neblina-soft/50 outline-none focus:border-oro"
                />
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="font-display text-2xl tracking-wide text-oro">
              TU NIVEL DE PEMON
            </h2>
            <p className="text-sm text-neblina-soft">
              No importa tu nivel. Todos son bienvenidos.
            </p>
            <div className="flex flex-col gap-2">
              <OptionButton
                label="Ninguno"
                desc="No se nada de pemon"
                selected={data.nivel === "ninguno"}
                onClick={() => setData({ ...data, nivel: "ninguno" })}
              />
              <OptionButton
                label="Basico"
                desc="Conozco algunas palabras"
                selected={data.nivel === "basico"}
                onClick={() => setData({ ...data, nivel: "basico" })}
              />
              <OptionButton
                label="Intermedio"
                desc="Entiendo frases simples"
                selected={data.nivel === "intermedio"}
                onClick={() => setData({ ...data, nivel: "intermedio" })}
              />
              <OptionButton
                label="Avanzado"
                desc="Lo hablo con fluidez"
                selected={data.nivel === "avanzado"}
                onClick={() => setData({ ...data, nivel: "avanzado" })}
              />
            </div>
          </>
        )}
      </div>

      {/* Footer nav */}
      <div className="flex items-center gap-2 pt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-1 text-sm font-bold text-neblina-soft transition-colors hover:text-neblina"
          >
            <ChevronLeft className="h-4 w-4" /> Atras
          </button>
        )}
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance()}
          className="ml-auto rounded-xl bg-oro px-6 py-3 font-bold text-tanino transition-all active:scale-[0.97] disabled:opacity-40"
        >
          {step < totalSteps ? "Siguiente" : "Ver mi tarjeta"}
        </button>
      </div>
    </div>
  );
}

/* ── Reusable option button ── */

interface OptionButtonProps {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  desc?: string;
  tag?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function OptionButton({ icon: Icon, label, desc, tag, selected, disabled, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex min-h-[56px] items-center gap-4 rounded-xl px-4 py-3 text-left transition-all ${
        disabled
          ? "pointer-events-none opacity-40"
          : selected
          ? "bg-oro/15 outline outline-[1.5px] outline-oro"
          : "bg-tanino-light hover:bg-tanino-light/80"
      }`}
    >
      {Icon && (
        <Icon className={`h-6 w-6 flex-shrink-0 ${selected ? "text-oro" : "text-roca"}`} />
      )}
      <div className="min-w-0 flex-1">
        <p className={`font-bold ${selected ? "text-neblina" : "text-neblina"}`}>{label}</p>
        {desc && <p className="text-xs text-neblina-soft">{desc}</p>}
      </div>
      {tag && (
        <span className="ml-auto text-xs font-bold text-neblina-soft/50">{tag}</span>
      )}
    </button>
  );
}
