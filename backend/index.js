import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";
import travelRoutes from "./routes/travel.route.js";

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // permite el uso de JSON en las solicitudes
app.use(cookieParser()); // permite el uso de cookies en las solicitudes

app.use("/api/auth", authRoutes);
app.use("/api/travel", travelRoutes);

// Config para producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  // connectDB();
  console.log("Server is running on port: ", PORT);
});
