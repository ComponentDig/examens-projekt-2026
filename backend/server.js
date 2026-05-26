// imports av dependencies
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// import av routes
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// express application
const server = express();

// middleware
server.use(cors({
    origin: "https://hemma-pa-tuna.vercel.app",
    credentials: true
}));
server.use(express.json());

server.use('/api/auth', authRoutes);
server.use('/api/schedule', scheduleRoutes);
server.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5555;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log(error));

export default server;