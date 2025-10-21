import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Faz a conexão do banco MySql usando variáveis de ambiente (.env)
export const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

console.log("✅ Conectado ao MySQL com sucesso!");
