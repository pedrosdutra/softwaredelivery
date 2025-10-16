CREATE DATABASE IF NOT EXISTS Foodly;
USE Foodly;

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255) NOT NULL
);

-- Tabela de Endereços dos Clientes
CREATE TABLE IF NOT EXISTS enderecos_clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  apelido VARCHAR(50),
  cep VARCHAR(9),
  logradouro VARCHAR(100),
  numero VARCHAR(10),
  complemento VARCHAR(50),
  bairro VARCHAR(50),
  cidade VARCHAR(50),
  estado VARCHAR(2),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);