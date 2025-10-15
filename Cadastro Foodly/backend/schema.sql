
-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  nome         TEXT NOT NULL,
  email        TEXT NOT NULL UNIQUE,
  telefone     TEXT,
  senha        TEXT NOT NULL
);


-- Tabela de Endereços dos Clientes
CREATE TABLE IF NOT EXISTS enderecos_clientes (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id   INTEGER NOT NULL,
  apelido      VARCHAR(50),
  cep          VARCHAR(9),
  logradouro   VARCHAR(100),
  numero       VARCHAR(10),
  complemento  VARCHAR(50),
  bairro       VARCHAR(50),
  cidade       VARCHAR(50),
  estado       VARCHAR(2) CHECK (
    estado IN (
      'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT',
      'MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO',
      'RR','SC','SP','SE','TO'
    )
  ),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);



-- Tabela de Restaurantes

CREATE TABLE IF NOT EXISTS restaurantes (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_fantasia VARCHAR(100) NOT NULL,
  razao_social  VARCHAR(100),
  cnpj          VARCHAR(18) UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  telefone      VARCHAR(15),
  senha         VARCHAR(100) NOT NULL
);


-- Tabela de Endereços dos Restaurantes

CREATE TABLE IF NOT EXISTS enderecos_restaurantes (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurante_id  INTEGER NOT NULL,
  cep             VARCHAR(9),
  logradouro      VARCHAR(100),
  numero          VARCHAR(10),
  complemento     VARCHAR(50),
  bairro          VARCHAR(50),
  cidade          VARCHAR(50),
  estado          VARCHAR(2) CHECK (
    estado IN (
      'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT',
      'MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO',
      'RR','SC','SP','SE','TO'
    )
  ),
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id) ON DELETE CASCADE
);
