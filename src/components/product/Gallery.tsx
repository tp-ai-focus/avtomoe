"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, name, badges }: { images: string[]; name: string; badges?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink/[0.07] bg-carbon-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {badges && <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-2">{badges}</div>}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-24 overflow-hidden rounded-xl border transition ${
                i === active ? "border-accent-400 ring-2 ring-accent-500/30" : "border-ink/10 opacity-60 hover:opacity-100"
              }`}
              aria-label={`Фото ${i + 1}`}
            >
              <Image src={src} alt={`${name} — фото ${i + 1}`} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
