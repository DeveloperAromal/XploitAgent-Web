import { supabase } from "../config/supabase.config.js";

export async function pushNotification(msg, client_id, attack_id) {
  const { data, error } = await supabase
    .from("notification")
    .insert([{ msg, client_id, attack_id }])
    .select("*");
  if (error) throw error;
  return data;
}
