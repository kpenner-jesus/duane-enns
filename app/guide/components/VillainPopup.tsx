"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  onDone: () => void;
};

export default function VillainPopup({ message, onDone }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2000);
    const t2 = setTimeout(() => onDone(), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4"
         style={{ background: "rgba(0,0,0,0.3)" }}>
      <div className={`w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl border-l-4 border-red-500 ${exiting ? "ebook-villain-out" : "ebook-villain-in"}`}>
        <div className="flex items-start gap-3">
          {/* Villain face */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
            😤
          </div>
          <div>
            <p className="text-sm font-bold text-red-600 mb-1"
               style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              Oops! Wrong bucket!
            </p>
            <p className="text-base text-navy leading-snug"
               style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
