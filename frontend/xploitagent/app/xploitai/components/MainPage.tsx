import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MainPage() {
  return (
    <section className="h-dvh px-10 flex items-center">
      <div className="max-w-4xl space-y-4">
        <h1 className="text-6xl">The Next Gen Ai for Cybersecurity</h1>
        <p className="text-neutral-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
          tempore nam, veritatis ducimus aut sequi, magni a tempora laboriosam
          voluptatem eos rerum delectus accusantium laborum minima ipsum
          praesentium. Culpa, facilis!
        </p>
        <Link href="/xploitai/chat" className="cursor-pointer">
          <button className="bg-white text-neutral-900 px-2 py-2 rounded-lg inline-flex items-center justify-center gap-2">
            <code>Try XploitAi</code> <ArrowUpRight />
          </button>
        </Link>
      </div>
    </section>
  );
}
