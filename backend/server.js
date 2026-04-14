// imports of dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// config of variables
process.loadEnvFile();

// express application
const server = express();

// middleware
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 5555;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error) => console.log(error));

