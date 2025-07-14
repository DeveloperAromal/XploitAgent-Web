import {
  createVulnerability,
  getVulnerability,
  getVulnerabilityById,
} from "../services/vulnerabilities.service.js";

export const createNewVulnerability = async (req, res) => {
  try {
    const { attack_id, client_id } = req.params;
    const data = await createVulnerability(attack_id, client_id);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getVulnerabilityData = async (req, res) => {
  try {
    const { attack_id } = req.params;
    const data = await getVulnerability(attack_id);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getVulnerabilityDataByClientId = async (req, res) => {
  try {
    const { client_id } = req.params;
    const data = await getVulnerabilityById(client_id);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};
