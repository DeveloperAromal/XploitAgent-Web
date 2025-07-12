import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.route.js";
import countryRoutes from "./routes/country.route.js";
import clientRoute from "./routes/client.route.js";
import authRoute from "./routes/auth.route.js";
import vulnerabilityRoute from "./routes/vulnerabilities.route.js";
import searchRoute from "./routes/search.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Status: 200, Active: "True" });
});

app.use("/api/v1", authRoute);
app.use("/api/v1", contactRoute);
app.use("/api/v1", countryRoutes);
app.use("/api/v1", clientRoute);
app.use("/api/v1", vulnerabilityRoute);
app.use("/api/v1", searchRoute);

export default app;
