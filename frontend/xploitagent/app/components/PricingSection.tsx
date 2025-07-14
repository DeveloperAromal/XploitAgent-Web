"use client";

import { ArrowUpRight } from "lucide-react";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-neutral-950 min-h-screen w-full py-20 text-white flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-4">Choose Your Security Plan</h2>
      <p className="mb-12 max-w-xl text-center text-gray-400">
        XploitAgent is built to scale with your team’s security needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-6">
        <div className="border-2 border-stone-800 hover:border-green-600 rounded-2xl p-8 flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Starter</h3>
            <p className="text-4xl font-bold mb-4">
              ₹1,999<span className="text-xl font-normal">/month</span>
            </p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>✔ Real-time exploit monitoring</li>
              <li>✔ Basic vulnerability scans</li>
              <li>✔ Log viewer (limited)</li>
              <li>✔ Email support</li>
            </ul>
          </div>
          <button className="mt-auto bg-white border border-green-600 text-neutral-900 font-semibold rounded-xl px-4 py-3 w-full transition hover:bg-neutral-800 hover:text-white inline-flex items-center justify-center gap-2 group">
            <code>Choose Plan</code>{" "}
            <ArrowUpRight className="group-hover:block transition-all duration-300 hidden" />
          </button>
        </div>

        <div className="relative border-2 border-green-600 shadow-[0_0_40px_#16a34a30] rounded-2xl p-8 flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 border-2 border-lime-900 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
            Most Popular
          </div>
          <div className="pt-4">
            <h3 className="text-2xl font-semibold mb-4">Pro Analyst</h3>
            <p className="text-4xl font-bold mb-4">
              ₹7,999<span className="text-xl font-normal">/month</span>
            </p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>✔ Everything in Starter</li>
              <li>✔ AI-assisted threat analysis</li>
              <li>✔ Workflow automation</li>
              <li>✔ Priority support</li>
            </ul>
          </div>
          <button className="mt-auto bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-4 py-3 w-full transition inline-flex items-center justify-center gap-2 group">
            <code>Choose Plan</code>
            <ArrowUpRight className="group-hover:rotate-45 transition-all duration-300" />
          </button>
        </div>

        <div className="border-2 border-stone-800 hover:border-green-600 rounded-2xl p-8 flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Enterprise Shield</h3>
            <p className="text-4xl font-bold mb-4">
              ₹24,999<span className="text-xl font-normal">/month</span>
            </p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>✔ Everything in Pro Analyst</li>
              <li>✔ Unlimited users & logs</li>
              <li>✔ Private cloud/self-hosting</li>
              <li>✔ 24/7 SLA with account manager</li>
            </ul>
          </div>
          <button className="mt-auto bg-white border border-green-600 text-neutral-900 font-semibold rounded-xl px-4 py-3 w-full transition hover:bg-neutral-800 hover:text-white inline-flex items-center justify-center gap-2 group">
            <code>Choose Plan</code>{" "}
            <ArrowUpRight className="group-hover:block transition-all duration-300 hidden" />
          </button>
        </div>
      </div>
    </section>
  );
}
