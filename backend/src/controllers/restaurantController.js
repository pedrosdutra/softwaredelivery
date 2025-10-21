import bcrypt from "bcryptjs";
import { db } from "../config/db.js";

// ============================
// 🍽️ CADASTRAR RESTAURANTE
// ============================
//Acessa os dados dos atributos por meio objeto req.body
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
    
    //Resposta Bad Request para se faltar um desses atributos
    if (!nome || !email || !senha || !telefone || !endereco) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }

    // Verifica se já existe o email, e retorna uma resposta de Conflit
    const [rows] = await db.query("SELECT * FROM restaurantes WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "E-mail já cadastrado." });
    }

    //Cria um hash da senha para segurança
    const senhaHash = await bcrypt.hash(senha, 10);

    //Aguarda a inserção dos atributos do restaurante no banco
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
//Autentica o Restaurante verificando email e senha
export const loginRestaurant = async (req, res) => {
  try {
    const { email, senha } = req.body;

    //Procurar email
    const [rows] = await db.query(
      "SELECT * FROM restaurantes WHERE email = ?",
      [email]
    );

    //Se não encontrar retorna uma resposta Not Found
    if (rows.length === 0) {
      return res.status(404).json({ message: "Restaurante não encontrado." });
    }

    //Compara a senha atual com a registrada no banco
    const restaurante = rows[0];
    const isValid = await bcrypt.compare(senha, restaurante.senha);

    //Se não bater as senhas retorna Unauthorized
    if (!isValid) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    //Depois removemos a senha da resposta, para não aparecer para o Cliente
    delete restaurante.senha;

    //Retorna uma resposta Ok
    res.json({
      message: "Login realizado com sucesso!",
      restaurante,
    });

    //Se algo der errado retorna Internal Server Error
  } catch (err) {
    console.error("❌ Erro no login do restaurante:", err);
    res.status(500).json({ message: "Erro no login." });
  }
};
