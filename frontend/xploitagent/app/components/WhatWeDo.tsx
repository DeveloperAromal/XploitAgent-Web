"use client";

import { useEffect, useRef, useState } from "react";

interface LogEntry {
  timestamp: string;
  info: "success" | "error" | "warn" | "info";
  message: string;
}

export default function WhatMakesItUnique() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ["success", "error", "warn", "info"] as const;
      const type = types[Math.floor(Math.random() * types.length)];

      const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        info: type,
        message: `This is a ${type} log at ${new Date().toLocaleTimeString()}`,
      };

      setLogs((prevLogs) => [...prevLogs.slice(-49), newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <section className="flex items-center justify-center py-20 px-10 text-white">
      <div className="relative w-full h-[85vh] rounded-3xl overflow-hidden">
        <div className="absolute inset-0 ai-bg-2 z-0 rounded-3xl" />
        <div className="relative z-10 flex flex-col justify-between h-full bg-black/50 rounded-3xl">
          <div className="p-12">
            <div className="flex justify-between items-center gap-20">
              <p className="text-lg max-w-md text-left">
                This platform is designed for developers, AI enthusiasts,
                security researchers, and digital explorers who want to dive
                deeper into the world of intelligent systems, automation, and
                real-world applications of agentic AI.
              </p>
              <div>
                <h2 className="text-6xl font-bold mb-4">What Our Agent Do</h2>
                <div className="bg-white text-neutral-900 w-20 py-2 rounded-xl text-center font-bold">
                  <code># 2</code>
                </div>
              </div>
            </div>
          </div>

          <div className="px-40">
            <div className="bg-neutral-800/20 backdrop-blur-xl rounded-tl-3xl rounded-tr-3xl border-stone-800 border-3 pt-10 px-10">
              <div className="w-full h-64 no-scroll-bar overflow-hidden border-t-3 border-r-3 border-l-3 border-b-0 border-zinc-700 bg-neutral-950/90  overflow-y-auto p-4 font-mono text-sm rounded-tl-2xl rounded-tr-2xl">
                {logs.map((log, idx) => {
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
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
