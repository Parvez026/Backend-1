import { log } from "console";
import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("new connection created")
});

httpServer.listen(3000, () => {
  console.log("server is running on port 300");
});
