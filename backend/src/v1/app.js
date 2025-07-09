import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute  from "./routes/contact.route.js";
import countryRoutes from"./routes/country.route.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Status: 200, Active: "True" });
});

app.use("/api/v1", contactRoute);
app.use("/api/v1", countryRoutes);
export default app;
console.log("Routes mounted on /api/v1");

