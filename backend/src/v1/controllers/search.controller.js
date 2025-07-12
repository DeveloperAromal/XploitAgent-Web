import { Search } from "../services/search.service.js";

export const getSearch = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    const data = await Search(searchQuery);

    res.json(data);
  } catch (e) {
    console.log(e);
  }
};
