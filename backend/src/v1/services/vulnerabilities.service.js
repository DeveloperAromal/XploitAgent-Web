import { supabase } from "../config/supabase.config.js";
import { generateVulnerabilityJsonModel } from "../utils/ai.js";
import axios from "axios";

export async function createVulnerability(attack_id, client_id) {
  try {
    const reportData = await axios.get(
      `http://localhost:4000/api/v1/get/attackData/${attack_id}`
    );

    console.log("Hi");

    const report = reportData.data[0]?.report;
    console.log(report);
    if (!report) throw new Error("Report not found for the given attack_id");

    const vulnerabilityData = await generateVulnerabilityJsonModel(
      report,
      attack_id,
      client_id
    );
    console.log(vulnerabilityData);
    const { data, error } = await supabase
      .from("vulnerabilities")
      .insert([vulnerabilityData])
      .select("*");

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Error creating vulnerability:", err);
    throw err;
  }
}

export async function getVulnerability(client_id) {
  const { data, error } = await supabase
    .from("vulnerabilities")
    .select("*")
    .eq("client_id", client_id);
  if (error) throw error;
  return data;
}
