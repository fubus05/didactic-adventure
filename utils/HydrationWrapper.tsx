"use client";
import React from "react";

export function HydrationWrapper({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  return <>{children}</>;
}
