import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

// ============================
// 📦 REGISTRO DE USUÁRIO
// ============================
export const registerUser = async (req, res) => {
  try {
    // Puxa os dados enviados pelo cliente
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

    //Aceita atributo senha ou password
    const userPassword = senha || password;

    //Se for diferente retorna resposta Bad Request
    if (!nome || !email || !userPassword) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    console.log("📥 Dados recebidos no registro:", req.body);

    // Verifica se o email já existe e se já existir retorna Bad Request
    const [existingUser] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha para mais Segurança
    const senhaHash = await bcrypt.hash(userPassword, 10);

    // Aguarda a conclusão da inserção do usuário no banco
    await db.query(
      `INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefone, senhaHash, cep, endereco, numero, complemento, bairro, cidade]
    );

    //Retorna resposta Created
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    //Se ocorrer erros, retorna a resposta Internal Server Error
  } catch (err) {
    console.error("❌ Erro no cadastro:", err);
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
};

// ============================
// 🔐 LOGIN DE USUÁRIO
// ============================
//Verifica o email e senha para logar
export const loginUser = async (req, res) => {
  try {
    const { email, senha, password } = req.body;
    const userPassword = senha || password;

    //Se não inserir retorna um Bad Request
    if (!email || !userPassword) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    //Busca o usuário pelo email
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    
    //Se não achar retorna Not Found
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    //Extrai o usuário encontrado da query
    const user = rows[0];

    // Compara a senha com o hash salvo no banco e retorna um valor booleano
    const isValid = await bcrypt.compare(userPassword, user.senha);
    // Se for falso retorna Unauthorized
    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    //Deleta o Hash para não enviar ao cliente
    delete user.senha;

    //Retorna Ok
    res.json({
      message: "Login realizado com sucesso!",
      user,
    });
    //Para erros retorna um Internal Server Error
  } catch (err) {
    console.error("❌ Erro no login:", err);
    res.status(500).json({ message: "Erro no login." });
  }
};

// ======================================
// ✏️ ATUALIZAR PERFIL DE USUÁRIO
// ======================================
export const updateUser = async (req, res) => {
  try {
    //Extrai o ID do usuário para saber qual será atualizado
    const { id } = req.params;
    const { nome, email, telefone, cep, endereco, numero, complemento, bairro, cidade } = req.body;

    //Espera a execução do Update para seguir com as respostas ao cliente
    await db.query(
      `UPDATE usuarios 
       SET nome=?, email=?, telefone=?, cep=?, endereco=?, numero=?, complemento=?, bairro=?, cidade=?
       WHERE id=?`,
      [nome, email, telefone, cep, endereco, numero, complemento, bairro, cidade, id]
    );

    //Retorna Ok
    res.json({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    //Retorna Internal Server Error
    console.error("❌ Erro ao atualizar usuário:", err);
    res.status(500).json({ message: "Erro ao atualizar usuário." });
  }
};
