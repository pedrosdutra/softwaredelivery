import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();  // carrega as variáveis do .env antes de usar

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',    // pega do .env ou padrão
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',          // pode ser vazio
  database: process.env.DB_NAME || 'foodly',
  waitForConnections: true,
  connectionLimit: 10,      // quantas conexões simultâneas no pool
  queueLimit: 0
});