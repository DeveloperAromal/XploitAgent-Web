import { Contact } from "../services/contact.service.js"

export const getContact = async (req, res) => {
  try {
    const { name, companyname, phonenumber, email } = req.body;

    const data = await Contact(name, companyname, phonenumber, email);

    res.json(data);
  } catch (e) {
    console.log(e);
  }
};
