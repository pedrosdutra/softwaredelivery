# Como rodar o backend

### Pré-requisitos

Node.js (>= versão 18)
npm
MySQL (>= versão 8)

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente .env

```bash
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root

# Sua senha MySQL
DB_PASS=sua_senha_aqui
DB_NAME=foodlydb

# Porta do Servidor
PORT=3001
```

### 3. Executando o Servidor - Iniciar o Backend:

```js
node src/server.js
```
Mensagem de sucesso:

✅ Conectado ao MySQL com sucesso!
✅ Servidor rodando em http://localhost:3001

### Testando a Conexão

```
curl http://localhost:3001
```

- Resposta:

🍽️ API do Foodly está rodando corretamente!

### Testar Conexão com o Banco de Dados

```
node src/teste-db.mjs
```

Resposta:

✅ Conectado com sucesso!


Versão: 1.0
Última Atualização: 19 de Janeiro de 2025
Autor: Salomão de Moraes