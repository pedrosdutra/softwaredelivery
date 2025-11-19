# Arquitetura Geral do Sistema

_O App é dividido em duas camadas principais:_

- Backend: API REST em Node.js/Express conectada ao MySQL
- Frontend: SPA React (Vite) com múltiplas aplicações modulares

## Tecnologias Principais

_Backend:_

- Node.js + Express 5
- MySQL 2 
- Bcryptjs 
- CORS 

_Frontend:_

- React 19 + TypeScript
- React Router v7 
- Tailwind CSS 4 
- Radix UI + shadcn/ui 
- React Hook Form + Zod 
- Vite 7

### Estrutura das Principais Pastas 
```
root/
|
├── backend/
|
│   ├── src/
|   |   |    
│   │   ├── server.js              # Ponto de entrada do servidor
│   │   ├── teste-db.mjs           # Script de teste de conexão
│   │   ├── config/
|   |   |   |
│   │   │   └── db.js              # Configuração do banco de dados
|   |   |   
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   └── restaurantController.js
|   |   |
│   │   └── routes/
│   │       ├── userRoutes.js
│   │       └── restaurantRoutes.js
|   |
│   ├── .env                       # Variáveis de ambiente
│   └── package.json
│
├── frontend/
|   |
│   ├── src/
│   │   └── apps/
|   |       |
│   │       ├── main.jsx           
│   │       ├── index.css          
│   │       ├── assets/            
│   │       ├── entrada/             # Tela inicial de escolha
│   │       ├── login/               # Login ou Cadasrro de clientes
│   │       ├── login-restaurante/   # Login ou Cadastro de restaurantes
│   │       ├── menu-cliente/        # Cardápio e catálogo
│   │       ├── menu-restaurante/    # Painel do restaurante
│   │       ├── perfil-user/         # Perfil do usuário
│   │       ├── userpremium/         # Recursos premium
│   │       ├── rastreamento-pedido/ # Rastreamento de pedidos
│   │       ├── avaliacao/           # Sistema de avaliações
│   │       ├── suporte/             # Chat de suporte
│   │       ├── par-de-comida/       # Match de comidas
│   │       └── comida-aleatoria/    # Sugestão aleatória
|   |
│   ├── index.html
│   ├── vite.config.js
 \  └── package.json
```

---

## Arquitetura do Backend

_Principais Funções_

1. Autenticação e autorização de usuários e restaurantes
2. CRUD de usuários (cadastro, login, perfil)
3. CRUD de restaurantes (cadastro, dados, menu)
4. Validação e hash de senhas
5. Comunicação com o banco MySQL

--- 

### Fluxo de Requisições

```
Cliente (Frontend)
    ↓
[Middleware CORS]
    ↓
[JSON Parser do Body]
    ↓
Rotas (userRoutes / restaurantRoutes)
    ↓
Controladores (userController / restaurantController)
    ↓
Banco de Dados (MySQL com o uso da api db.js)
    ↓
Resposta (JSON)
```

---

_Principais Arquivos do Backend_

- `server.js` - Inicialização do Express, middlewares globais e registro de rotas
- `config/db.js` - Configuração e conexão com o  Banco de Dados
- `teste-db.mjs` - Script de teste de conexão
- `controllers/userController.js` - Lógica de negócio para usuários
- `controllers/restaurantController.js` - Lógica de negócio para restaurantes
- `routes/userRoutes.js` - Definição dos endpoints para usuários
- `routes/restaurantRoutes.js` - Definição de endpoints para restaurantes

### Endpoints Principais

```
POST /api/users/register        
POST /api/users/login           
POST /api/restaurantes/register 
GET  /api/restaurantes         
```

Ver documentação completa em [api.md](/docs/backend/api.md).

## Arquitetura do Frontend

O arquivo `main.jsx` define todas as rotas da aplicação:

```js
<Route path="/" element={<EntradaApp />} />                             # Menu de Inicio do App
<Route path="/login" element={<LoginApp />} />                          # Login Cliente
<Route path="/login-restaurante" element={<LoginRestauranteApp />} />   # Login Restaurante
<Route path="/menu" element={<MenuClienteApp />} />                     # Menu Cliente
<Route path="/menu-restaurante" element={<MenuRestauranteApp />} />     # Menu Restaurante
<Route path="/perfil" element={<PerfilUserApp />} />                    # Perfil de Usuário
<Route path="/userpremium" element={<UserPremiumApp />} />              # Perfil de Usuário Premium
<Route path="/rastreamento-pedido" element={<RastreamentoPedido />} />  # Rastrear o Pedido
<Route path="/avaliacao" element={<Avaliacao />} />                     # Avaliar Serviço
<Route path="/suporte" element={<Suporte />} />                         # Chat de Suporte
<Route path="/par-de-comida" element={<ParDeComida />} />               # Função Par de Comida
<Route path="/comida-aleatoria" element={<ComidaAleatoria />} />        # Comida Aleatória
```

--- 

### Apps Principais
#### 1. EntradaApp.tsx
- Tela inicial onde o usuário escolhe entre: Sou Cliente e Sou Parceiro (Restaurante)

#### 2. LoginApp.tsx

- Sistema de autenticação para clientes com: Formulário de cadastro, login

#### 3. LoginRestauranteApp.tsx
- Cadastro e login para restaurantes: RestaurantRegistration, Upload de logo e capa, cadastrar categorias, horários e taxa de entrega

#### 4. MenuClienteApp.tsx
- Catálogo principal da plataforma: Busca e carrinho, seção destaque, MenuCategories, RestaurantCatalog (Lista de restaurantes), RestaurantDetails, Cart, FoodTools

#### 5. MenuRestauranteApp.tsx
- Painel administrativo do restaurante: DashboardStats, OrderList, OrderCard, StatusBadge, MenuManagement, RestaurantSidebar

#### 6. PerfilUserApp.tsx
- Perfil do usuário cliente: UserProfile, EditProfileSheet, OrderReportSheet

#### 7. UserPremiumApp.tsx
- Recursos exclusivos para assinantes: Dashboard personalizado, Benefícios

#### 8. RastreamentoPedidoApp.tsx
- Acompanhamento em tempo real: OrderTracking,Timeline de etapas, Informações do restaurante e entregador

#### 9. Avaliação (avaliacao/AvaliacaoApp.tsx)
- Sistema de feedback: OrderEvaluation, StarRating 

#### 10. Suporte (suporte/SuporteApp.tsx)
- Central de ajuda: ChatWidget, Formulário de contato, FAQs e informações

#### 11. ParDeComidaApp.tsx
- Sistema de match de comidas: FoodCard, MatchResult

#### 12. ComidaAleatoriaApp.tsx
- Sugestão aleatória de pratos: FoodRandomizer, RestaurantRecommendations

## Estrutura do Banco de Dados 

_Ver detalhes em [database.md](docs/architeture/database.md)_

- Arquivo de Conexão com o Banco está em: `backend/src/config/db.js`

- Conecta ao Banco de Dados com a biblioteca mysql2 com uso de credencias

- Para testar rapidamente o Banco, rode `cd backend && node src/teste-db.mjs`


**Versão:** 1.0  
**Última Atualização:** 18 de Novembro de 2025  
**Autor:** Salomão de Moraes