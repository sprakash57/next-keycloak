"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleSignOut = async () => {
    // Clean NextAuth session
    await signOut();
  };

  // Helper function to get the id_token from the session
  // const getIdTokenHint = async () => {
  //   const response = await fetch("/api/auth/session");
  //   const session = await response.json();
  //   return session?.idToken || "";
  // };

  return (
    <button
      onClick={handleSignOut}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Log out
    </button>
  );
}
