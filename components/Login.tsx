"use client";

import { Loader } from "@/assets/icons/loader";
import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  // Call this effect on mount to redirect to Keycloak
  React.useEffect(() => {
    signIn("keycloak", { callbackUrl: "/" });
  }, []);

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-white">
      <Loader className="animate-spin" />
    </main>
  );
}
