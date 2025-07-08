import { Contact } from "../services/contact.service.js"

export const getContact = async (req, res) => {
  try {
    console.log("➡️ Received request body:", req.body);

    const { name, companyname, phonenumber, email } = req.body;
    const data = await Contact(name, companyname, phonenumber, email);

    console.log("✅ Inserted into Supabase:", data);

    res.json({ message: "Stored successfully", data });
  } catch (e) {
    console.error("❌ Error inserting into Supabase:", e);
    res.status(500).json({ message: "Failed to store data", error: e.message });
  }
};
