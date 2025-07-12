"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { History } from "lucide-react";
import ReactMarkdown from "react-markdown";
export default function MainSection() {
  const [attackId, setAttackId] = useState<string>("");
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <section className="min-h-screen bg-neutral-950 text-white font-inter p-6 flex justify-center items-start py-8">
      <div className="w-full">
        {loading ? (
          <div className="text-center text-zinc-400 text-lg animate-pulse">
            Loading report...
          </div>
        ) : report ? (
          <div className="bg-neutral-900 border border-zinc-700 p-8 rounded-xl shadow-lg prose prose-invert max-w-none prose-headings:mt-6 prose-p:my-3 prose-strong:font-semibold prose-li:my-2">
            <h2 className="text-2xl font-semibold mb-4">Scan Report</h2>
            <ReactMarkdown>{report}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-center py-16 border-2 border-dashed border-zinc-700 rounded-2xl">
            <div className="text-6xl mb-4">
              <History />
            </div>
            <p className="text-xl font-medium">No report found</p>
            <p className="text-md mt-2 text-zinc-500">
              Please check the scan ID or try again later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
