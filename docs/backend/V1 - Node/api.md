# Endpoints da API
## Endpoints de Usuários

`POST /api/users/register`

- Descrição: Registra um novo cliente na plataforma.

- Responsável: registerUser em userController.js

### Funções:

1. Valida dados obrigatórios (nome, email, senha)
2. Verifica se o email já está cadastrado
3. Criptografa a senha
4. Insere o novo usuário no banco de dados na tabela usuarios
 
---

`POST /api/users/login`

- Descrição: Autentica um usuário cliente existente.

- Responsável: loginUser em userController.js

### Funções:

1. Valida email e senha
2. Busca o usuário no banco de dados
3. Compara a senha fornecida com o hash 
4. Retorna os dados do usuário, menos a senha, em caso de sucesso

---

`PUT /api/users/:id`

- Descrição: Atualiza os dados de perfil de um usuário existente.

- Responsável: updateUser em userController.js

### Funções:

1. Recebe o ID do usuário 
2. Atualiza informações pessoais e de endereço
3. Permite modificar: nome, email, telefone, CEP, endereço, número, complemento, bairro e cidade

---

## Endpoints de Restaurantes

`POST /api/restaurantes/register`

- Descrição: Registra um novo restaurante parceiro na plataforma.

- Responsável: registerRestaurant em restaurantController.js

### Funções:

1. Valida dados obrigatórios (nome, email, senha, telefone, endereço)
2. Verifica se o email já está cadastrado
Criptografa a senha usando bcrypt
3. Armazena informações do estabelecimento 

---

`POST /api/restaurantes/login`

- Descrição: Autentica um restaurante parceiro existente.

- Responsável: loginRestaurant em restaurantController.js

### Funções:

1. Valida credenciais de email e senha
2. Busca o restaurante no banco
3. Compara a senha fornecida com o hash 
4. Retorna os dados do restaurante, menos senha, em caso de sucesso

---

 - A API se conecta ao MySQL através do módulo `db.js`. Para mais detalhes sobre o banco banco de dados, consulte [database.md](docs/backend/database.md).

**Versão:** 1.0  
**Última Atualização:** 18 de Novembro de 2025  
**Autor:** Salomão de Moraes
