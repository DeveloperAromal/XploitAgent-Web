"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SquareArrowOutUpRight, Target } from "lucide-react";
import Link from "next/link";
import CustomCircularProgress from "./Progress";

type Vulnerability = {
  id: number;
  attack_id: string;
  attack_name: string;
  description: string;
  severity: string;
  target: string;
  tags?: string[];
  cvss_score: number;
  exploitability_score: number;
  estimated_fix_time: string;
  affected_param: string;
  remediation: string;
  created_at: string;
};

export default function VulnerabilityDetails() {
  const [attackId, setAttacktId] = useState("");
  const [data, setData] = useState<Vulnerability | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(lastSegment)) {
        setAttacktId(lastSegment);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!attackId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get-vulnerability/${attackId}`
        );
        setData(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch vulnerability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [attackId]);

  useEffect(() => {
    const fetchClientName = async () => {
      if (!data?.client_id) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get/client-by-id/${data?.client_id}`
        );
        setName(res.data?.[0]?.name || "Unknown");
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientName();
  }, [data?.client_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-950 text-white text-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="ml-4">Loading vulnerability details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-950 text-red-500 text-lg">
        Vulnerability not found. Please check the URL or try again.
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 border-red-300 shadow-red-500/50";
      case "High":
        return "bg-orange-500 border-orange-300 shadow-orange-500/50";
      case "Medium":
        return "bg-yellow-500 border-yellow-300 text-black shadow-yellow-500/50";
      case "Low":
        return "bg-green-600 border-green-300 shadow-green-500/50";
      default:
        return "bg-gray-500 border-gray-300 shadow-gray-500/50";
    }
  };

  const getColorByScore = (score: number): string => {
    if (score >= 8) {
      return "#dc2626";
    } else if (score >= 6) {
      return "#f97316";
    } else if (score >= 4) {
      return "#eab308";
    } else if (score >= 1) {
      return "#16a34a";
    } else {
      return "#6b7280";
    }
  };

  return (
    <section className="h-screen bg-neutral-950 text-white">
      <div>
        <div className="p-6 sm:p-10 space-y-8 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{data.attack_name}</h1>

            <div className="bg-neutral-800 rounded-2xl border border-dashed border-emerald-800 inline-flex items-center gap-2 px-2 py-1 mb-3">
              <Target className="w-4 h-4 text-zinc-400" />
              <p className="text-sm text-neutral-300">
                {name} / <span className="text-zinc-400">{data.target}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <h2 className="text-neutral-400">{data.target}</h2>
              <Link
                href={`${data.target}`}
                className="flex items-center justify-center"
              >
                <SquareArrowOutUpRight className="w-4 h-4 text-sky-600" />
              </Link>
            </div>

            <p className="text-sm text-neutral-600 mt-2">
              {new Date(data.created_at).toLocaleDateString()}
            </p>
          </div>

          <div>
            <div
              className={`${getSeverityColor(
                data.severity
              )} rounded-2xl border-2 px-3 py-1 text-md`}
            >
              {data.severity}
            </div>
          </div>
        </div>
        <div className="flex px-10 w-full">
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <CustomCircularProgress
                value={data.cvss_score}
                color={getColorByScore(data.cvss_score)}
              />
              <p className="mt-3 text-lg text-neutral-400">CVSS Score</p>
            </div>
            <div className="flex flex-col items-center">
              <CustomCircularProgress
                value={data.exploitability_score}
                color={getColorByScore(data.exploitability_score)}
              />
              <p className="mt-3 text-lg text-neutral-400">Exploitability</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-4 px-10 pt-6">
            {data.tags?.map((tag, i) => (
              <div
                key={i}
                className="bg-emerald-800 rounded-2xl px-2 py-1 border-2 border-stone-700"
              >
                <h4>{tag}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="px-10 py-4">
          <h2 className="text-2xl  text-neutral-200">Remediation</h2>
          <p className="text-stone-400">{data.remediation}</p>
        </div>
      </div>
    </section>
  );
}
