"use client";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function AppSessionProvider(props: {
  session: Session | null;
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <SessionProvider session={props.session}>{props.children}</SessionProvider>
  );
}
