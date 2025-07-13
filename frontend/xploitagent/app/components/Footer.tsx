import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="border-t-2 border-stone-800 text-white bg-black/80">
      <div className="px-10 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
          <p className="text-sm mt-4 text-neutral-400">
            XploitAgent is a modern platform for AI-driven cybersecurity,
            automation, and agentic intelligence exploration.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/docs">Documentation</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/community">Community</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Connect</h3>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li>
              Email:{" "}
              <a href="mailto:support@xploitagent.ai">support@xploitagent.ai</a>
            </li>
            <li>
              GitHub:{" "}
              <a href="https://github.com/xploitagent" target="_blank">
                xploitagent
              </a>
            </li>
            <li>
              Twitter:{" "}
              <a href="https://twitter.com/xploitagent" target="_blank">
                @xploitagent
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10  pt-10 text-center text-xs text-neutral-500 pb-4">
        <p className="text-center text-sm">
          {" "}
          © {new Date().getFullYear()}{" "}
          <span className="text-emerald-600">XploitAgent.</span> All rights
          reserved.
        </p>
      </div>
    </section>
  );
}
