import { create } from "domain";
import {
  attackData,
  createAttack,
  createClient,
  getClient,
  scanData,
} from "../services/client.service.js";
import { sendCredentialsEmail } from "../utils/mail.js";
import { generatePass } from "../utils/password_generator.js";

export const insertClient = async (req, res) => {
  try {
    const password = generatePass(12);
    const { name, email, phonenumber, company_name, is_verified } = req.body;

    const client = await createClient(
      name,
      email,
      phonenumber,
      company_name,
      is_verified,
      password
    );

    res.status(201).json(client); 

    const loginLink = `https://dashboard.xploitagent.com/dashboard/${client.client_id}`;

    await sendCredentialsEmail(
      email,
      "🔐 Your XploitAgent Credentials", 
      email, 
      password, 
      loginLink, 
      process.env.APP_EMAIL, 
      process.env.APP_PASSWORD
    );
  } catch (error) {
    console.error("[!] insertClient failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const scanReport = async (req, res) => {
  try {
    const { report, target } = req.body;
    const data = await scanData(report, target);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getHistoryData = async (req, res) => {
  try {
    const { client_id } = req.body;
    const data = await scanData(client_id);
    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

export const getClientsData = async (req, res) => {
  try {
    const { client_id } = req.params;
    const resData = await getClient(client_id);
    res.json(resData);
  } catch (e) {
    console.log(e);
  }
};

export const createNewAttack = async (req, res) => {
  try {
    const { target, attack_name, client_id } = req.body;
    const resData = await createAttack(target, attack_name, client_id);
    res.json(resData);
  } catch (e) {
    console.log(e);
  }
};

export const getAttackData = async (req, res) => {
  try {
    const { attack_id } = req.params;
    const resData = await attackData(attack_id);
    res.json(resData);
  } catch (e) {
    console.log(e);
  }
};
