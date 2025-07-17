import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getAllCountries() {
  const filePath = path.join(__dirname, '../assets/country.json');
  console.log("Reading country.json from:", filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}
