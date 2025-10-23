CREATE DATABASE IF NOT EXISTS foodlydb;
USE foodlydb;

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

CREATE TABLE IF NOT EXISTS restaurantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  endereco VARCHAR(150),
  cidade VARCHAR(100),
  categoria VARCHAR(60),
  cnpj VARCHAR(18),
  horario_abertura TIME,
  horario_fechamento TIME,
  taxa_entrega DECIMAL(10,2) DEFAULT 0.00,
  pedido_minimo DECIMAL(10,2) DEFAULT 0.00,
  foto_logo TEXT,
  foto_capa TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
