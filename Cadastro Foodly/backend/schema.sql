
-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  nome         TEXT NOT NULL,
  email        TEXT NOT NULL UNIQUE,
  telefone     TEXT,
  senha        TEXT NOT NULL,
  criado_em    DATETIME DEFAULT CURRENT_TIMESTAMP
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
