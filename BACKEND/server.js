// import section
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongodbConnect from "./db/connectToDB.js";

// import routes

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

// CUSTOM VARIABLES
const PORT = process.env.PORT || 5000;

//ENV FILES
dotenv.config();

// MIDDLEWARES
app.use(express.json()); // DATA FROM req.body
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  mongodbConnect();
  console.log(`Example app listening on port ${PORT}!`);
});
