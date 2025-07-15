"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { History, Loader2Icon, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";

export default function MainSection() {
  const [attackId, setAttackId] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);

  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(lastSegment)) {
        setAttackId(lastSegment);
      } else {
        console.warn("No valid UUID found in the URL.");
      }
    }
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      if (!attackId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get/attackData/${attackId}`
        );
        const fetchedReport = res.data[0]?.report || "No report found.";
        setReport(fetchedReport);
      } catch (error) {
        console.error("Error fetching report:", error);
        setReport("Error fetching report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [attackId]);

  const handleSummary = async () => {
    if (!report || summaryLoading) return;

    setSummaryLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/summarize`, { report });
      const summary = res.data?.summary || "No summary returned.";

      if (!summary || summary.trim() === "") {
        console.warn("No summary text received for speech.");
        setSummaryLoading(false);
        return;
      }

      const speechRes = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: summary,
          voice_id: "nPczCjzI2devNBz1zQrb", 
        }),
      });

      if (speechRes.ok) {
        const blob = await speechRes.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          setSummaryLoading(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = (e) => {
          console.error("Audio playback error:", e);
          setSummaryLoading(false);
          URL.revokeObjectURL(audioUrl)
        };

        try {
          await audio.play();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (playError: any) {
          console.warn(
            "Audio auto-play prevented by browser (user gesture required).",
            playError
          );
          setSummaryLoading(false); 
        }
      } else {
        const errorData = await speechRes.json();
        console.error("Speech generation failed:", speechRes.status, errorData);
        setSummaryLoading(false);
      }
    } catch (err) {
      console.error("Error during summary or speech generation:", err);
      setSummaryLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-neutral-950 text-white font-inter p-6 flex justify-center items-start py-8 overflow-hidden">
      {summaryLoading && (
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-md bg-gradient-to-tr from-gray-300/20 via-gray-400/30 to-gray-500/20 animate-wave"
          style={{
            animation: "wave 3s ease-in-out infinite",
            backgroundSize: "400% 400%",
            opacity: 1,
          }}
        />
      )}

      <div className="fixed bottom-10 right-10 z-60">
        <button
          onClick={handleSummary} 
          className={clsx(
            "relative px-5 py-2 rounded-2xl flex gap-2 items-center cursor-pointer text-white transition-all duration-300 ease-in-out",
            {
              "bg-gradient-to-tl from-emerald-600 to-emerald-700":
                !summaryLoading,
              "bg-emerald-900 border border-emerald-400 shadow-inner":
                summaryLoading,
              "opacity-60 cursor-not-allowed": summaryLoading,
            }
          )}
          disabled={summaryLoading}
        >
          {summaryLoading ? "Speaking..." : "Audio Summary"}
          {summaryLoading ? (
            <Loader2Icon size={18} className="rotate_loading" />
          ) : (
            <Sparkles size={18} />
          )}
        </button>
      </div>

      <div className="w-full z-10">
        {loading ? (
          <div className="text-center text-zinc-200 text-lg animate-pulse">
            Loading report...
          </div>
        ) : report ? (
          <div className="bg-neutral-900 border border-zinc-700 p-8 rounded-xl shadow-lg prose prose-invert max-w-none prose-headings:mt-6 prose-p:my-3 prose-strong:font-semibold prose-li:my-2">
            <h2 className="2xl font-semibold mb-4">Scan Report</h2>
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-200 text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl bg-neutral-900">
            <div className="text-6xl mb-4">
              <History />
            </div>
            <p className="text-xl font-medium">No report found</p>
            <p className="text-md mt-2 text-zinc-400">
              Please check the scan ID or try again later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
