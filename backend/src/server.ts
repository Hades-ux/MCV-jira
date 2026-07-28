import app from "./app.js";
import dotenv from "dotenv";

dotenv.config()

const PORT = process.env.PORT|| 8888;

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});