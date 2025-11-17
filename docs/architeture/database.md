# Documentação do Banco de Dados

Projetado para gerenciar usuários, restaurantes e suas respectivas informações.

**Nome do Banco:** `foodlydb`  
**SGBD:** MySQL  

---

## Entidades

```
┌─────────────────┐          ┌─────────────────┐
│    USUARIOS     │          │  RESTAURANTES   │
├─────────────────┤          ├─────────────────┤
│ • id (PK)       │          │ • id (PK)       │
│ • nome          │          │ • nome          │
│ • email (UK)    │          │ • email (UK)    │
│ • telefone      │          │ • senha         │
│ • senha         │          │ • telefone      │
│ • cep           │          │ • endereco      │
│ • endereco      │          │ • cidade        │
│ • numero        │          │ • categoria     │
│ • complemento   │          │ • cnpj          │
│ • bairro        │          │ • horario_*     │
│ • cidade        │          │ • taxa_entrega  │
│ • criado_em     │          │ • pedido_minimo │
└─────────────────┘          │ • foto_logo     │
                             │ • foto_capa     │
                             │ • criado_em     │
                             └─────────────────┘
```

---

## Tabelas

### 1. `usuarios`

Armazena informações dos usuários que irão comprar no delivery.

#### Estrutura

| Campo        | Tipo          | Nulo | Chave | Padrão            | Descrição                                    |
|--------------|---------------|------|-------|-------------------|----------------------------------------------|
| id           | INT           | NÃO  | PK    | AUTO_INCREMENT    | Identificador único do usuário               |
| nome         | VARCHAR(100)  | NÃO  | -     | -                 | Nome completo do usuário                     |
| email        | VARCHAR(100)  | NÃO  | UK    | -                 | E-mail único para login                      |
| telefone     | VARCHAR(20)   | SIM  | -     | NULL              | Telefone de contato com DDD                  |
| senha        | VARCHAR(255)  | NÃO  | -     | -                 | Hash da senha          |
| cep          | VARCHAR(9)    | SIM  | -     | NULL              | CEP do endereço       |
| endereco     | VARCHAR(100)  | SIM  | -     | NULL              | Logradouro             |
| numero       | VARCHAR(10)   | SIM  | -     | NULL              | Número da residência                         |
| complemento  | VARCHAR(50)   | SIM  | -     | NULL              | Complemento (apt, bloco, ...)               |
| bairro       | VARCHAR(50)   | SIM  | -     | NULL              | Bairro                                       |
| cidade       | VARCHAR(50)   | SIM  | -     | NULL              | Cidade                                       |
| criado_em    | TIMESTAMP     | NÃO  | -     | CURRENT_TIMESTAMP | Data e hora de criação do registro           |

#### Constraints

- **PRIMARY KEY:** `id`
- **UNIQUE KEY:** `email`

#### Índices

```sql
CREATE INDEX idx_usuario_email ON usuarios(email);
CREATE INDEX idx_usuario_cidade ON usuarios(cidade);
```

---

### 2. `restaurantes`

Armazena informações dos estabelecimentos parceiros cadastrados na plataforma.

#### Estrutura

| Campo               | Tipo          | Nulo | Chave | Padrão            | Descrição                                      |
|---------------------|---------------|------|-------|-------------------|------------------------------------------------|
| id                  | INT           | NÃO  | PK    | AUTO_INCREMENT    | Identificador único do restaurante             |
| nome                | VARCHAR(100)  | NÃO  | -     | -                 | Nome do restaurante                            |
| email               | VARCHAR(100)  | NÃO  | UK    | -                 | E-mail único para login                        |
| senha               | VARCHAR(255)  | NÃO  | -     | -                 | Hash da senha           |
| telefone            | VARCHAR(20)   | SIM  | -     | NULL              | Telefone de contato com DDD                    |
| endereco            | VARCHAR(150)  | SIM  | -     | NULL              | Endereço completo do estabelecimento           |
| cidade              | VARCHAR(100)  | SIM  | -     | NULL              | Cidade onde o restaurante está localizado      |
| categoria           | VARCHAR(60)   | SIM  | -     | NULL              | Categoria do restaurante                    |
| cnpj                | VARCHAR(18)   | SIM  | -     | NULL              | CNPJ do estabelecimento |
| horario_abertura    | TIME          | SIM  | -     | NULL              | Horário de abertura                            |
| horario_fechamento  | TIME          | SIM  | -     | NULL              | Horário de fechamento                          |
| taxa_entrega        | DECIMAL(10,2) | SIM  | -     | 0.00              | Taxa de entrega em Reais                          |
| pedido_minimo       | DECIMAL(10,2) | SIM  | -     | 0.00              | Valor mínimo do pedido em Reais                 |
| foto_logo           | TEXT          | SIM  | -     | NULL              | Foto de Perfil da Logo do restaurante           |
| foto_capa           | TEXT          | SIM  | -     | NULL              | Foto de capa do Perfil                  |
| criado_em           | TIMESTAMP     | NÃO  | -     | CURRENT_TIMESTAMP | Data e hora de criação do registro             |

#### Constraints

- **PRIMARY KEY:** `id`
- **UNIQUE KEY:** `email`

#### Índices 
```sql
CREATE INDEX idx_restaurante_email ON restaurantes(email);
CREATE INDEX idx_restaurante_cidade ON restaurantes(cidade);
CREATE INDEX idx_restaurante_categoria ON restaurantes(categoria);
CREATE INDEX idx_restaurante_cnpj ON restaurantes(cnpj);
```

**Versão:** 1.0  
**Última Atualização:** 17 de Novembro de 2025  
**Autor:** Salomão de Moraes