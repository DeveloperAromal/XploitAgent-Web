"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldAlert,
  Target,
  Clock,
  Zap,
  Tag,
  Info,
  CalendarDays,
} from "lucide-react"; // Added more icons

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
  const [clientId, setClientId] = useState("");
  const [data, setData] = useState<Vulnerability | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/");
      const lastSegment = pathSegments[pathSegments.length - 1];
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(lastSegment)) {
        setClientId(lastSegment);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!clientId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/get-vulnerability/${clientId}`
        );
        setData(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch vulnerability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [clientId]);

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
        return "bg-red-600 shadow-red-500/50";
      case "High":
        return "bg-orange-500 shadow-orange-500/50";
      case "Medium":
        return "bg-yellow-500 text-black shadow-yellow-500/50";
      case "Low":
        return "bg-green-600 shadow-green-500/50";
      default:
        return "bg-gray-500 shadow-gray-500/50";
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-950 to-zinc-900 text-white p-4 sm:p-8 font-inter">
      <div className=" p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {data.attack_name}
          </h1>
          <span
            className={`text-sm font-semibold px-4 py-2 rounded-full transform hover:scale-105 transition-transform duration-200 ${getSeverityColor(
              data.severity
            )}`}
            style={{
              boxShadow: `0 0 15px ${getSeverityColor(data.severity)
                .split(" ")[1]
                .replace("bg-", "")
                .replace("shadow-", "")
                .replace("/50", "")}`,
            }}
          >
            {data.severity}
          </span>
        </div>

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <DetailCard
            icon={<Target className="w-5 h-5 text-purple-400" />}
            label="Target"
            value={data.target}
          />
          <DetailCard
            icon={<CalendarDays className="w-5 h-5 text-pink-400" />}
            label="Detected On"
            value={new Date(data.created_at).toLocaleString()}
          />
          <DetailCard
            icon={<Info className="w-5 h-5 text-blue-400" />}
            label="Attack ID"
            value={data.attack_id}
          />
        </div>

        {/* Description Section */}
        <div className="bg-neutral-850 rounded-2xl p-6 border border-zinc-700 shadow-inner shadow-neutral-700/30">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-zinc-200">
            <Info className="w-5 h-5 text-green-400" /> Description
          </h3>
          <p className="text-base text-zinc-400 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Scores and Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <ScoreCard
            label="CVSS Score"
            score={data.cvss_score}
            color="from-red-500 to-orange-500"
          />
          <ScoreCard
            label="Exploitability"
            score={data.exploitability_score}
            color="from-yellow-500 to-green-500"
          />
          <DetailCard
            icon={<Clock className="w-5 h-5 text-cyan-400" />}
            label="Estimated Fix Time"
            value={data.estimated_fix_time}
          />
          <DetailCard
            icon={<Zap className="w-5 h-5 text-orange-400" />}
            label="Affected Parameter"
            value={data.affected_param}
          />
        </div>

        {/* Tags Section */}
        <div className="pt-4">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-200">
            <Tag className="w-5 h-5 text-teal-400" /> Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {(data.tags ?? []).map((tag, idx) => (
              <span
                key={idx}
                className="bg-zinc-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-full border border-zinc-600 hover:bg-zinc-600 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Remediation Section */}
        <div className="pt-4 bg-neutral-850 rounded-2xl p-6 border border-zinc-700 shadow-inner shadow-neutral-700/30">
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-zinc-200">
            <ShieldAlert className="w-5 h-5 text-red-500" /> Remediation
          </h3>
          <p className="text-base text-zinc-400 leading-relaxed">
            {data.remediation}
          </p>
        </div>
      </div>
    </section>
  );
}

// Helper Components for better readability and reusability
const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string | number;
}) => (
  <div className="bg-neutral-800 rounded-2xl p-5 border border-zinc-700 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow duration-200">
    <div className="p-3 bg-neutral-700 rounded-full">{icon}</div>
    <div>
      <p className="text-zinc-400 text-sm">{label}</p>
      <p className="text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  </div>
);

const ScoreCard = ({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) => (
  <div className="bg-neutral-800 rounded-2xl p-5 border border-zinc-700 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200">
    <p className="text-zinc-400 text-sm mb-2">{label}</p>
    <div
      className={`text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${color}`}
    >
      {score}
    </div>
  </div>
);
