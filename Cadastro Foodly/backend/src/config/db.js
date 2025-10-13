"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var promise_1 = __importDefault(require("mysql2/promise"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // carrega as variáveis do .env antes de usar
exports.pool = promise_1.default.createPool({
    host: process.env.DB_HOST || '127.0.0.1', // pega do .env ou padrão
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '', // pode ser vazio
    database: process.env.DB_NAME || 'foodly',
    waitForConnections: true,
    connectionLimit: 10, // quantas conexões simultâneas no pool
    queueLimit: 0
});
