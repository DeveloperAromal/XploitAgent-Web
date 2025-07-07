import app from "./src/v1/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `StudBud api is running on ${PORT} http://localhost:${PORT} 🔥🔥`
  );
});
