CREATE DATABASE IF NOT EXISTS foodlydb;
USE foodlydb;

-- =========================================================
-- 🧱 Estrutura da Tabela de Usuários
-- =========================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255) NOT NULL,
  cep VARCHAR(9),
  endereco VARCHAR(100),
  numero VARCHAR(10),
  complemento VARCHAR(50),
  bairro VARCHAR(50),
  cidade VARCHAR(50),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 👤 Inserção de Usuários de Exemplo
-- =========================================================

-- Usuário 1
INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
VALUES (
  'Pedro Duarte',
  'pedro@gmail.com',
  '(81) 98888-1122',
  '$2a$10$uA4k9CObw9zkZq6WZ1o5BOL2zKImKVG.0HPQ/lvKljcpz3g8SkJkC', -- senha: 123456
  '50010-040',
  'Rua do Hospício',
  '145',
  'Apto 402',
  'Boa Vista',
  'Recife'
);

-- Usuário 2
INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
VALUES (
  'Maria Souza',
  'maria@hotmail.com',
  '(81) 97777-3344',
  '$2a$10$uA4k9CObw9zkZq6WZ1o5BOL2zKImKVG.0HPQ/lvKljcpz3g8SkJkC', -- senha: 123456
  '52050-240',
  'Rua Amélia',
  '327',
  NULL,
  'Graças',
  'Recife'
);

-- Usuário 3
INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
VALUES (
  'Lucas Oliveira',
  'lucas@outlook.com',
  '(81) 96666-5566',
  '$2a$10$uA4k9CObw9zkZq6WZ1o5BOL2zKImKVG.0HPQ/lvKljcpz3g8SkJkC', -- senha: 123456
  '50711-000',
  'Rua Real da Torre',
  '58',
  'Casa',
  'Madalena',
  'Recife'
);

-- =========================================================
-- 👑 Usuário Administrador
-- =========================================================
INSERT INTO usuarios (nome, email, telefone, senha, cep, endereco, numero, complemento, bairro, cidade)
VALUES (
  'Administrador Foodly',
  'admin@foodly.com',
  '(81) 90000-0000',
  '$2a$10$fNcfMuvc2T0VRSYwrMyZyOPX8dfPK5vYlP40ufAwgfbsTS8ktcA2W', -- senha: admin
  '50030-230',
  'Av. Conde da Boa Vista',
  '800',
  'Sala 101',
  'Boa Vista',
  'Recife'
);

-- =========================================================
-- ✅ Finalização
-- =========================================================
SELECT * FROM usuarios;
