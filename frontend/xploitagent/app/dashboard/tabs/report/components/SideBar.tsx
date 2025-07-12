"use client";

import { usePathname } from "next/navigation";
import {
  ShieldCheck, // Replaces HomeIcon for Dashboard
  Bug, // Replaces MessagesSquare for Vulnerability Findings
  FileText, // Replaces BookOpenText for Reports
  ClipboardList, // Stays for Compliance Checks
  HardDrive, // Replaces Box for Asset Management
  Users, // Replaces User for Team Management
  Settings, // Replaces Video for Integrations (or System Settings)
  LogOutIcon,
  Menu,
  X,
  Target, // New icon for Scans
  Bell, // New icon for Alerts
  Code, // New icon for Exploits/Playbooks
} from "lucide-react";
import { useState } from "react";

export interface Tabs {
  tabName: string;
  path: string;
  icon: any;
  section?: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const tabs: Tabs[] = [
    {
      tabName: "Dashboard",
      path: "/dashboard",
      icon: ShieldCheck,
      section: "Overview",
    },
    {
      tabName: "Vulnerability Findings",
      path: "/dashboard/tabs/vulnerabilities",
      icon: Bug,
    },
    {
      tabName: "Scan Management",
      path: "/dashboard/tabs/scans",
      icon: Target,
    },
    {
      tabName: "Reports & Analytics",
      path: "/dashboard/reports",
      icon: FileText,
      section: "Analysis",
    },
    {
      tabName: "Logout",
      path: "/dashboard/integrations",
      icon: LogOutIcon,
      section: "Analysis",
    },
    {
      tabName: "Compliance Checks",
      path: "/dashboard/compliance",
      icon: ClipboardList,
    },
    { tabName: "Asset Management", path: "/dashboard/assets", icon: HardDrive },
    {
      tabName: "Alerts & Notifications",
      path: "/dashboard/alerts",
      icon: Bell,
    },
    {
      tabName: "Exploits & Playbooks",
      path: "/dashboard/playbooks",
      icon: Code,
    },
    { tabName: "Team Management", path: "/dashboard/team", icon: Users },
    {
      tabName: "Integrations",
      path: "/dashboard/integrations",
      icon: Settings,
    },
  ];

  const handlePath = (path: string) => {
    setIsOpen(false); // close sidebar on mobile
    window.open(path, "_self");
  };

  const groupedTabs = tabs.reduce((acc: Record<string, Tabs[]>, tab) => {
    const group = tab.section || "General"; // Changed "Other" to "General"
    acc[group] = acc[group] || [];
    acc[group].push(tab);
    return acc;
  }, {});

  return (
    <>
      {/* Hamburger - visible only on small screens */}
      <div className="md:hidden p-4 flex justify-between items-center border-b border-neutral-700 bg-neutral-900">
        <h2 className="text-2xl font-bold text-emerald-400">ThreatGuard</h2>{" "}
        {/* Changed name and color */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <section
        className={`h-screen sidebar bg-neutral-950 border-r border-neutral-800 shadow-lg flex flex-col justify-between
        fixed z-50 top-0 left-0 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex md:w-64`}
      >
        <div className="flex-1 overflow-auto py-4">
          {Object.entries(groupedTabs).map(([section, groupTabs], i) => (
            <div key={i} className="mb-6 px-4">
              <h3 className="text-gray-500 text-xs uppercase px-2 mb-3 font-semibold tracking-wider">
                {section}
              </h3>
              {groupTabs.map((tab, index) => {
                const isActive =
                  pathname === tab.path ||
                  pathname === tab.path.replace(/\/$/, "");
                const Icon = tab.icon;

                return (
                  <button
                    key={index}
                    onClick={() => handlePath(tab.path)}
                    className={`w-full mb-1 p-3 flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all rounded-lg
                    ${
                      isActive
                        ? "bg-neutral-800 text-emerald-400 shadow-inner"
                        : "text-zinc-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`${
                        isActive ? "text-emerald-400" : "text-gray-500"
                      }`}
                    />
                    {tab.tabName}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
