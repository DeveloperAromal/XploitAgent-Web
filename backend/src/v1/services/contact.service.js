import { supabase } from "../config/supabase.config.js";

export async function Contact(name, companyname, phonenumber, email) {
  console.log("📦 Inserting into Supabase:", { name, companyname, phonenumber, email });

  const { data, error } = await supabase
    .from("contact")
    .insert([{ name, companyname, phonenumber, email }])
    .select("*");

  if (error) {
    console.error("❌ Supabase insert failed:", error);
    throw error;
  }

  console.log("✅ Supabase returned data:", data);
  return data;
}

