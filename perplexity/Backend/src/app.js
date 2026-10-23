import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import documentRoutes from "./routes/document.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["Chat-Id", "Chat-Title"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/chats",chatRouter)
app.use("/api/documents", documentRoutes);

export default app;
