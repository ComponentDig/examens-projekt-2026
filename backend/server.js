// imports of dependencies
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

// express application
const server = express();

// middleware
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRoutes);
server.use('/api/schedule', scheduleRoutes);

const PORT = process.env.PORT || 5555;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log(error));
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error:", err);
    }
};

// På Vercel körs inte .listen() på samma sätt. 
// Vi ansluter till databasen vid varje anrop (serverless style)
server.use(async (req, res, next) => {
    await connectDB();
    next();
});

export default server;