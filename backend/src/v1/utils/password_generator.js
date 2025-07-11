import { randomBytes } from "crypto";

export const generatePass = (length = 12) => {
  return randomBytes(length).toString("base64").slice(0, length);
};
