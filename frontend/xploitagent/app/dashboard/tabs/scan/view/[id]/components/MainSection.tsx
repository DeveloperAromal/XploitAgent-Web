"use client";

import axios from "axios";
import {
  ChevronDown,
  CloudLightning,
  EllipsisVertical,
  File,
  SquareArrowOutUpRight,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface LogEntry {
  timestamp: string;
  info: "info" | "success" | "error" | "warn";
  message: string;
  attack_id?: string;
}

export default function ViewDetails() {
  const [clientId, setClientId] = useState("");
  const [attackId, setAttackId] = useState("");
  const [attackData, setAttackData] = useState<any>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [name, setName] = useState("");

  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const BASE_URL = "http://localhost:4000";

  // const scrollToBottom = () => {
  //   logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    const validate = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${BASE_URL}/api/v1/admin/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const client_id = data?.user?.user?.additionalData?.[0]?.client_id;
        setClientId(client_id);
      } catch (e) {
        console.log(e);
      }
    };
    validate();
  }, []);

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
    const fetchAttack = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get/attackData/${attackId}`
        );
        setAttackData(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttack();
  }, [attackId]);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get/client-by-id/${clientId}`
        );
        setName(res.data[0]?.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchName();
  }, [clientId]);

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
                attack_id: parsed.attack_id,
              };
            } catch (e) {
              console.error("Error parsing log line:", e, line);
              return null;
            }
          })
          .filter(Boolean) as LogEntry[];

        const filteredLogs = newLogs.filter(
          (log) => log.attack_id === attackId
        );

        setLogs(filteredLogs);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    if (attackId) {
      fetchLogs();
      const intervalId = setInterval(fetchLogs, 1000);
      return () => clearInterval(intervalId);
    }
  }, [attackId]);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [logs]);

  const trigger = async () => {
    if (
      !attackData?.target ||
      !attackData?.client_id ||
      !attackData?.attack_id
    ) {
      console.warn("Trigger blocked: Missing attack data");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/target", {
        target: attackData.target,
        client_id: attackData.client_id,
        attack_id: attackData.attack_id,
      });
      console.log("Attack triggered:", response.data);
    } catch (e) {
      console.error("Error triggering attack:", e);
    }
  };

  return (
    <section className="p-10">
      <div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-4xl uppercase mb-4">
              {attackData?.attack_name}
            </h2>
            <div className="bg-neutral-800 border border-emerald-300 rounded-xl inline-flex items-center gap-2 px-2 py-1 mb-3">
              <Target className="w-4 h-4 text-zinc-400" />
              <p className="text-sm text-neutral-300">
                {name} /{" "}
                <span className="text-zinc-400">{attackData?.attack_id}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <h2 className="text-neutral-400">{attackData?.target}</h2>
              <Link
                href={`${attackData?.target}`}
                className="flex items-center justify-center"
              >
                <SquareArrowOutUpRight className="w-4 h-4 text-sky-600" />
              </Link>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              disabled={!attackData}
              onClick={trigger}
              className={`inline-flex items-center gap-2 justify-center cursor-pointer 
                          bg-neutral-900 border-emerald-600 border-2 rounded-xl px-2 py-2 text-neutral-200
                          ${
                            !attackData ? "opacity-50 cursor-not-allowed" : ""
                          }`}
            >
              Trigger <CloudLightning />
            </button>
            <Link href={`/dashboard/tabs/report/${attackData?.attack_id}`}>
              <button className="inline-flex items-center gap-2 justify-center bg-emerald-900 border-emerald-600 border-2 rounded-xl px-2 py-2 text-neutral-200">
                See Report <File />
              </button>
            </Link>
          </div>
        </div>

        <div className="pt-8 pb-20">
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

            <div className="flex justify-end px-5 pt-2">
              <Link href="#bottom">
                <button
                  // onClick={scrollToBottom}
                  className="flex items-center gap-1 text-sm text-sky-400 border border-sky-600 px-3 py-1 rounded hover:bg-sky-800 transition"
                >
                  Scroll to Latest <ChevronDown size={16} />
                </button>
              </Link>
            </div>

            <div className="h-96 overflow-y-auto custom-scrollbar custom-scrollbar-button p-5 bg-neutral-950 rounded-b-lg">
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
                <div ref={logsEndRef} id="bottom" />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
