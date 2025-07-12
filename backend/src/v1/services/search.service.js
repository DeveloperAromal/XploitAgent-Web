import { supabase } from "../config/supabase.config.js";

export async function Search(searchQuery) {
  const { data, error } = await supabase
    .from("report")
    .select("*")
    .ilike("attack_name", `%${searchQuery}%`);

  if (error) throw error;
  return data;
}
