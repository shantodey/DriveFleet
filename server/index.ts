import "dotenv/config";           // সবার আগে!
import dns from "node:dns";
import app from "./app.js";
import { client } from "./config/db.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const PORT = Number(process.env.PORT ?? 3000);

async function start() {
  await client.connect();
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}

start().catch((error) => {
  console.error("Server startup failed", error);
  process.exitCode = 1;
});