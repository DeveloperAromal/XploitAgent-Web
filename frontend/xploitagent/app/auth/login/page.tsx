"use client";

import { User, Lock, Quote } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type jwtPayload = {
  exp?: number;
  [key: string]: any;
};

const testimonials = [
  {
    quote:
      "XploitAgent saved us from a major security breach. Their vigilance is unmatched!",
    name: "Alice Johnson",
    company: "CyberTech Solutions",
  },
  {
    quote:
      "The team provided excellent support and tailored solutions to our cybersecurity needs.",
    name: "Mark Spencer",
    company: "SecureWave Inc.",
  },
  {
    quote:
      "Thanks to XploitAgent, our infrastructure is more secure than ever. Highly recommended!",
    name: "Linda Park",
    company: "DataShield Corp.",
  },
  {
    quote:
      "Professional, reliable, and efficient — the perfect cybersecurity partner.",
    name: "David Lee",
    company: "NetGuard Ltd.",
  },
];

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const BASE_URL = process.env.APP_BASE_URL || "http://localhost:4000";

  // Testimonial state for current index and fade animation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 500); // Fade duration 500ms
    }, 5000); // Show each testimonial for 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/admin/login`,
        formData
      );

      const token = data.token;
      localStorage.setItem("token", token);

      if (token) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = jwtDecode<jwtPayload>(token);
        if (exp && Date.now() / 1000 < exp) {
          router.push("/dashboard");
        }
      } catch (e) {
        console.error("Error decoding token or token invalid:", e);
        localStorage.removeItem("token");
      }
    }
  }, [router]);

  const { quote, name, company } = testimonials[currentIndex];

  return (
    <section className="h-dvh font-inter bg-black text-white">
      <div className="flex min-h-screen">
        {/* Left side: Login Form */}
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

        {/* Right side: Testimonials */}
        <div className="w-3/2 bg-neutral-950 flex flex-col items-center justify-center h-screen p-10 relative text-center px-16">
          <div>
            <Quote className="w-20 h-20 text-neutral-600 relative -left-20" />
            <div>
              <p
                className={`text-3xl md:text-2xl italic max-w-xl mx-auto transition-opacity duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                &quot;{quote}&quot;
              </p>
              <div
                className={`mt-6 text-2xl font-semibold transition-opacity duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {name}
              </div>
              <div
                className={`text-sm text-neutral-500 mb-10 transition-opacity duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {company}
              </div>
            </div>
            <Quote className="w-20 h-20 text-neutral-600 relative -top-40 left-[580px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
