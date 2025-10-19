import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

// ============================
// 📦 REGISTRO DE USUÁRIO
// ============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, cep, endereco, numero, complemento, bairro, cidade } = req.body;

    const [existingUser] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, hashedPassword, cep, endereco, numero, complemento, bairro, cidade]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("❌ Erro no cadastro:", err);
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
};

// ============================
// 🔐 LOGIN DE USUÁRIO
// ============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.senha);

    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    delete user.senha;

    res.json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        cep: user.cep,
        endereco: user.endereco,
        numero: user.numero,
        complemento: user.complemento,
        bairro: user.bairro,
        cidade: user.cidade,
        criado_em: user.criado_em,
      },
    });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    res.status(500).json({ message: "Erro no login." });
  }
};
