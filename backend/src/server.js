import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("API do Foodly está rodando 🍽️"));
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
