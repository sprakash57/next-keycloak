import { Loader } from "@/assets/icons/loader";

export default function Loading() {
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-white">
      <Loader className="animate-spin" />
    </main>
  );
}
