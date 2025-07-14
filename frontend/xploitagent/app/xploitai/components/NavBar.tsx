// import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed w-full py-4 bg-linear-to-b from-black to-transparent bg-black  z-50">
      <div className="absolute inset-x-0 top-full h-3 bg-linear-to-b from-black to-transparent md:h-14 lg:h-18 z-10" />
      <div className="absolute inset-x-0 top-full h-1 bg-linear-to-b from-black to-transparent md:h-14 lg:h-18 z-10" />
      <div className="absolute inset-x-0 top-full h-1 bg-linear-to-b from-black to-transparent md:h-14 lg:h-18 z-10" />

      <div>
        <nav className="px-10 flex justify-center items-center">
          <div className="flex items-center gap-10">
            <div className="flex items-center justify-center">
              {/* <Link href="#" className="relative mt-1">
                <h1>
                  <Image
                    src="/assets/logo.png"
                    alt="logo"
                    width={40}
                    height={240}
                  />
                </h1>
              </Link> */}
            </div>
            <div>
              <ul className="flex gap-[3rem] h-auto">
                <Link
                  href="#"
                  className="hover:bg-zinc-200/5 rounded-md px-4 py-2 text-white"
                >
                  <li>Api</li>
                </Link>
                <Link
                  href="#"
                  className="hover:bg-zinc-200/5 rounded-md px-4 py-2 text-white"
                >
                  <li>Careers</li>
                </Link>
                <Link
                  href="/pricing"
                  className="hover:bg-zinc-200/5 rounded-md px-4 py-2 text-white"
                >
                  <li>Pricing</li>
                </Link>
                <Link
                  href="#"
                  className="hover:bg-zinc-200/5 rounded-md px-4 py-2 text-white"
                >
                  <li>Enterprise</li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
