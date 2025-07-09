import { getAllCountries } from "../services/country.service.js";


export const getCountries = (req, res) => {

  try {
    const countries = getAllCountries();
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load country data" });
  }
};