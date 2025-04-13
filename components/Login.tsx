"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function Login() {
  // Call this effect on mount to redirect to Keycloak
  React.useEffect(() => {
    signIn("keycloak", { callbackUrl: "/" });
  }, []);

  return <p>Redirecting to Keycloak...</p>;
}
