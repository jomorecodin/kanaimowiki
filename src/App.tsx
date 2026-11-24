import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./app/Layout";
import { HomePage } from "./features/home/HomePage";
import { DictionaryPage } from "./features/dictionary/DictionaryPage";
import { TranslatePage } from "./features/translator/TranslatePage";
import { PhrasesPage } from "./features/phrases/PhrasesPage";
import { HistoriasPage } from "./features/historias/HistoriasPage";
import { Splash } from "./features/onboarding/Splash";
import { Onboarding } from "./features/onboarding/Onboarding";
import { Registration } from "./features/onboarding/Registration";
import { ProfileCard } from "./features/onboarding/ProfileCard";

type AppPhase = "splash" | "onboarding" | "registration" | "profile" | "app";

interface UserProfile {
  idioma: string;
  rol: string;
  nombre: string;
  lugar: string;
  nivel: string;
}

export default function App() {
  // Skip intro if user already completed it
  const hasCompleted = localStorage.getItem("kw_onboarded") === "1";
  const [phase, setPhase] = useState<AppPhase>(hasCompleted ? "app" : "splash");
  const [profile, setProfile] = useState<UserProfile>({
    idioma: "es",
    rol: "",
    nombre: "",
    lugar: "",
    nivel: "",
  });

  const handleSplashDone = useCallback(() => setPhase("onboarding"), []);
  const handleOnboardingDone = useCallback(() => setPhase("registration"), []);
  const handleRegistrationDone = useCallback((data: UserProfile) => {
    setProfile(data);
    setPhase("profile");
  }, []);
  const handleEnterApp = useCallback(() => {
    localStorage.setItem("kw_onboarded", "1");
    localStorage.setItem("kw_profile", JSON.stringify(profile));
    setPhase("app");
  }, [profile]);

  if (phase === "splash") return <Splash onDone={handleSplashDone} />;
  if (phase === "onboarding") return <Onboarding onComplete={handleOnboardingDone} />;
  if (phase === "registration") return <Registration onComplete={handleRegistrationDone} />;
  if (phase === "profile") {
    return (
      <ProfileCard
        nombre={profile.nombre}
        rol={profile.rol}
        nivel={profile.nivel}
        lugar={profile.lugar}
        onContinue={handleEnterApp}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="diccionario" element={<DictionaryPage />} />
          <Route path="traductor" element={<TranslatePage />} />
          <Route path="frases" element={<PhrasesPage />} />
          <Route path="historias" element={<HistoriasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
