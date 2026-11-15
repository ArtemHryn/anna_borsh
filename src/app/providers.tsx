"use client";

import { makeQueryClient } from "@/lib/query-client";
import { PrimeReactProvider } from "@primereact/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  return (
    <PrimeReactProvider license={process.env.NEXT_PUBLIC_PRIMEUI_LICENSE}>
      <SessionProvider refetchInterval={60 * 60}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </PrimeReactProvider>
  );
}
