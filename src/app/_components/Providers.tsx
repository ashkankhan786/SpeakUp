// src/components/providers.tsx
"use client";

import { ConvexProvider } from "convex/react";
import { convex } from "@/lib/convexClient";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </SessionProvider>
  );
}
