"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
  Large type tagline. Each word starts at 30% white and turns full white
  once it crosses a line 55% down the viewport, in reading order.
*/
export function TaglineReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const words = ref.current?.querySelectorAll<HTMLElement>(".tagline-word");
    if (!words?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const above = entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0);
          entry.target.classList.toggle("is-active", entry.isIntersecting || above);
        }
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 },
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);

  let index = 0;
  return (
    <section aria-label="What EzyEV promises" className="px-4 py-24">
      <div className="mx-auto mb-8 max-w-[42.5rem]">
        <Image src="/images/ezyev-mark.png" alt="" width={56} height={56} className="size-12" />
      </div>
      <h2
        ref={ref}
        className="mx-auto max-w-[42.5rem] text-4xl font-semibold tracking-tight md:text-5xl"
      >
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word) => {
              index += 1;
              return (
                <span key={index} className="tagline-word">
                  {word}{" "}
                </span>
              );
            })}
          </span>
        ))}
      </h2>
    </section>
  );
}
