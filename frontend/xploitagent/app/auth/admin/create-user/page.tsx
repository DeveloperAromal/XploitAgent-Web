"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isVerified, setIsVerified] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !company || !isVerified) {
      toast.error("Please fill all fields.");
      return;
    }

    const userData = {
      name,
      email,
      phonenumber: phone,
      company_name: company,
      is_verified: isVerified === "true",
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/insert/client",
        userData
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("User created successfully!");
        console.log("User Created:", res.data);

        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setIsVerified("");
      } else {
        toast.error("Failed to create user.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen text-white font-inter">
      <div className="w-full max-w-md p-6 bg-neutral-950 border border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-3xl text-center font-bold mb-6">Create User</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter client name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-12 px-4 bg-neutral-800 border border-stone-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Enter client email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 bg-neutral-800 border border-stone-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Enter client phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 bg-neutral-800 border border-stone-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full h-12 px-4 bg-neutral-800 border border-stone-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={isVerified}
            onChange={(e) => setIsVerified(e.target.value)}
            className="w-full h-12 px-4 bg-neutral-800 border border-stone-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--- Verified ---</option>
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded-md font-semibold"
          >
            Create User
          </button>
        </form>
      </div>
    </section>
  );
}
