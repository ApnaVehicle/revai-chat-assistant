import { ExpandableChatDemo } from "@/components/demo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen dashboard background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <Image
          src="/dashboard-bg.png"
          alt="CARGAIN Revenue Management Dashboard"
          fill
          priority
          className="object-cover object-top"
          quality={100}
        />
      </div>

      {/* Expandable chat positioned bottom-right */}
      <ExpandableChatDemo />
    </main>
  );
}
