"use client";

import {
  ChevronDown,
  CloudLightningIcon,
  Copy,
  EllipsisVertical,
  GitBranch,
  Github,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface LogEntry {
  timestamp: string;
  info: "info" | "success" | "error" | "warn";
  message: string;
}

export default function LogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [attackId, setAttackId] = useState("");
  const [attackData, setAttackData] = useState<any>(null);

  const base_url = "http://localhost:4000";
  useEffect(() => {
    const fetchAttackData = async () => {
      try {
        const res = await axios.get(
          `${base_url}/api/v1/get/attackData/${attackId}`
        );
        console.log(res.data);
        setAttackData(res.data[0]);
      } catch (e) {
        console.error("Error fetching attack data:", e);
      }
    };

    if (attackId) {
      fetchAttackData();
    }
  }, [attackId]);

  useEffect(() => {
    const attackTarget = async () => {
      try {
        if (!attackData?.target || !attackData?.client_id) return;
        const res = await axios.post("http://127.0.0.1:5000/target", {
          target: attackData.target,
          client_id: attackData.client_id,
        });
        console.log("Target triggered successfully", res.data);
      } catch (e) {
        console.log("Error triggering target:", e);
      }
    };
  
    if (attackData) {
      attackTarget();
    }
  }, [attackData]); // ✅ This makes sure it's called only when attackData is available
  

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      console.log("Text copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textarea);
  };

  // Extract UUID from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(lastSegment)) {
        setAttackId(lastSegment);
        console.log("Extracted UUID:", lastSegment);
      } else {
        console.warn("No valid UUID found in the URL.");
      }
    }
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/logs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const newLogs: LogEntry[] = text
          .split("\n")
          .filter(Boolean)
          .map((line: string) => {
            try {
              const parsed = JSON.parse(line);
              return {
                timestamp: parsed.timestamp,
                info: (parsed.level ? parsed.level.toLowerCase() : "info") as
                  | "info"
                  | "success"
                  | "error"
                  | "warn",
                message: parsed.message || parsed.log,
              };
            } catch (e) {
              console.error("Error parsing log line:", e, line);
              return null;
            }
          })
          .filter(Boolean) as LogEntry[];

        setLogs(newLogs);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    fetchLogs();
    const intervalId = setInterval(fetchLogs, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Scroll to bottom of logs on update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section className="h-[150vh] bg-neutral-950 text-gray-100 font-sans">
      <div className="border-b border-gray-700 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-grow">
          <p className="text-sm uppercase text-gray-200 flex items-center gap-2 mb-1">
            <CloudLightningIcon size={14} className="text-gray-200" />
            Vulneribility
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-100">
              {attackData?.attack_name || "Loading..."}
            </h1>
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
              Python
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 text-sm mb-3">
            <p className="flex items-center gap-2">
              <Github size={14} className="text-gray-500" />
              masterdevsabith / {attackData?.attack_id || "loading..."}
            </p>
            <p className="flex items-center gap-2">
              <GitBranch size={14} className="text-gray-500" /> Main
            </p>
          </div>
          <div className="flex items-center gap-2 text-blue-300 text-sm">
            <Link
              href="#"
              className="hover:underline transition-colors duration-200"
            >
              {attackData?.target || "Fetching target..."}
            </Link>
            <button
              onClick={() => copyToClipboard(`${attackData?.target}`)}
              className="text-gray-500 hover:text-white transition-colors duration-200"
              aria-label="Copy URL"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 border border-stone-600 text-gray-300 px-4 py-2 rounded-md hover:bg-stone-700 hover:text-white transition-colors duration-200"
          >
            Connect <ChevronDown size={16} />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            Manual Trigger <ChevronDown size={16} />
          </Link>
        </div>
      </div>

      <div className="p-8">
        {/*  <div className="border border-gray-700 rounded-lg p-5 mb-6 bg-neutral-900 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-2">
            Latest Trigger Activity {attackData?.created_at}
          </h3>
          {logs.length > 0 && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-gray-300 mb-1">
                <p className="text-md font-medium">{logs[0].timestamp}</p>
                <span
                  className={`text-white text-xs font-semibold px-3 py-1 rounded-full uppercase ${
                    logs[0].info === "error"
                      ? "bg-red-700"
                      : logs[0].info === "success"
                      ? "bg-green-700"
                      : "bg-gray-600"
                  }`}
                >
                  {logs[0].info === "error" ? "Cancelled" : logs[0].info}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-4 text-gray-400 text-sm">
                <p>{logs[0].message}</p>
              </div>
            </>
          )}
        </div> */}

        <div className="border border-zinc-700 rounded-lg bg-neutral-900 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-b border-gray-700">
            <Link
              href="#"
              className="flex items-center gap-2 border border-gray-600 text-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              All Logs <ChevronDown size={16} />
            </Link>
            <button
              className="flex items-center border border-gray-600 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
              aria-label="More options"
            >
              <EllipsisVertical size={20} />
            </button>
          </div>

          <div
            ref={logContainerRef}
            className="h-96 overflow-y-auto custom-scrollbar custom-scrollbar-button p-5 bg-neutral-950 rounded-b-lg"
          >
            <pre className="font-mono text-sm">
              {logs.map((log: LogEntry, idx: number) => {
                let colorClass = "";
                let indicatorBg = "";
                let indicatorText = "";
                let indicatorChar = "";

                switch (log.info) {
                  case "success":
                    colorClass = "text-green-400";
                    indicatorBg = "bg-green-600";
                    indicatorText = "text-green-100";
                    indicatorChar = "S";
                    break;
                  case "error":
                    colorClass = "text-red-400";
                    indicatorBg = "bg-red-600";
                    indicatorText = "text-red-100";
                    indicatorChar = "E";
                    break;
                  case "warn":
                    colorClass = "text-yellow-400";
                    indicatorBg = "bg-yellow-600";
                    indicatorText = "text-yellow-100";
                    indicatorChar = "W";
                    break;
                  case "info":
                  default:
                    colorClass = "text-blue-400";
                    indicatorBg = "bg-blue-600";
                    indicatorText = "text-blue-100";
                    indicatorChar = "I";
                    break;
                }

                return (
                  <div key={idx} className="flex items-baseline gap-3 mb-1">
                    <span className="text-gray-500 text-xs flex-shrink-0">
                      {log.timestamp}
                    </span>
                    <span
                      className={`w-4 h-4 flex items-center justify-center text-xs font-bold rounded-full flex-shrink-0 ${indicatorBg} ${indicatorText}`}
                      title={log.info.toUpperCase()}
                    >
                      {indicatorChar}
                    </span>
                    <span className={`${colorClass} whitespace-pre-wrap`}>
                      {log.message}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
