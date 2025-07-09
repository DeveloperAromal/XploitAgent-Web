"use client";

import {
  ArrowDownNarrowWide,
  ArrowDownWideNarrowIcon,
  ChevronDown,
  Copy,
  EllipsisVertical,
  GitBranch,
  Github,
  Globe,
  Info,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LogPage() {
  const [logs, setLogs] = useState([
    {
      timestamp: "Jul 9 12:11:24 PM",
      info: "info",
      message:
        "It looks like we don’t have access to your repo, but we’ll try to clone it anyway.",
    },
    {
      timestamp: "Jul 9 12:11:24 PM",
      info: "success",
      message:
        "Cloning from https://github.com/masterdevsabith/flask_transcript",
    },
    {
      timestamp: "Jul 9 12:11:25 PM",
      info: "info",
      message:
        "Checking out commit 824290040bfdc4dee76187df69611692133338cb in branch main",
    },
    {
      timestamp: "Jul 9 12:11:26 PM",
      info: "info",
      message: "Downloading cache...",
    },
    {
      timestamp: "Jul 9 12:11:29 PM",
      info: "error",
      message: "Deploy cancelled",
    },
    {
      timestamp: "Jul 9 12:12:01 PM",
      info: "success",
      message: "Connected to deployment server successfully.",
    },
    {
      timestamp: "Jul 9 12:12:03 PM",
      info: "warn",
      message: "Missing .env file — using fallback configuration.",
    },
    {
      timestamp: "Jul 9 12:12:04 PM",
      info: "info",
      message: "Running pre-deployment build checks...",
    },
    {
      timestamp: "Jul 9 12:12:07 PM",
      info: "success",
      message: "All build checks passed.",
    },
    {
      timestamp: "Jul 9 12:12:09 PM",
      info: "info",
      message: "Uploading static assets to CDN...",
    },
    {
      timestamp: "Jul 9 12:12:15 PM",
      info: "success",
      message: "Assets uploaded and cached globally.",
    },
    {
      timestamp: "Jul 9 12:12:17 PM",
      info: "error",
      message: "Runtime error: Cannot connect to database.",
    },
    {
      timestamp: "Jul 9 12:12:20 PM",
      info: "warn",
      message: "Retrying database connection (1/3)...",
    },
  ]);

  return (
    <section className="h-screen relative overflow-hidden overflow-y-scroll">
      <div className="top border-b-1 border-neutral-600 px-8 py-8 flex items-center justify-between">
        <div className="left_content">
          <h4 className="mb-2 flex items-center gap-2 text-gray-400 ">
            <Globe size={16} />
            WEB SERVICE
          </h4>
          <div className="mb-6 name_and_details flex items-center gap-6">
            <h3 className="text-3xl">flask_transcript</h3>
            <h3 className="bg-gray-600 px-3 py-2">Python</h3>
            <Link href={"#"} className="bg-purple-700 px-3 py-2 font-semibold">
              Free
            </Link>
            <Link
              href={"#"}
              className="text-sm text-purple-500 hover:text-white"
            >
              Upgrade your free instance
            </Link>
          </div>
          <div className="mb-2 git_and_details text-gray-300 flex items-center gap-8">
            <h5 className="flex items-center gap-2">
              <Github size={16} />
              masterdevsabith / flask_transcript
            </h5>

            <h5 className="flex items-center gap-2">
              <GitBranch size={16} /> Main
            </h5>
          </div>
          <div className="url flex items-center gap-2 text-purple-300">
            <Link href={"#"}>https://flask-transcript.onrender.com</Link>
            <Copy size={16} />
          </div>
        </div>
        <div className="right_content flex items-center gap-6">
          <Link
            href={"#"}
            className="flex items-center gap-2 border-1 border-gray-300 px-3 py-3 hover:bg-white hover:text-black"
          >
            Connect <ChevronDown />
          </Link>
          <Link
            href={"#"}
            className="flex items-center gap-2 bg-white text-black px-3 py-3 hover:bg-purple-700 hover:text-white"
          >
            Manual Deploy <ChevronDown />
          </Link>
        </div>
      </div>
      <div className="bottom p-4">
        <div className="info_banner mb-3 px-3 py-3 bg-purple-950 flex items-center justify-between">
          <div className="content text-purple-100 flex items-center gap-2">
            <Info />
            Your free instance will spin down with inactivity, which can delay
            requests by 50 seconds or more.
          </div>
          <div className="button">
            <Link
              href={"#"}
              className="underline text-purple-100 hover:text-white"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
        <div className="info_box border-1 border-neutral-600 px-3 py-3">
          <div className="datetime_and_status flex items-center gap-3">
            <h4 className="text-lg">July 9, 2025 at 12:11 PM</h4>
            <h4 className="status text-sm bg-neutral-800 text-white font-semibold px-3 py-1">
              Cancelled
            </h4>
          </div>
          <div className="code_and_msg flex items-center gap-3 text-neutral-400">
            <h5 className="underline">8242900 </h5>
            <h5>bs4 added</h5>
          </div>
        </div>

        <div className="log_box border-1 border-neutral-600">
          <div className="log_filters flex items-center justify-between gap-3 px-3 py-3 border-b-1 border-neutral-600">
            <Link
              href={"#"}
              className="flex items-center gap-2 border-1 border-neutral-600 px-3 py-2 text-nowrap"
            >
              All Logs <ChevronDown />
            </Link>

            <div className="search_bar flex items-center gap-2 w-full border-1 border-neutral-600 px-3 py-2">
              <Search />
              <input type="text" placeholder="search" className="w-full" />
            </div>

            <div className="three_dots flex items-center border-1 border-neutral-600 px-3 py-2">
              <EllipsisVertical />
            </div>
          </div>

          <div className="real_log px-3 py-3 h-80 overflow-hidden overflow-y-scroll">
            <div className="bg-black p-5 font-mono text-sm text-white">
              {logs.map((log, idx) => {
                let colorClass = "";
                switch (log.info) {
                  case "success":
                    colorClass = "text-green-500";
                    break;
                  case "error":
                    colorClass = "text-red-500";
                    break;
                  case "warn":
                    colorClass = "text-yellow-500";
                    break;
                  default:
                    colorClass = "text-blue-400";
                }

                return (
                  <div key={idx} className="flex gap-2 mb-1">
                    <span className="text-gray-300">{log.timestamp}</span>
                    <span className="text-black text-sm bg-purple-300 rounded-full w-4 h-4 flex items-center justify-center">
                      i
                    </span>
                    <span className={colorClass}>{log.message}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
