import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoute from "./routes/contact.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Status: 200, Active: "True" });
});

app.use("/api/v1", contactRoute);

<<<<<<< HEAD


=======
>>>>>>> f9a58a47192bc23bfb26e22213b892c5683519ad
export default app;
