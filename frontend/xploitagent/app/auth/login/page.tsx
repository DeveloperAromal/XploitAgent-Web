"use client";

import { User, Lock } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Define the type for the JWT payload
type jwtPayload = {
  exp?: number; // Expiration timestamp
  [key: string]: any; // Allow other properties
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  // Define the base URL for API requests
  const BASE_URL = process.env.APP_BASE_URL || "http://localhost:4000";
  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/admin/login`, // Use the defined BASE_URL
        formData
      );

      const token = data.token;
      localStorage.setItem("token", token); // Store the token

      if (token) {
        router.push("/dashboard"); // Redirect to dashboard on successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      // TODO: Implement user-friendly error message display (e.g., a toast notification)
    }
  };

  // Effect to check for existing token and redirect if valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = jwtDecode<jwtPayload>(token);
        // Check if token exists and is not expired
        if (exp && Date.now() / 1000 < exp) {
          router.push("/dashboard"); // Redirect if token is valid
        }
      } catch (e) {
        console.error("Error decoding token or token invalid:", e);
        // Optionally clear invalid token from local storage
        localStorage.removeItem("token");
      }
    }
  }, [router]); // Add router to dependency array

  return (
    <section className="h-dvh font-inter bg-black text-white">
      <div className="flex min-h-screen">
        {/* Left Side: Login Form */}
        <div className="w-3/4 flex items-center justify-center px-10">
          <div className="w-full max-w-md">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 leading-tight">
              Welcome Back
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <div className="flex items-center border border-neutral-700 rounded-xl px-4 py-3 focus-within:ring-2 ring-emerald-600 bg-neutral-800 transition-all duration-200">
                  <User className="w-5 h-5 text-neutral-500 mr-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent outline-none text-white placeholder-neutral-500 text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Password
                </label>
                <div className="flex items-center border border-neutral-700 rounded-xl px-4 py-3 focus-within:ring-2 ring-emerald-600 bg-neutral-800 transition-all duration-200">
                  <Lock className="w-5 h-5 text-neutral-500 mr-3" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-transparent outline-none text-white placeholder-neutral-500 text-base"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-700/40 text-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Additional Content or Image */}
        <div className="w-3/2 bg-neutral-800 flex items-center justify-center">
          <p className="text-neutral-400 text-lg">Right Side Content</p>
        </div>
      </div>
    </section>
  );
}
