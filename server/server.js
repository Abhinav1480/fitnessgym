import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log("Starting server...");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error:", err));

app.get("/", (req, res) => {
    res.json({ message: "Fitness Coach API Running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
