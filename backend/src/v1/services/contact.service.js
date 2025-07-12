import { supabase } from "../config/supabase.config.js";

export async function Contact(name, companyname, phonenumber, email) {
  const { data, error } = await supabase
    .from("contact")
    .insert([{ name, companyname, phonenumber, email }])
    .select("*");

  if (error) throw error;
  return data;

}


