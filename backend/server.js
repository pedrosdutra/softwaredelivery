import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'foodly'
});
console.log('Conectado ao MySQL!');

// Rota de cadastro
app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [rows] = await db.execute(
      'INSERT INTO clientes (nome, email, telefone, senha) VALUES (?, ?, ?, ?)',
      [name, email, phone, hashedPassword]
    );
    res.json({ success: true, id: rows.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM clientes WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ success: false, message: 'Email não encontrado' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.senha);
    if (!match) return res.status(400).json({ success: false, message: 'Senha incorreta' });

    res.json({ success: true, id: user.id, name: user.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro no login' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));