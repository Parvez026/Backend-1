import dotenv from "dotenv";
import app from "./src/app.js";
import http from "http"
import connectToDb from "./src/config/database.js";
import { initSoket } from "./src/sokets/server.soket.js";

dotenv.config();

const httpServer=http.createServer(app)
initSoket(httpServer)

connectToDb();

// testAi();

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
