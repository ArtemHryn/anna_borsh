"use client";

import { makeQueryClient } from "@/lib/query-client";
import { PrimeReactProvider, PrimeReactStyleSheet } from "@primereact/core";
import Aura from "@primeuix/themes/aura";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

const styledStyleSheet = new PrimeReactStyleSheet();

const ukrainianLocale = {
  dayNames: [
    "неділя",
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "пʼятниця",
    "субота",
  ],
  dayNamesShort: ["нед", "пон", "вів", "сер", "чет", "птн", "суб"],
  dayNamesMin: ["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
  monthNames: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
  monthNamesShort: [
    "січ",
    "лют",
    "бер",
    "кві",
    "тра",
    "чер",
    "лип",
    "сер",
    "вер",
    "жов",
    "лис",
    "гру",
  ],
  firstDayOfWeek: 1,
  dateFormat: "dd.mm.yy",
  prevMonth: "Попередній місяць",
  nextMonth: "Наступний місяць",
  chooseMonth: "Оберіть місяць",
  chooseYear: "Оберіть рік",
  today: "Сьогодні",
  clear: "Очистити",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());

  useServerInsertedHTML(() => {
    const styleElements = styledStyleSheet.getAllElements();
    styledStyleSheet.clear();

    return <>{styleElements}</>;
  });

  return (
    <PrimeReactProvider
      license={process.env.NEXT_PUBLIC_PRIMEUI_LICENSE}
      theme={{ preset: Aura, options: { darkModeSelector: false } }}
      stylesheet={styledStyleSheet}
      locale="uk"
      locales={{ uk: ukrainianLocale }}
    >
      <SessionProvider refetchInterval={60 * 60}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </PrimeReactProvider>
  );
}
