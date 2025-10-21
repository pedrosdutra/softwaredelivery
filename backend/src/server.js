import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js"; //Conecta automaticamente ao banco
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

//Carrega as variáveis de ambiente
dotenv.config();

//Inicializa o express
const app = express();

//Middlewares globais
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend do Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // permite envio de cookies/token futuramente
  })
);

app.use(express.json({ limit: "10mb" })); // aceita JSON e imagens base64

//Rota inicial (teste)
app.get("/", (req, res) => res.send("🍽️ API do Foodly está rodando corretamente!"));

//Rotas de usuários
app.use("/api/users", userRoutes);

//Rotas de restaurantes
app.use("/api/restaurantes", restaurantRoutes);

//Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
