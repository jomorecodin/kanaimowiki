import { NavLink } from "react-router-dom";
import { Home, BookOpen, Languages, MessageSquare, Scroll } from "lucide-react";

const tabs = [
  { to: "/", icon: Home, label: "Inicio" },
  { to: "/diccionario", icon: BookOpen, label: "Palabras" },
  { to: "/traductor", icon: Languages, label: "Traducir" },
  { to: "/frases", icon: MessageSquare, label: "Frases" },
  { to: "/historias", icon: Scroll, label: "Historias" },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/6 bg-tanino">
      <div className="mx-auto flex max-w-md items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? "text-oro" : "text-neblina-soft/60"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`flex items-center justify-center rounded-full px-3 py-1 ${isActive ? "bg-oro/15" : ""}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-bold">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
