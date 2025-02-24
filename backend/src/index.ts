import { server } from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});