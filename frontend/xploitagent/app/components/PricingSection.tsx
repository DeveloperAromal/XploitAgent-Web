"use client";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-neutral-950 min-h-screen w-full py-20 text-white flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-4">Pricing plans for teams of all sizes</h2>
      <p className="mb-12 max-w-xl text-center text-gray-400">
        No matter where you’re starting, our plans scale with your needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full px-6">

        {/* Basic */}
        <div className="group border border-stone-800 hover:border-green-600 rounded-2xl p-10 min-h-[400px] flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-4">$19<span className="text-xl font-normal">/month</span></p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>✔ Core features</li>
              <li>✔ Email support</li>
              <li>✔ Basic analytics</li>
            </ul>
          </div>
          <button className="mt-auto bg-white text-neutral-900 font-semibold rounded-xl px-4 py-3 w-full transition hover:bg-neutral-800 hover:text-white">
            <code>Choose Plan</code>
          </button>
        </div>

        {/* Essential */}
        <div className="group border border-stone-800 hover:border-green-600 rounded-2xl p-10 min-h-[400px] flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Essential</h3>
            <p className="text-4xl font-bold mb-4">$59<span className="text-xl font-normal">/month</span></p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>✔ Everything in Basic</li>
              <li>✔ Priority support</li>
              <li>✔ Advanced analytics</li>
              <li>✔ Integrations</li>
            </ul>
          </div>
          <button className="mt-auto bg-white text-neutral-900 font-semibold rounded-xl px-4 py-3 w-full transition hover:bg-neutral-800 hover:text-white">
            <code>Choose Plan</code>
          </button>
        </div>

        {/* Premium */}
        <div className="group border border-stone-800 hover:border-green-600 rounded-2xl p-10 min-h-[400px] flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-4xl font-bold mb-4">$119<span className="text-xl font-normal">/month</span></p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li>✔ Everything in Essential</li>
              <li>✔ Dedicated manager</li>
              <li>✔ Custom solutions</li>
            </ul>
          </div>
          <button className="mt-auto bg-white text-neutral-900 font-semibold rounded-xl px-4 py-3 w-full transition hover:bg-neutral-800 hover:text-white">
            <code>Choose Plan</code>
          </button>
        </div>

        {/* Contact Us */}
        <div className="group border border-stone-800 hover:border-green-600 rounded-2xl p-10 min-h-[400px] flex flex-col justify-between bg-neutral-900 transition duration-300 cursor-pointer">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Custom Plan</h3>
            <p className="text-gray-400 mb-6">
              Need something tailored? Let’s talk about your requirements.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-auto bg-green-600 hover:bg-green-700 transition rounded-xl px-4 py-3 w-full text-center font-semibold"
          >
            <code>Contact us</code>
          </Link>
        </div>

      </div>
    </section>
  );
}
