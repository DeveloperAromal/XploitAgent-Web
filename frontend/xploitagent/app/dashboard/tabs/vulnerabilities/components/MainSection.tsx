"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { EllipsisVertical, History, TargetIcon } from "lucide-react";

type Vulnerability = {
  id: number;
  attack_id: string;
  attack_name: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  target: string;
  cvss_score: number;
  created_at: string;
  vul_id: string;
};

export default function VulnerabilitySection() {
  const [clientId, setClientId] = useState<string>("");
  const [vulnerabilityData, setVulnerabilityData] = useState<Vulnerability[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [clientName, setClientName] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const validateAndFetchClientId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const { data } = await axios.get(`${BASE_URL}/api/v1/admin/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const client_id = data?.user?.user?.additionalData?.[0]?.client_id;
        if (client_id) setClientId(client_id);
        else setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    validateAndFetchClientId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!clientId) return;

      setLoading(true);
      try {
        const [vulnRes, clientRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/v1/get-vulnerability/${clientId}`),
          axios.get(`${BASE_URL}/api/v1/get/client-by-id/${clientId}`),
        ]);

        setVulnerabilityData(vulnRes.data);
        setClientName(clientRes.data?.[0]?.name || "Unknown");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  const toggleMenu = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  const Skeleton = () => (
    <div className="relative p-5 bg-neutral-950/50 border border-zinc-700 rounded-2xl animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2 w-3/4">
          <div className="h-4 bg-zinc-700 rounded w-2/3" />
          <div className="h-3 bg-zinc-800 rounded w-full" />
        </div>
        <EllipsisVertical className="w-5 h-5 text-zinc-600" />
      </div>
      <div className="bg-neutral-800 rounded-3xl border border-stone-600 inline-block px-3 py-2 mb-3 w-2/3">
        <div className="h-3 bg-zinc-700 rounded w-full" />
      </div>
      <div className="h-4 bg-zinc-700 rounded w-1/2 mb-4" />
      <div className="h-8 bg-zinc-700 rounded w-24" />
    </div>
  );

  return (
    <section
      ref={dropdownRef}
      className="min-h-screen bg-neutral-950 p-6 font-inter flex justify-center items-start py-20"
    >
      <div className="w-full max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : vulnerabilityData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vulnerabilityData.map((vuln, idx) => (
              <div
                key={idx}
                className="relative p-5 bg-neutral-950/50 border border-zinc-700 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="overflow-hidden">
                    <h3 className="text-md font-bold text-white truncate">
                      {vuln.attack_name}
                    </h3>
                    <p className="text-xs text-zinc-400 break-all">
                      {vuln.attack_id}
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(idx)}
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      <EllipsisVertical className="w-5" />
                    </button>

                    {menuOpenIndex === idx && (
                      <div className="absolute right-0 mt-2 w-36 bg-neutral-900 border border-zinc-700 rounded-md shadow-lg z-20">
                        <ul className="text-sm text-white">
                          <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">
                            View Report
                          </li>
                          <li className="px-4 py-2 hover:bg-neutral-800 cursor-pointer">
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-neutral-800 rounded-3xl border border-stone-600 inline-block px-2 py-1 mb-3">
                  <p className="text-sm text-neutral-300 flex gap-1 items-center justify-center">
                    <TargetIcon className="w-3.5 h-3.5" />
                    {clientName} /{" "}
                    <span className="text-zinc-400">{vuln.target}</span>
                  </p>
                </div>

                <p className="text-sm text-zinc-400 mb-1">
                  <span className="font-medium text-zinc-300">Severity:</span>{" "}
                  {vuln.severity}
                </p>
                <p className="text-sm text-zinc-400 mb-1">
                  <span className="font-medium text-zinc-300">CVSS:</span>{" "}
                  {vuln.cvss_score}
                </p>
                <p className="text-sm text-zinc-400 mb-4 truncate">
                  <span className="font-medium text-zinc-300">Desc:</span>{" "}
                  {vuln.description}
                </p>

                <p className="text-sm text-zinc-500 mb-4">
                  {new Date(vuln.created_at).toLocaleString()}
                </p>

                <Link
                  href={`/dashboard/tabs/vulnerabilities/${clientId}`}
                  className="inline-block bg-white hover:bg-zinc-200/50 text-sm font-medium text-black px-4 py-2 rounded-lg transition"
                >
                  See more
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl">
            <div className="text-6xl mb-4">
              <History />
            </div>
            <p className="text-xl font-medium">No vulnerabilities found</p>
            <p className="text-md mt-2 text-zinc-500">
              Once your scans detect something, it&apos;ll appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
