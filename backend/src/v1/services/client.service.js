import { supabase } from "../config/supabase.config.js";

export async function createClient(
  name,
  email,
  phonenumber,
  company_name,
  is_verified,
  hashpass
) {
  const { data, error } = await supabase
    .from("clients")
    .insert([
      {
        name,
        email,
        phonenumber,
        company_name,
        is_verified,
        password: hashpass,
      },
    ])
    .select("*");
  if (error) throw error;
  return data;
}

export async function scanData(report, target, attack_id) {
  const { data, error } = await supabase
    .from("report")
    .update({ report, target })
    .eq("attack_id", attack_id)
    .select("*");

  if (error) throw error;
  return data;
}

export async function getClient(client_id) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", client_id);
  if (error) throw error;
  return data;
}

export async function getClientById(client_id) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("client_id", client_id);
  if (error) throw error;
  return data;
}

export async function getHistory(client_id) {
  const { data, error } = await supabase
    .from("report")
    .select("*")
    .eq("client_id", client_id);
  if (error) throw error;
  return data;
}

export async function createAttack(target, attack_name, client_id) {
  const { data, error } = await supabase
    .from("report")
    .insert([{ target, attack_name, client_id }])
    .select("*");
  if (error) throw error;
  return data;
}

export async function attackData(attack_id) {
  const { data, error } = await supabase
    .from("report")
    .select("*")
    .eq("attack_id", attack_id);
  if (error) throw error;
  return data;
}
