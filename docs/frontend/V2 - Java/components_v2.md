# Documentação dos Componentes da Pasta WEB

## Paǵinas HTML do Sistema

### `index.html`
**Rota:** `/` (tela inicial)
- **Funcionalidade:** Tela de login
- **Elementos:** 
  - Formulário de autenticação (email/senha)
  - Links para cadastro
  - Botão "Esqueci minha senha"
- **Navegação:** Redireciona para `menu.html` após login

### `cadastroCliente.html`
**Rota:** `/cadastro-cliente`
- **Funcionalidade:** Registro de novos usuários/clientes
- **Campos:**
  - Nome completo
  - Email
  - Telefone
  - CPF
  - Endereço de entrega
  - Senha e confirmação
- **Validação:** Formulário com validação cliente

### `cadastroRestaurante.html`
**Rota:** `/cadastro-restaurante`
- **Funcionalidade:** Cadastro de restaurantes parceiros
- **Campos:**
  - Nome do estabelecimento
  - CNPJ
  - Categoria/tipo de cozinha
  - Endereço comercial
  - Telefone/WhatsApp
  - Horários de funcionamento
  - Upload de logo

### `menu.html`
**Rota:** `/menu` (página principal pós-login)
- **Funcionalidade:** Dashboard do cliente
- **Elementos:**
  - Barra de busca
  - Grid de restaurantes em destaque
  - Filtros por categoria
  - Carrinho de compras
  - Navbar com navegação

### `restaurante.html`
**Rota:** `/restaurantes`
- **Funcionalidade:** Listagem completa de restaurantes
- **Elementos:**
  - Cards de restaurantes
  - Informações: avaliação, tempo de entrega, distância
  - Filtros e ordenação
  - Paginação 

### `suporte.html`
**Rota:** `/suporte`
- **Funcionalidade:** Atendimento ao cliente
- **Elementos:**
  - Formulário de contato
  - Categorias de problema
  - Campo de mensagem
  - Opções de contato 

### `atendimentoAoCliente.html`
**Rota:** `/atendimento`
- **Funcionalidade:** Página estendida de suporte
- **Diferencial:** Possivelmente inclui:
  - Chat ao vivo
  - Histórico de tickets
  - Base de conhecimento
  - FAQ expandido

---

## Funções JavaScript

### `main.js`
**Objetivo:** Script principal com todas as funcionalidades client-side

**Funções Principais:**
```javascript
// Autenticação
- handleLogin()           // Valida e processa login
- validateEmail()         // Valida formato de email
- handleLogout()          // Encerra sessão

// Cadastros
- handleClientSignup()    // Processa cadastro de cliente
- handleRestaurantSignup()// Processa cadastro de restaurante
- validateCPF()           // Valida CPF
- validateCNPJ()          // Valida CNPJ

// Interface
- togglePasswordVisibility() // Mostra/oculta senha
- showLoadingSpinner()    // Indicador de carregamento
- showErrorMessage()      // Exibe mensagens de erro
- showSuccessMessage()    // Exibe mensagens de sucesso

// Formulários
- validateForm()          // Validação geral de formulários
- clearForm()             // Limpa campos após submit
- handleFormSubmit()      // Gerencia envio de formulários

// Suporte
- handleSupportForm()     // Processa formulário de suporte
- sendMessage()           // Envia mensagem ao backend

// Navegação
- redirectTo()            // Redireciona entre páginas
- checkAuth()             // Verifica autenticação
```

**Integrações:**
- Comunicação com API backend
- Validações em tempo real
- Máscaras de input (CPF, telefone, CEP)

---

**Fluxo de Navegação:**
```
index.html (Login)
    ├─> cadastroCliente.html
    ├─> cadastroRestaurante.html
    └─> menu.html (autenticado)
            ├─> restaurante.html
            └─> suporte.html / atendimentoAoCliente.html
```

**Versão:** 2.0  
**Última Atualização:** 20 de Novembro de 2025  
**Autor:** Salomão de Moraes