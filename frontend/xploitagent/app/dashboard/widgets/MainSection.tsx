"use client";

import { Clipboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MainSection() {
  const [clipboard, setClipboard] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboard(text);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };
  return (
    <section className="bg-[#141414] h-full px-6 py-6 flex flex-col items-center justify-center">
      <div className="link_pasting flex items-center justify-center">
        <input
          value={clipboard}
          onChange={(e) => setClipboard(e.target.value)}
          className="border-1 border-neutral-500 rounded-md px-5 py-3 w-100 h-14 text-gray-400 active:border-none active:border-blue-800"
        />
        <Link
          href={"#"}
          className="bg-green-600 text-white text-center flex items-center justify-center font-bold px-5 py-3 h-14 relative right-6 rounded-tr-md rounded-br-md"
        >
          Check
        </Link>
      </div>
      <div className="paste_button flex items-center gap-2 text-gray-400">
        <button
          onClick={handlePaste}
          className="paste_button flex items-center gap-2 mt-8 text-gray-400"
        >
          <Clipboard size={18} />
          <span>Paste</span>
        </button>
      </div>
    </section>
  );
}
