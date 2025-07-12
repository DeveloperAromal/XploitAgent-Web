import axios from "axios";
import { supabase } from "../config/supabase.config.js";
import { generateJwtToken } from "../utils/jwt.js"; // Assuming JWT utility is correct
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL || "http://localhost";
const port = process.env.PORT || 4000;

export const signInAdmin = async ({ email, password }) => {
  const { data: userData, error: userError } = await supabase
    .from("clients")
    .select("*")
    .eq("email", email)
    .single();

  if (userError || !userData) {
    console.log("User not found or Supabase error:", userError);
    return null;
  }

  console.log(`Provided password: ${password}`);
  console.log(`Hashed password from DB: ${userData.password}`);

  const isValid = await bcrypt.compare(password, userData.password);

  if (!isValid) {
    console.log("Password mismatch");
    return null;
  }

  const token = generateJwtToken({
    id: userData.id,
  });
  return token;
};

export const validateAdmin = async (userId) => {
  const { data: userData, error: userError } = await supabase
    .from("clients")
    .select("id, email, name, company_name, phonenumber, client_id")
    .eq("id", userId)
    .single();

  if (userError || !userData) {
    console.error("Supabase validateAdmin error:", userError);
    return null;
  }

  try {
    const apiResponse = await axios.get(
      `${apiBaseUrl}:${port}/api/v1/get/clients-data/${userData.id}`
    );
    return {
      message: "Authenticated",
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        additionalData: apiResponse.data,
      },
    };
  } catch (apiErr) {
    console.warn(
      `Could not fetch additional user data for ID ${userData.id}:`,
      apiErr.message
    );
    return {
      message: "Authenticated (partial data)",
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        additionalData: null,
      },
    };
  }
};
