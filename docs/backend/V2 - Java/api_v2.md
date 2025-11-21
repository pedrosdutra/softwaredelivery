# Documentação da API Foodly

## Arquitetura

- **Controllers**: Endpoints REST para comunicação com o frontend
- **Repository**: Interface com o banco de dados usando Spring Data JPA
- **DAO**: Camada de acesso a dados com queries customizadas
- **Models**: Entidades do domínio

## Módulos da API

### 1. Clientes

**ClienteController**

`Gerencia operações relacionadas aos clientes da plataforma.`

**Funcionalidades:**
- Cadastro de novos clientes
- Autenticação e login
- Atualização de dados cadastrais
- Consulta de informações do cliente
- Gerenciamento de endereços
- Exclusão de conta

### 2. Restaurantes

**RestauranteController**

`Administra restaurantes cadastrados na plataforma.`

**Funcionalidades:**
- Cadastro de restaurantes
- Atualização de informações (horário, categoria, descrição)
- Gerenciamento do catálogo de produtos
- Consulta de restaurantes por localização ou categoria
- Ativação/desativação de restaurantes

### 3. Carrinho de Compras

**CarrinhoController**

`Controla o carrinho de compras dos clientes.`

**Funcionalidades:**
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Atualizar quantidades
- Consultar itens do carrinho
- Calcular subtotal
- Limpar carrinho após finalização do pedido

### 4. Pedidos

**PedidoController**

`Gerencia todo o ciclo de vida dos pedidos.`

**Funcionalidades:**
- Criação de pedidos a partir do carrinho
- Consulta de histórico de pedidos
- Acompanhamento de status do pedido
- Cancelamento de pedidos
- Cálculo de valores (subtotal, taxa de entrega, total)
- Gerenciamento de itens do pedido

### 5. Entregas

**EntregaController**

`Controla o processo de entrega dos pedidos.`

**Funcionalidades:**
- Atribuição de entregadores aos pedidos
- Atualização de status da entrega
- Rastreamento em tempo real
- Gerenciamento de entregadores disponíveis
- Registro de horários (coleta, entrega)
- Sistema de respostas do entregador

### 6. Avaliações

**AvaliacaoController**

`Permite avaliações de restaurantes e entregadores.`

**Funcionalidades:**
- Avaliação de restaurantes (nota e comentário)
- Avaliação de entregadores (nota e comentário)
- Consulta de avaliações
- Cálculo de média de avaliações
- Validação de avaliações duplicadas

### 7. Promoções

**PromocaoController**

`Administra promoções e cupons de desconto.`

**Funcionalidades:**
- Criação de promoções
- Aplicação de cupons de desconto
- Validação de elegibilidade
- Gerenciamento de período de validade
- Tipos de desconto (percentual ou valor fixo)
- Associação de promoções a clientes específicos

### 8. Assinatura Premium

**PremiumController**

`Gerencia o sistema de assinaturas premium.`

**Funcionalidades:**
- Cadastro de planos premium
- Assinatura de clientes em planos
- Renovação automática
- Cancelamento de assinaturas
- Benefícios exclusivos (frete grátis, descontos)
- Consulta de status da assinatura

### 9. Suporte

**SuporteController**

`Sistema de atendimento ao cliente.`

**Funcionalidades:**
- Abertura de tickets de suporte
- Troca de mensagens entre cliente e atendente
- Categorização de atendimentos
- Atualização de status (aberto, em andamento, resolvido)
- Histórico de atendimentos
- Priorização de tickets

## Modelos de Dados

### Cliente
_Representa usuários que fazem pedidos na plataforma._

### Restaurante
_Estabelecimentos que vendem produtos._

### Produto
_Itens disponíveis para venda nos restaurantes._

### Carrinho e CarrinhoItem
_Carrinho de compras temporário antes da finalização do pedido._

### Pedido e PedidoItem
_Pedidos confirmados com seus respectivos itens._

### Entrega e Entregador
_Informações sobre o processo de entrega e responsáveis._

### AvaliacaoRestaurante e AvaliacaoEntregador
_Feedback dos clientes sobre serviços._

### Promocao e PromocaoCliente
_Sistema de descontos e ofertas._

### PlanoPremium e AssinaturaPremium
_Assinaturas com benefícios exclusivos._

### SuporteAtendimento e SuporteMensagem
_Sistema de atendimento ao cliente._

## Padrões de Resposta

- 200: Sucesso
- 201: Recurso criado
- 400: Requisição inválida
- 404: Recurso não encontrado
- 500: Erro interno do servidor

## Segurança

- Autenticação de usuários
- Validação de dados de entrada
- Proteção contra operações não autorizadas
- Gerenciamento de sessões

**Versão:** 2.0  
**Última Atualização:** 20 de Novembro de 2025  
**Autor:** Salomão de Moraes