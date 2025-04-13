import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { getAuthSession } from "@/lib/auth";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const session = await getAuthSession();
  const logoutRequested = (await cookies()).get("logout")?.value === "true";

  if (logoutRequested) {
    (await cookies()).set("logout", "false");
    return <div>Logging out...</div>;
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center">
        <Logout />
      </footer>
    </div>
  );
}
