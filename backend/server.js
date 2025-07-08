import app from "./src/v1/app.js";
import dotenv from "dotenv";
import contactRoute from "./src/v1/routes/contact.router.js";
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `StudBud api is running on ${PORT} http://localhost:${PORT} 🔥🔥`
  );
  app.use("/api/v1", contactRoute)
  


});
