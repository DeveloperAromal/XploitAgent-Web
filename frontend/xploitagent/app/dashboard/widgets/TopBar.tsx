import { Github, Search, Bell } from "lucide-react"; // Added Bell icon
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-6 py-3 shadow-md">
      {/* Left Section: Logo and Brand Name */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/logo.png" // Make sure this path is correct for your logo
          alt="Logo"
          width={36} // Slightly smaller for a sleeker look
          height={36}
          className="rounded-md"
        />
        <h1 className="text-white text-xl font-bold tracking-tight">
          XploitAgent
        </h1>{" "}
        {/* Changed to a more descriptive name */}
      </div>

      {/* Middle Section: Dashboard Title and Search */}
      <div className="flex items-center gap-8">
        <h2 className="text-neutral-300 text-lg font-semibold">Dashboard</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-9 pr-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all duration-200 w-64" // Wider search bar
          />
        </div>
      </div>

      {/* Right Section: Actions (Connect, Notifications, User) */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
          <Github className="w-4 h-4" /> {/* Slightly smaller icon */}
          Connect GitHub
        </button>

        <button className="p-2 rounded-full hover:bg-neutral-800 transition-colors duration-200 relative">
          <Bell className="w-5 h-5 text-neutral-400" />
          <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full border border-neutral-950"></span>{" "}
          {/* Notification dot */}
        </button>

        <div className="relative w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center cursor-pointer overflow-hidden">
          {/* Replace with actual user avatar if available */}
          <Image
            src="https://api.dicebear.com/7.x/initials/svg?seed=JD" // Example avatar
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
