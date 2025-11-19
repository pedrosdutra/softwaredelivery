# Rotas e Navegação

## Estrutura de Rotas

- Utiliza **React Router** para gerenciamento de rotas e navegação.

## Rotas Públicas

Rotas acessíveis sem login:

### `/login`

- **Componente**: `LoginPage`
- **Descrição**: Página de autenticação de usuários
- **Funcionalidades**:
  - Login com email e senha
  - Recuperação de senha
  - Link para registro
- **Redirecionamento**:  `/dashboard`

### `/register`

- **Componente**: `RegisterPage`
- **Descrição**: Página de cadastro de novos usuários
- **Funcionalidades**:
  - Formulário de registro
  - Validação de dados
  - Termos de uso
- **Redirecionamento**: `/login`

### `/forgot-password`

- **Componente**: `ForgotPasswordPage`
- **Descrição**: Recuperação de senha
- **Funcionalidades**:
  - Envio de email de recuperação
  - Validação de email

### `/reset-password/:token`

- **Componente**: `ResetPasswordPage`
- **Descrição**: Redefinição de senha via token
- **Parâmetros**:
  - `token`: Token enviado por email

## Rotas Protegidas

Rotas que requerem que o usuário esteja logado:

### `/dashboard`

- **Componente**: `DashboardPage`
- **Descrição**: Painel principal do sistema
- **Funcionalidades**:
  - Visão geral de métricas
  - Gráficos e estatísticas
  - Atalhos rápidos

### `/deliveries`

- **Componente**: `DeliveriesPage`
- **Descrição**: Listagem de entregas
- **Funcionalidades**:
  - Tabela de entregas
  - Filtros e busca
  - Paginação
  - Ordenação

### `/deliveries/new`

- **Componente**: `NewDeliveryPage`
- **Descrição**: Criação de nova entrega
- **Funcionalidades**:
  - Formulário de entrega
  - Seleção de endereços
  - Cálculo de frete

### `/deliveries/:id`

- **Componente**: `DeliveryDetailsPage`
- **Descrição**: Detalhes de uma entrega específica
- **Parâmetros**:
  - `id`: ID da entrega
- **Funcionalidades**:
  - Informações completas
  - Rastreamento
  - Histórico de status

### `/deliveries/:id/edit`

- **Componente**: `EditDeliveryPage`
- **Descrição**: Edição de entrega
- **Parâmetros**:
  - `id`: ID da entrega

### `/orders`

- **Componente**: `OrdersPage`
- **Descrição**: Gerenciamento de pedidos
- **Funcionalidades**:
  - Listagem de pedidos
  - Status de pedidos
  - Filtros avançados

### `/orders/new`

- **Componente**: `NewOrderPage`
- **Descrição**: Criação de novo pedido

### `/orders/:id`

- **Componente**: `OrderDetailsPage`
- **Descrição**: Detalhes do pedido
- **Parâmetros**:
  - `id`: ID do pedido

### `/users`

- **Componente**: `UsersPage`
- **Descrição**: Gerenciamento de usuários
- **Funcionalidades**:
  - Listagem de usuários
  - Busca e filtros
  - Gerenciamento de permissões

### `/users/:id`

- **Componente**: `UserDetailsPage`
- **Descrição**: Detalhes de usuário
- **Parâmetros**:
  - `id`: ID do usuário

### `/profile`

- **Componente**: `ProfilePage`
- **Descrição**: Perfil do usuário logado
- **Funcionalidades**:
  - Edição de dados pessoais
  - Alteração de senha
  - Foto de perfil
  - Preferências

### `/settings`

- **Componente**: `SettingsPage`
- **Descrição**: Configurações do sistema
- **Funcionalidades**:
  - Configurações gerais
  - Integrações
  - Notificações

### `/reports`

- **Componente**: `ReportsPage`
- **Descrição**: Relatórios e análises
- **Funcionalidades**:
  - Relatórios customizados
  - Exportação (PDF, Excel)
  - Gráficos avançados

## Rotas de Erro

### `/404`

- **Componente**: `NotFoundPage`
- **Descrição**: Página não encontrada
- **Uso**: Renderizada quando nenhuma rota corresponde

### `/unauthorized`

- **Componente**: `UnauthorizedPage`
- **Descrição**: Acesso não autorizado
- **Uso**: Redirecionamento quando usuário não tem permissão

### `/error`

- **Componente**: `ErrorPage`
- **Descrição**: Página de erro genérico
- **Uso**: Captura de erros inesperados

## Estrutura de Navegação

```
/
├── login (público)
├── register (público)
├── forgot-password (público)
├── reset-password/:token (público)
└── app (protegido)
    |
    ├── dashboard
    ├── deliveries
    |   |
    │   ├── /
    │   ├── /new
    │   ├── /:id
    │   └── /:id/edit
    |
    ├── orders
    |   |
    │   ├── /
    │   ├── /new
    │   └── /:id
    |
    ├── users
    |   |
    │   ├── /
    │   └── /:id
    |
    ├── profile
    ├── settings
    └── reports
```

**Versão:** 1.0  
**Última Atualização:** 19 de Novembro de 2025  
**Autor:** Salomão de Moraes