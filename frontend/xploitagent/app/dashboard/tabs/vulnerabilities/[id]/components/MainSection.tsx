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
    <section className="min-h-screen">
      <div className=" p-6 sm:p-10 space-y-8">
        <div>
          <h1 className="text-3xl mb-4">{data.attack_name}</h1>
          <div>
            <h2>{data.target}</h2>
            <h2>{new Date(data.created_at).toLocaleDateString()}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
