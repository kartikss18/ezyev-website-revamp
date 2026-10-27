import Image from "next/image";
import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="EzyEV home"
      className="flex items-center gap-2 rounded-full"
    >
      <Image src="/images/ezyev-mark.png" alt="" width={32} height={32} priority className="size-8" />
      <span className="text-lg font-semibold">EzyEV</span>
    </Link>
  );
}
