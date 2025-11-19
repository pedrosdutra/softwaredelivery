# Middlewares e utils

## Middlewares Globais (Backend)

### 1. CORS (Cross-Origin Resource Sharing)

> Localização: [server.js](backend/src/server.js)

_Funcionalidades:_

- Permite requisições do frontend
- Autoriza métodos HTTP: GET, POST, PUT e DELETE.
- Habilita envio de cookies e tokens de autenticação
- Protege contra requisições de origens não autorizadas

### 2. Express JSON Parser

> Localização: [server.js](backend/src/server.js)

_Funcionalidades:_

- Converte automaticamente o corpo das requisições JSON em objetos JavaScript
- Aceita payloads (10MB)
- Permite upload de imagens
- Facilita o acesso aos dados enviados

### 3. cn() - Class Name Utility

> Localização: Nos arquivos utils.ts

_Funcionalidades:_

- Combina múltiplas classes CSS de forma inteligente
- Utiliza 'clsx' para processamento condicional de classes
- Utiliza 'twMerge' para resolver conflitos entre classes do Tailwind CSS
- Permite sobrescrever estilos padrão de componentes
- Essencial para a composição de componentes UI reutilizáveis


## Middlewares Específicos de Rota
Nessa versão, não há implementação de middlewares de rota. As rotas estão configuradas de forma direta nos arquivos:

> [userRoutes.js](backend/src/routes/userRoutes.js)
>
> [restaurantRoutes.js](backend/src/routes/restaurantRoutes.js)

## Utilitários de Validação (Backend)

### 4. Bcrypt

> Localização:
> [userController.js](backend/src/controllers/userController.js) ,
> [restauranteController.js](backend/src/controllers/restaurantController.js)

_Funcionalidades:_

- Cria hash seguro da senha com salt rounds

- Compara senha com hash armazenado

- Garante segurança no armazenamento de senhas

- Protege contra ataques de brute force

- Gerenciamento de Variáveis de Ambiente

### 5. Dotenv

> Localização: [server.js](backend/src/server.js)

>Arquivo de configuração: [.env](backend/.env)

_Funcionalidades:_

- Carrega variáveis de ambiente do arquivo .env
- Permite configuração flexível
- Protege credenciais sensíveis do banco de dados
- Facilita o deploy 

## Utilitários de Contexto (Frontend)

### 6. CartContext

> Localização: [CartContext.tsx](frontend/src/apps/menu-cliente/contexts/CartContext.tsx)

_Funcionalidades:_

- Gerencia estado global do carrinho de compras
- Implementa lógica de negócio para adicionar/remover itens
- Calcula totais e subtotais automaticamente

### 7. Database Connection Utility

> Localização: [db.js](backend/src/config/db.js)

_Funcionalidades:_

- Cria conexão persistente com MySQL
- Carrega credenciais da api
- Exporta instância de conexão para uso nos controllers
- Confirmações de conexão

### 8. Script de Teste:

> Localização: [teste-db.mjs](backend/src/teste-db.mjs)

- Testa conectividade com banco de dados
- Utiliza credenciais diretas para debug
- Fecha conexão após o teste

**Versão:** 1.0  
**Última Atualização:** 18 de Novembro de 2025  
**Autor:** Salomão de Moraes