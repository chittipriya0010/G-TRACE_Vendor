import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";                // ⬅️ for socket.io
import { Server } from "socket.io";     // ⬅️ socket.io

import clientRoutes from "./routes/clientRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import addClientRoutes from "./routes/addClientRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import installationRoutes from "./routes/installationRoutes.js";
import fetchEngineerRoutes from "./routes/fetchEngineerRoutes.js";
import fetchVehTypeRoutes from "./routes/fetchVehTypeRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔥 create HTTP server
const server = http.createServer(app);

// 🔥 attach socket.io to same server
const io = new Server(server, {
  cors: {
    origin: "*", // change to your frontend domain if needed
    methods: ["GET", "POST"]
  }
});

// make io available inside routes/controllers
app.set("io", io);

// Routes
app.use("/api", clientRoutes);
app.use("/api", billingRoutes);
app.use("/api", packageRoutes);
app.use("/api", authRoutes);
app.use("/api", installationRoutes);
app.use("/api", addClientRoutes);
app.use("/api", serviceRequestRoutes);
app.use("/api", fetchEngineerRoutes);
app.use("/api", fetchVehTypeRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 🔥 socket.io connection handling
io.on("connection", (socket) => {
  console.log("⚡ A sales client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
