"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Lock,
  User,
  Bell,
  CreditCard,
  DollarSign,
  BarChart2,
  RefreshCcw,
  History,
  Settings,
} from "lucide-react";

export default function AgenticAISettings() {
  const [clientId, setClientId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [passwordResetStatus, setPasswordResetStatus] = useState<string | null>(
    null
  );
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [credits, setCredits] = useState<number>(0);
  const [subscription, setSubscription] = useState<string>("Free");
  const [paymentMethod, setPaymentMethod] = useState<string>("Not Set");
  const [profile, setProfile] = useState<any>(null);
  const [usageStats, setUsageStats] = useState<{
    calls: number;
    lastMonth: number;
  }>({
    calls: 0,
    lastMonth: 0,
  });

  const BASE_URL = "http://localhost:4000";

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await axios.get(`${BASE_URL}/api/v1/admin/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = data?.user?.user;
        const addData = user?.additionalData?.[0] || {};

        setClientId(addData.client_id || "");
        setUsername(user?.name || "");
        setProfile(user);
        setCredits(addData.credits || 0);
        setSubscription(addData.subscription || "Free");
        setPaymentMethod(addData.paymentMethod || "Not Set");
        setUsageStats({
          calls: addData.usageCalls || 0,
          lastMonth: addData.usageLastMonth || 0,
        });
        setNotificationEnabled(addData.notificationsEnabled || false);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handlePasswordReset = async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/admin/reset-password`, { clientId });
      setPasswordResetStatus("Password reset email sent.");
    } catch (error) {
      setPasswordResetStatus("Failed to reset password.");
    }
  };

  const toggleNotifications = () => {
    setNotificationEnabled((prev) => !prev);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading settings...
        </p>
      </div>
    );

  return (
    <section className=" p-8 shadow-lg rounded-lg space-y-10">
      <div className="bg-neutral-950/100 border border-stone-700 p-6 rounded-lg shadow-inner">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-white mb-4">
          <User size={24} /> Profile Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 text-lg">
          <div>
            <span className="font-medium">Username:</span> {username || "N/A"}
            <span>{profile?.company_name || ""}</span>
            <span>{profile?.phonenumber}</span>
          </div>
          <div>
            <span className="font-medium">Client ID:</span> {clientId || "N/A"}
          </div>
        </div>
      </div>

      <div className="bg-neutral-900/100 border-stone-800  border-2 p-6 rounded-lg shadow-inner">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-red-600 mb-4">
          <Lock size={24} /> Reset Password
        </h2>
        <p className="mb-3 text-red-800">
          If you suspect any security breach, reset your password immediately.
        </p>
        <button
          onClick={handlePasswordReset}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Send Reset Link
        </button>
        {passwordResetStatus && (
          <p className="mt-3 text-red-700">{passwordResetStatus}</p>
        )}
      </div>

      <div className="p-6  bg-neutral-900 backdrop-blur-2xl rounded-2xl border">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-green-700 mb-4">
          <DollarSign size={24} /> Credits & Usage
        </h2>
        <div className="flex flex-wrap gap-8 text-gray-700">
          <div className="min-w-[150px]">
            <p className="text-sm font-medium text-green-900">
              Credits Balance
            </p>
            <p className="text-3xl font-bold">{credits}</p>
          </div>
          <div className="min-w-[150px]">
            <p className="text-sm font-medium text-green-900">
              Subscription Plan
            </p>
            <p className="text-xl">{subscription}</p>
          </div>
          <div className="min-w-[150px]">
            <p className="text-sm font-medium text-green-900">
              API Calls This Month
            </p>
            <p className="text-xl">{usageStats.calls}</p>
          </div>
          <div className="min-w-[150px]">
            <p className="text-sm font-medium text-green-900">
              Last Month Calls
            </p>
            <p className="text-xl">{usageStats.lastMonth}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
