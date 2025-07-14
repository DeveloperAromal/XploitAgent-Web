"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/countries");
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : data?.countries || data?.data || [];
        setCountries(list);
        if (list.length) setSelectedCountry(list[0]);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      companyname: companyName,
      phonenumber: phoneNumber,
      email,
    };

    try {
      const res = await fetch("http://localhost:4000/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Request submitted successfully!");
        setName("");
        setCompanyName("");
        setPhoneNumber("");
        setEmail("");
      } else {
        toast.error("Failed to submit. Try again.");
      }
    } catch (err) {
      toast.error(`Something went wrong. ${err}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex- bg-neutral-950 text-white flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4">Talk to XploitAgent</h2>
          <p className="text-gray-400 text-sm mb-6">
            Need a tailored security solution? Let’s discuss how we can help
            protect your infrastructure.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="relative w-full">
              <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center bg-neutral-800 px-3 py-3 space-x-2 cursor-pointer"
                >
                  {selectedCountry && (
                    <>
                      <Image
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        width={30}
                        height={35}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm text-white">
                        {selectedCountry.phone_code}
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="tel"
                  maxLength={selectedCountry?.phone_number_length || 10}
                  pattern={`[0-9]{${
                    selectedCountry?.phone_number_length || 10
                  }}`}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="flex-1 px-3 py-2.5 bg-neutral-800 text-white outline-none "
                />
              </div>

              {dropdownOpen && (
                <div className="absolute z-50 left-0 w-full no-scroll-bar bg-neutral-900 border border-neutral-700 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-xl">
                  {countries.map((country) => (
                    <div
                      key={country.web_code || country.name}
                      onClick={() => {
                        setSelectedCountry(country);
                        setDropdownOpen(false);
                      }}
                      className="flex items-center px-4 py-2 hover:bg-neutral-800 cursor-pointer space-x-2"
                    >
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm text-white">
                        {country.name} {country.phone_code}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="email"
              placeholder="Work Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
            >
              <code> Submit Request</code>
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>

      <div className="flex-1 relative hidden md:flex items-center justify-center">
        <Image
          src="/assets/ai-bg-2.png"
          alt="XploitAgent Secure"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute text-center px-6">
          <h2 className="text-4xl font-bold text-white drop-shadow-lg">
            Built for Real-Time Defense
          </h2>
          <p className="mt-4 text-gray-300 text-lg max-w-md drop-shadow">
            XploitAgent uses AI-driven monitoring to protect your digital
            infrastructure — before the threats strike.
          </p>
        </div>
      </div>
    </div>
  );
}
