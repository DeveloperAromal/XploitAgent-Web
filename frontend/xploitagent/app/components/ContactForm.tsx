"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        console.log("Fetched countries:", data);

        const countriesList = Array.isArray(data) ? data :
                              data?.countries ? data.countries :
                              data?.data ? data.data : [];

        setCountries(countriesList);
        if (countriesList.length > 0) setSelectedCountry(countriesList[0]);
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
      email
    };

    try {
      console.log("Submitting:", data);
      const res = await fetch("http://localhost:4000/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      console.log("Response status:", res.status);
      if (res.ok) {
        toast("Successfully Added!");
        setName("");
        setCompanyName("");
        setPhoneNumber("");
        setEmail("");
      } else {
        toast("Failed to save data.");
      }

    } catch (err) {
      console.error("Fetch failed:", err);
      toast("An error occurred.");
    }
  };

  return (
    <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-neutral-800">
          Contact Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />

          <div className="relative w-full">
            <div className="flex items-center border rounded-lg overflow-hidden w-full">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center bg-gray-100 px-3 py-2 space-x-2 cursor-pointer"
              >
                {selectedCountry && (
                  <>
                    <img
                      src={selectedCountry.flag}
                      alt={selectedCountry.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm">{selectedCountry.phone_code}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </div>
              <input
                type="tel"
                maxLength={selectedCountry?.phone_number_length || 10}
                pattern={`[0-9]{${selectedCountry?.phone_number_length || 10}}`}
  
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute left-0 mt-1 w-full bg-white border rounded-lg max-h-60 overflow-y-auto shadow-lg z-50">
                {countries.map((country) => (
                  <div
                    key={country.web_code || country.name}
                    onClick={() => {
                      setSelectedCountry(country);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm">{country.name} {country.phone_code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-neutral-800 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
