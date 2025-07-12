"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  EllipsisVertical,
  FileText,
  Trash2,
  CalendarClock,
  Target,
  Search,
} from "lucide-react";

type ScanData = {
  attack_id: string;
  attack_name: string;
  created_at: string;
  target: string;
};

const Spinner = () => (
  <div className="flex items-center justify-center h-24">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-400"></div>
  </div>
);

export default function MainSection() {
  const [clientId, setClientId] = useState<string>("");
  const [scanData, setScanData] = useState<ScanData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
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
    const fetchScanData = async () => {
      if (!clientId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get/history/${clientId}`
        );
        setScanData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchClientName = async () => {
      if (!clientId) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get/client-by-id/${clientId}`
        );
        setName(res.data?.[0]?.name || "Unknown");
      } catch (error) {
        console.error(error);
      }
    };

    fetchScanData();
    fetchClientName();
  }, [clientId]);

  const toggleMenu = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };

  return (
    <section
      ref={dropdownRef}
      className="min-h-screen bg-neutral-950 p-6 font-inter flex flex-col justify-center items-start py-14"
    >
      <div className="search_container w-full mb-8">
        <div className="search_box w-full flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="search..."
            className="w-full px-5 py-3 border-1 border-neutral-400 rounded-tl-md rounded-bl-md"
          />
          <button className="px-4 py-3 rounded-tr-md rounded-br-md border-1 border-white bg-white font-bold text-black">
            Search
          </button>
        </div>
      </div>
      <div className="w-full max-w-7xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 text-white text-lg h-[60vh]">
            <Spinner />
            <p>Fetching scan history...</p>
          </div>
        ) : scanData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scanData.map((scan, idx) => (
              <div
                key={idx}
                className="relative p-5 bg-neutral-950/50 border border-zinc-700 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="overflow-hidden">
                    <h3
                      className="text-md font-bold text-white truncate"
                      title={scan.attack_id}
                    >
                      {scan.attack_name}
                    </h3>
                    <p className="text-xs text-zinc-400 break-all">
                      {scan.attack_id}
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
                          <li className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-800 cursor-pointer">
                            <FileText className="w-4 h-4" />
                            View Report
                          </li>
                          <li className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-800 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-red-500" />
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-neutral-800 rounded-md inline-flex items-center gap-2 px-2 py-1 mb-3">
                  <Target className="w-4 h-4 text-zinc-400" />
                  <p className="text-sm text-neutral-300">
                    {name} /{" "}
                    <span className="text-zinc-400">{scan.target}</span>
                  </p>
                </div>

                <p className="text-sm text-zinc-300 mb-4 flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-zinc-400" />
                  <span>
                    <strong className="text-zinc-200">Scanned On:</strong>{" "}
                    {new Date(scan.created_at).toLocaleString()}
                  </span>
                </p>

                <Link
                  href={`/dashboard/tabs/report/${scan.attack_id}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200/50 text-sm font-medium text-black px-4 py-2 rounded-lg transition"
                >
                  <FileText className="w-4 h-4" />
                  View Report
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl font-medium">No scan history found</p>
            <p className="text-md mt-2 text-zinc-500">
              Once you perform a scan, it’ll appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
