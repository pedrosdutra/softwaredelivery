import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

// ============================
// 🍽️ CADASTRAR RESTAURANTE
// ============================
export const registerRestaurant = async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      telefone,
      endereco,
      cidade,
      categoria,
      cnpj,
      horario_abertura,
      horario_fechamento,
      taxa_entrega,
      pedido_minimo,
      foto_logo,
      foto_capa,
    } = req.body;

    if (!nome || !email || !senha || !telefone || !endereco) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }

    // Verifica se já existe
    const [rows] = await db.query("SELECT * FROM restaurantes WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await db.query(
      `INSERT INTO restaurantes 
        (nome, email, senha, telefone, endereco, cidade, categoria, cnpj, 
         horario_abertura, horario_fechamento, taxa_entrega, pedido_minimo, 
         foto_logo, foto_capa, criado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        nome,
        email,
        senhaHash,
        telefone,
        endereco,
        cidade || null,
        categoria || null,
        cnpj || null,
        horario_abertura || null,
        horario_fechamento || null,
        taxa_entrega || 0,
        pedido_minimo || 0,
        foto_logo || null,
        foto_capa || null,
      ]
    );

    res.status(201).json({ message: "Restaurante cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar restaurante:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};


// ============================
// 🔐 LOGIN RESTAURANTE
// ============================
export const loginRestaurant = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM restaurantes WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Restaurante não encontrado." });
    }

    const restaurante = rows[0];
    const isValid = await bcrypt.compare(senha, restaurante.senha);

    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    delete restaurante.senha;

    res.json({
      message: "Login realizado com sucesso!",
      restaurante,
    });
  } catch (err) {
    console.error("❌ Erro no login do restaurante:", err);
    res.status(500).json({ message: "Erro no login." });
  }
};
