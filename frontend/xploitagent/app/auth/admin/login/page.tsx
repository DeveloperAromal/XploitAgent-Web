"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      toast.success("Authenticated");
      router.push("/auth/admin/create-user");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen text-gray-200 p-4 font-inter">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-2">
            Admin Login
          </h2>
          <p className="text-gray-400">Access your administrative panel</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 pl-4 pr-4 bg-neutral-900 border border-stone-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-4 pr-4 bg-neutral-900 border border-stone-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full px-2 py-2 bg-emerald-700 hover:bg-emerald-800 transition rounded-md cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
