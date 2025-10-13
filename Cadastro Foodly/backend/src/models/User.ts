import { pool } from '../config/db';

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const User = {
  async findByEmail(email: string) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as any[])[0]; // cast para any[] para acessar índice
  },

  async create(data: UserData) {
    const { name, email, phone, password } = data;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, password]
    );

    // Para retornar o usuário criado, precisa buscar de novo ou usar insertId
    // Exemplo buscando:
    const insertedId = (result as any).insertId;
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [insertedId]);
    return (rows as any[])[0];
  }
};