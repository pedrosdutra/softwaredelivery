import express from "express";
import cors from "cors";
import { db } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Teste de conexão
app.get("/", (req, res) => res.send("API do SoftwareDelivery está rodando!"));

// Iniciar servidor
app.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3001}`);
});
