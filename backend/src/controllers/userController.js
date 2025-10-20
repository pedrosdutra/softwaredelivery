import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

// ============================
// 📦 REGISTRO DE USUÁRIO
// ============================
export const registerUser = async (req, res) => {
  try {
    // Aceita tanto "senha" quanto "password"
    const {
      nome,
      email,
      telefone,
      senha,
      password,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
    } = req.body;

    const userPassword = senha || password;

    if (!nome || !email || !userPassword) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    console.log("📥 Dados recebidos no registro:", req.body);

    // Verifica se o email já existe
    const [existingUser] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(userPassword, 10);

    // Insere no banco
    await db.query(
      `INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, senhaHash, cep, endereco, numero, complemento, bairro, cidade]
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
    // Aceita tanto "senha" quanto "password"
    const { email, senha, password } = req.body;
    const userPassword = senha || password;

    if (!email || !userPassword) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    // Busca o usuário pelo email
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const user = rows[0];

    // Compara a senha com o hash salvo
    const isValid = await bcrypt.compare(userPassword, user.senha);
    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    delete user.senha;

    res.json({
      message: "Login realizado com sucesso!",
      user,
    });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    res.status(500).json({ message: "Erro no login." });
  }
};

// ============================
// ✏️ ATUALIZAR PERFIL DE USUÁRIO
// ============================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, cep, endereco, numero, complemento, bairro, cidade } = req.body;

    await db.query(
      `UPDATE usuarios 
       SET nome=?, email=?, telefone=?, cep=?, endereco=?, numero=?, complemento=?, bairro=?, cidade=?
       WHERE id=?`,
      [nome, email, telefone, cep, endereco, numero, complemento, bairro, cidade, id]
    );

    res.json({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao atualizar usuário:", err);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};
