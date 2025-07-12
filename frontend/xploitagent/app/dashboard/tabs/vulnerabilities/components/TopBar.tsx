import { Github, Bell } from "lucide-react"; // Added Bell icon
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-6 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-md"
        />
        <h1 className="text-white text-xl font-bold tracking-tight">
          XploitAgent
        </h1>{" "}
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-neutral-800 text-white border-2 border-zinc-700 px-4 py-2 rounded-full hover:bg-stone-900 transition-colors duration-200 text-sm font-medium">
          <Github className="w-4 h-4" />
          Connect GitHub
        </button>

        <button className="p-2 rounded-full hover:bg-neutral-800 transition-colors duration-200 relative">
          <Bell className="w-5 h-5 text-neutral-400" />
          <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full border border-neutral-950"></span>{" "}
        </button>

        <div className="relative w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center cursor-pointer overflow-hidden">
          <Image
            src="https://api.dicebear.com/7.x/initials/svg?seed=AR"
            alt="User Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
