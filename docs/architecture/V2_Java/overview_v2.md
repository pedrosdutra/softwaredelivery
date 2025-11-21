# Arquitetura Geral do Sistema (Java/Spring Boot)

_Segue a arquitetura MVC + Padrão Repository:_

- **Backend**: API REST em Java/Spring Boot conectada ao MySQL
- **Camadas**: Controller → Service (DAO) → Repository → Database
- **Frontend**: Aplicação web com HTML/CSS/JavaScript 

---

## Tecnologias Principais

### Backend 

- **Java 17+**
- **Spring Boot 3.x**
- **Spring Data JPA** 
- **MySQL 8.0+** 
- **Lombok** 
- **Jakarta Validation**
- **Spring Web** 

### Frontend 

- **HTML5**
- **CSS3**
- **JavaScript ES6+**
- **Fetch API**

---

### Componentes Principais

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (WEB)                       │
│  HTML + CSS + JavaScript                                │
│  - Autenticação (Login/Cadastro)                        │
│  - Listagem de Restaurantes                             │
│  - Carrinho de Compras                                  │
│  - Suporte ao Cliente                                   │
└─────────────────────────────────────────────────────────┘
                          ▼ HTTP/REST
┌──────────────────────────────────────────────────────────┐
│                 BACKEND (Spring Boot)                    │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Controllers (REST API)                     │  │
│  │  - ClienteController                               │  │
│  │  - RestauranteController                           │  │
│  │  - PedidoController                                │  │
│  │  - CarrinhoController                              │  │
│  │  - EntregaController                               │  │
│  │  - AvaliacaoController                             │  │
│  │  - SuporteController                               │  │
│  │  - PremiumController                               │  │
│  │  - PromocaoController                              │  │
│  └────────────────────────────────────────────────────┘  │
│                          ▼                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │              DAO (Data Access)                     │  │
│  │  - UsuarioDAO, ClienteDAO                          │  │
│  │  - RestauranteDAO, ProdutoDAO                      │  │
│  │  - PedidoDAO, CarrinhoDAO                          │  │
│  │  - EntregaDAO, EntregadorDAO                       │  │
│  │  - SuporteAtendimentoDAO, ...                      │  │
│  └────────────────────────────────────────────────────┘  │
│                          ▼                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │         Models/Entities (JPA)                      │  │
│  │  - Usuario, Cliente, Restaurante                   │  │
│  │  - Pedido, Carrinho, Produto                       │  │
│  │  - Entrega, Entregador                             │  │
│  │  - SuporteAtendimento, ...                         │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
                          ▼ JDBC
┌──────────────────────────────────────────────────────────┐
│                  BANCO DE DADOS (MySQL)                  │
│  - usuarios, clientes, restaurantes                      │
│  - pedidos, carrinhos, produtos                          │
│  - entregas, entregadores                                │
│  - avaliacoes, suporte, promocoes                        │
└──────────────────────────────────────────────────────────┘
```

### Fluxo de Requisições

```
Cliente HTTP (Frontend - WEB/)
    ↓
[CORS + Security Filters]
    ↓
Controller (@RestController)
    ↓
DAO/Service (@Service)
    ↓
Repository (JpaRepository)
    ↓
Database (MySQL)
    ↓
Resposta (JSON - Models como DTOs)
```

---

### 1. Camada Controller (Apresentação)

**Responsabilidades:**

- Receber requisições HTTP
- Validar entrada 
- Chamar serviços da camada DAO
- Retornar DTOs no formato JSON
- Tratamento de exceções HTTP

---

### 2. Camada DAO/Service (Lógica de Negócio)

**Responsabilidades:**

- Implementar regras de negócio
- Validações complexas
- Orquestração de múltiplos repositories
- Tratamento de transações

**Principais Services:**

- `UsuarioDAO`: Autenticação, cadastro, hash de senha
- `RestauranteDAO`: Gestão de estabelecimentos
- `ProdutoDAO`: Gerenciamento de cardápio
- `CarrinhoDAO`: Lógica do carrinho de compras
- `PedidoDAO`: Processamento de pedidos
- `AvaliacaoDAO`: Sistema de avaliações
- `PromocaoDAO`: Gestão de promoções
- `EntregadorDAO`: Gerenciamento de entregadores

---

### 3. Camada Repository (Persistência)

**Responsabilidades:**

- Interface com o banco de dados
- Queries personalizadas 
- Métodos derivados do Spring Data JPA
- Operações CRUD básicas herdadas de `JpaRepository`

---

### 4. Camada Models (Entidades JPA)

**Principais Entidades:**

#### Usuario

- Entidade base para todos os usuários do sistema
- Relacionamentos: OneToOne com Cliente/Restaurante/Entregador
- Campos: id, nome, email, senhaHash, telefone, tipoUsuario

#### Cliente

- OneToOne com Usuario
- Possui endereço padrão
- Relacionamentos: OneToMany com Pedido, Carrinho, Avaliacao

#### Restaurante

- OneToOne com Usuario
- Campos específicos: nomeFantasia, cnpj, dadosBancarios
- Relacionamentos: OneToMany com Produto, Pedido, Promocao

#### Produto

- ManyToOne com Restaurante
- Campos: nome, descricao, preco, ativo

#### Carrinho & CarrinhoItem

- Carrinho: ManyToOne com Cliente
- CarrinhoItem: ManyToOne com Carrinho e Produto
- Constraint UNIQUE(carrinho_id, produto_id)

#### Pedido & PedidoItem

- Pedido: ManyToOne com Cliente e Restaurante
- PedidoItem: snapshot dos produtos no momento da compra
- Campos: valorTotal, status, enderecoEntrega

#### Entregador & Entrega

- Entregador: OneToOne com Usuario
- Entrega: OneToOne com Pedido, ManyToOne com Entregador
- Campos: rotaSugerida, tempoEstimadoMin, distanciaKm

#### Avaliacao

- Avaliações para Restaurante e Entregador
- ManyToOne com Cliente, Restaurante/Entregador, Pedido
- Constraint UNIQUE para evitar avaliações duplicadas

#### Promocao

- ManyToOne com Restaurante (nullable para promoções gerais)
- Campos: titulo, tipoDesconto, valorDesconto, dataInicio, dataFim

---

### 5. Frontend 

**Principais Páginas:**

- `index.html`: Página inicial com catálogo de restaurantes
- `login.html`: Autenticação de usuários
- `register.html`: Cadastro de novos usuários
- `pages/cliente/`: Área do cliente (perfil, pedidos, carrinho)
- `pages/restaurante/`: Painel do restaurante (dashboard, cardápio, pedidos)
- `pages/entregador/`: Área do entregador (dashboard, entregas)

---

## Endpoints Principais da API

### Usuários

```
POST   /api/usuarios/register       # Cadastro de usuário
POST   /api/usuarios/login          # Autenticação
GET    /api/usuarios/{id}           # Buscar por ID
PUT    /api/usuarios/{id}           # Atualizar perfil
DELETE /api/usuarios/{id}           # Remover conta
```

### Restaurantes

```
POST   /api/restaurantes            # Cadastrar restaurante
GET    /api/restaurantes            # Listar todos
GET    /api/restaurantes/{id}       # Buscar por ID
PUT    /api/restaurantes/{id}       # Atualizar dados
DELETE /api/restaurantes/{id}       # Desativar
```

### Produtos

```
POST   /api/produtos                # Adicionar produto ao cardápio
GET    /api/produtos/restaurante/{id} # Listar por restaurante
GET    /api/produtos/{id}           # Buscar por ID
PUT    /api/produtos/{id}           # Atualizar produto
DELETE /api/produtos/{id}           # Remover/desativar
```

### Carrinho

```
POST   /api/carrinhos               # Criar carrinho
GET    /api/carrinhos/cliente/{id}  # Buscar carrinho ativo
POST   /api/carrinhos/{id}/itens    # Adicionar item
PUT    /api/carrinhos/{id}/itens/{itemId} # Atualizar quantidade
DELETE /api/carrinhos/{id}/itens/{itemId} # Remover item
POST   /api/carrinhos/{id}/finalizar # Converter em pedido
```

### Pedidos

```
POST   /api/pedidos                 # Criar pedido
GET    /api/pedidos/cliente/{id}    # Listar por cliente
GET    /api/pedidos/restaurante/{id} # Listar por restaurante
GET    /api/pedidos/{id}            # Buscar por ID
PUT    /api/pedidos/{id}/status     # Atualizar status
```

### Avaliações

```
POST   /api/avaliacoes/restaurante  # Avaliar restaurante
POST   /api/avaliacoes/entregador   # Avaliar entregador
GET    /api/avaliacoes/restaurante/{id} # Listar avaliações
```

### Promoções

```
POST   /api/promocoes               # Criar promoção
GET    /api/promocoes               # Listar ativas
GET    /api/promocoes/cliente/{id}  # Promoções disponíveis
POST   /api/promocoes/{id}/resgatar # Resgatar promoção
```

---

### 4. Segurança

- Hash de senhas com BCrypt
- Autenticação JWT (se implementado)
- Validação de permissões por tipo de usuário

### 5. Transações

- `@Transactional` nos métodos de serviço
- Rollback automático em caso de erro
- Isolamento adequado para operações concorrentes

### 6. Frontend

- Separação de responsabilidades (HTML estrutura, CSS apresentação, JS comportamento)
- Validação no cliente E servidor
- Feedback visual para ações do usuário
- Tratamento de erros de rede
- Cache inteligente de dados

---

## Integração Frontend ↔ Backend

**Arquitetura de Comunicação:**

```
Frontend (WEB/ - HTML/CSS/JS servido estaticamente ou via servidor)
    ↓ HTTP/HTTPS (Fetch API)
Backend (Spring Boot - Porta 8080)
    ↓ JDBC
MySQL Database (Porta 3306)
```

### Fluxo de Autenticação

```
1. Frontend envia POST /api/usuarios/login via fetch({ email, senha })
2. Backend valida credenciais via UsuarioDAO
3. Backend retorna UsuarioDTO (sem senhaHash) + token JWT
4. Frontend armazena token (localStorage/sessionStorage)
5. Requisições subsequentes incluem token no header Authorization: Bearer {token}
```

---

## Diagrama de Dependências

```
FoodlyApplication (main)
    ↓
Controllers (@RestController)
    ↓
DAOs/Services (@Service)
    ↓
Repositories (JpaRepository)
    ↓
Models (@Entity)
    ↓
MySQL Database

Frontend (WEB/)
    ↓ HTTP REST API
Controllers
```

---

## Estrutura de Pastas Completa do Projeto

```
Foodly-projeto-feito/
│
├── BACKEND/                         # Projeto Spring Boot
│   ├── src/main/java/com/foodly/
│   │   ├── FoodlyApplication.java
│   │   ├── Controller/              # Controladores REST
│   │   ├── DAO/                     # Lógica de negócio
│   │   ├── Models/                  # Entidades JPA
│   │   └── Repository/              # Persistência
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── db/migration/            # Scripts Flyway (MySQL)
│   ├── banco.sql                    # Schema original (PostgreSQL - converter para MySQL)
│   └── pom.xml
│
├── WEB/                             # Aplicação Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── css/
│   │   ├── styles.css
│   │   ├── login.css
│   │   └── register.css
│   ├── js/
│   │   ├── app.js
│   │   ├── api.js                   # Integração com API REST
│   │   ├── auth.js                  # Autenticação
│   │   ├── carrinho.js
│   │   ├── pedidos.js
│   │   └── avaliacoes.js
│   ├── pages/
│   │   ├── cliente/
│   │   ├── restaurante/
│   │   └── entregador/
│   └── assets/
│       ├── images/
│       └── fonts/
│
└── docs/                            # Documentação
    ├── architecture/
    │   ├── overview_v2.md           # Este documento
    │   └── database_java.md
    └── backend/
        ├── api.md
        └── security.md
```



## Estrutura de Pastas do Backend Java

```
BACKEND/src/main/java/com/foodly/
│
├── FoodlyApplication.java          # Ponto de entrada Spring Boot
│
├── Controller/                      # Camada de Apresentação (REST)
│   ├── AvaliacaoController.java
│   ├── CarrinhoController.java
│   ├── ClienteController.java
│   ├── EntregadorController.java
│   ├── PedidoController.java
│   ├── ProdutoController.java
│   ├── PromocaoController.java
│   ├── RestauranteController.java
│   └── UsuarioController.java
│
├── DAO/                             # Camada de Negócio (Services)
│   ├── AvaliacaoDAO.java
│   ├── CarrinhoDAO.java
│   ├── ClienteDAO.java
│   ├── EntregadorDAO.java
│   ├── PedidoDAO.java
│   ├── ProdutoDAO.java
│   ├── PromocaoDAO.java
│   ├── RestauranteDAO.java
│   └── UsuarioDAO.java
│
├── Models/                          # Entidades JPA (Domínio)
│   ├── Avaliacao.java
│   ├── Carrinho.java
│   ├── CarrinhoItem.java
│   ├── Cliente.java
│   ├── Entregador.java
│   ├── Entrega.java
│   ├── Pedido.java
│   ├── PedidoItem.java
│   ├── Produto.java
│   ├── Promocao.java
│   ├── Restaurante.java
│   └── Usuario.java
│
└── Repository/                      # Camada de Persistência (JPA)
    ├── AvaliacaoRepository.java
    ├── CarrinhoRepository.java
    ├── ClienteRepository.java
    ├── EntregadorRepository.java
    ├── EntregaRepository.java
    ├── PedidoRepository.java
    ├── ProdutoRepository.java
    ├── PromocaoRepository.java
    ├── RestauranteRepository.java
    └── UsuarioRepository.java
```

## Estrutura do Frontend

```
WEB/                                 # Aplicação Frontend
│
├── index.html                       # Página principal
├── login.html                       # Página de login
├── register.html                    # Página de cadastro
│
├── css/                             # Estilos
│   ├── styles.css                   # Estilos globais
│   ├── login.css                    # Estilos da página de login
│   └── register.css                 # Estilos da página de cadastro
│
├── js/                              # Scripts JavaScript
│   ├── app.js                       # Lógica principal da aplicação
│   ├── auth.js                      # Autenticação e gerenciamento de sessão
│   ├── api.js                       # Integração com API REST
│   ├── carrinho.js                  # Funcionalidades do carrinho
│   ├── pedidos.js                   # Gerenciamento de pedidos
│   └── avaliacoes.js                # Sistema de avaliações
│
├── pages/                           # Páginas adicionais
│   ├── cliente/
│   │   ├── perfil.html
│   │   ├── pedidos.html
│   │   └── carrinho.html
│   ├── restaurante/
│   │   ├── dashboard.html
│   │   ├── cardapio.html
│   │   └── pedidos.html
│   └── entregador/
│       ├── dashboard.html
│       └── entregas.html
│
└── assets/                          # Recursos estáticos
    ├── images/
    │   ├── logo.png
    │   └── icons/
    └── fonts/
```

**Versão:** 2.0  
**Última Atualização:** 20 de Novembro de 2025  
**Autor:** Salomão de Moraes
