import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.router.js";
import { Contact } from "./services/contact.service.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Status: 200, Active: "True" });
});

app.use("/api/v1", contactRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
