# Documentação do Banco de Dados - Foodly

## TABELAS

- [Parte 1](#parte-1---usuários-e-perfis)
- [Parte 2](#parte-2---produtos-e-pedidos-h3-e-h4)
- [Parte 3](#parte-3-entregas-h5-e-h6)
- [Parte 4](#parte-4-avaliações-e-promoções-h7-e-h8)
- [Parte 5](#parte-5-premium-e-suporte-h9-e-h10)


## **PARTE 1 - Usuários e Perfis**

> ### **usuarios**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| nome | VARCHAR(150) | Nome completo do usuário | NOT NULL |
|email | VARCHAR(150) | Email para login | NOT NULL, UNIQUE |
| senha_hash | VARCHAR(255) | Senha criptografada | NOT NULL |
| telefone | VARCHAR(20) | Telefone de contato | - |
| tipo_usuario | VARCHAR(20) | Tipo: 'cliente', 'restaurante', 'entregador', 'suporte' | NOT NULL |
| criado_em | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |

---

> ### **clientes**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| usuario_id | BIGINT | Referência ao usuário | NOT NULL, UNIQUE, FK → usuarios(id) |
| endereco_padrao | TEXT | Endereço principal de entrega | - |

---

> ### **restaurantes**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| usuario_id | BIGINT | Referência ao usuário | NOT NULL, UNIQUE, FK → usuarios(id) |
| nome_fantasia | VARCHAR(150) | Nome comercial | NOT NULL |
| cnpj | VARCHAR(18) | CNPJ do estabelecimento | NOT NULL, UNIQUE |
| endereco | TEXT | Localização completa | NOT NULL |
| dados_bancarios | TEXT | Informações bancárias | - |
| ativo | BOOLEAN | Status de ativação | NOT NULL, DEFAULT TRUE |

---

## **PARTE 2 - Produtos e Pedidos (H3 e H4)**

> ### **produtos**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| restaurante_id | BIGINT | Restaurante proprietário | NOT NULL, FK → restaurantes(id) |
| nome | VARCHAR(150) | Nome do produto | NOT NULL |
| descricao | TEXT | Descrição detalhada | - |
| preco | NUMERIC(10, 2) | Preço unitário | NOT NULL |
| ativo | BOOLEAN | Disponibilidade | NOT NULL, DEFAULT TRUE |

---

> ### **carrinhos**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| cliente_id | BIGINT | Cliente proprietário | NOT NULL, FK → clientes(id) |
| status | VARCHAR(20) | Status: 'aberto', 'fechado', 'expirado' | NOT NULL, DEFAULT 'aberto' |
| criado_em | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| atualizado_em | TIMESTAMP | Última atualização | NOT NULL, DEFAULT NOW() |

---

> ### **carrinho_itens**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| carrinho_id | BIGINT | Carrinho associado | NOT NULL, FK → carrinhos(id) |
| produto_id | BIGINT | Produto adicionado | NOT NULL, FK → produtos(id) |
| quantidade | INT | Quantidade do produto | NOT NULL, DEFAULT 1 |
| preco_unitario | NUMERIC(10, 2) | Preço no momento da adição | NOT NULL |

---

> ### **pedidos**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| cliente_id | BIGINT | Cliente que fez o pedido | NOT NULL, FK → clientes(id) |
| restaurante_id | BIGINT | Restaurante responsável | NOT NULL, FK → restaurantes(id) |
| carrinho_id | BIGINT | Carrinho de origem | FK → carrinhos(id) |
| valor_total | NUMERIC(10, 2) | Valor total do pedido | NOT NULL |
| status | VARCHAR(20) | 'novo', 'preparando', 'pronto', 'em_entrega', 'entregue', 'cancelado' | NOT NULL |
| endereco_entrega | TEXT | Endereço de destino | NOT NULL |
| criado_em | TIMESTAMP | Data do pedido | NOT NULL, DEFAULT NOW() |
| atualizado_em | TIMESTAMP | Última atualização | NOT NULL, DEFAULT NOW() |

---

> ### **pedido_itens**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| pedido_id | BIGINT | Pedido associado | NOT NULL, FK → pedidos(id) |
| produto_id | BIGINT | Produto comprado | NOT NULL, FK → produtos(id) |
| quantidade | INT | Quantidade comprada | NOT NULL |
| preco_unitario | NUMERIC(10, 2) | Preço no momento da compra | NOT NULL |

---

## **PARTE 3: Entregas (H5 e H6)**

> ### **entregadores**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| usuario_id | BIGINT | Referência ao usuário | NOT NULL, UNIQUE, FK → usuarios(id) |
| veiculo_tipo | VARCHAR(50) | Tipo: 'moto', 'bike', 'carro' | - |
| documento | VARCHAR(30) | CNH, CPF, etc. | - |
| ativo | BOOLEAN | Status de ativação | NOT NULL, DEFAULT TRUE |
| criado_em | TIMESTAMP | Data de cadastro | NOT NULL, DEFAULT NOW() |

---

> ### **entregas**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| pedido_id | BIGINT | Pedido a ser entregue | NOT NULL, UNIQUE, FK → pedidos(id) |
| entregador_id | BIGINT | Entregador responsável | FK → entregadores(id) |
| status | VARCHAR(20) | 'disponivel', 'atribuida', 'em_rota', 'entregue', 'cancelada' | NOT NULL |
| rota_sugerida | TEXT | JSON/polyline da rota | - |
| tempo_estimado_min | INT | Tempo estimado em minutos | - |
| distancia_km | NUMERIC(6, 2) | Distância aproximada | - |
| criado_em | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| atualizado_em | TIMESTAMP | Última atualização | NOT NULL, DEFAULT NOW() |

---

> ### **entrega_respostas**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| entrega_id | BIGINT | Entrega oferecida | NOT NULL, FK → entregas(id) |
| entregador_id | BIGINT | Entregador que respondeu | NOT NULL, FK → entregadores(id) |
| resposta | VARCHAR(10) | Resposta: 'aceito', 'recusado' | NOT NULL |
| criado_em | TIMESTAMP | Data da resposta | NOT NULL, DEFAULT NOW() |

---

## **PARTE 4: Avaliações e Promoções (H7 e H8)**

> ### **avaliacoes_restaurantes**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| cliente_id | BIGINT | Cliente avaliador | NOT NULL, FK → clientes(id) |
| restaurante_id | BIGINT | Restaurante avaliado | NOT NULL, FK → restaurantes(id) |
| pedido_id | BIGINT | Pedido relacionado | NOT NULL, FK → pedidos(id) |
| nota | INT | Nota (1-5) | NOT NULL |
| comentario | TEXT | Comentário opcional | - |
| criado_em | TIMESTAMP | Data da avaliação | NOT NULL, DEFAULT NOW() |


---

> ### **avaliacoes_entregadores**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| cliente_id | BIGINT | Cliente avaliador | NOT NULL, FK → clientes(id) |
| entregador_id | BIGINT | Entregador avaliado | NOT NULL, FK → entregadores(id) |
| pedido_id | BIGINT | Pedido relacionado | NOT NULL, FK → pedidos(id) |
| nota | INT | Nota (1-5) | NOT NULL |
| comentario | TEXT | Comentário opcional | - |
| criado_em | TIMESTAMP | Data da avaliação | NOT NULL, DEFAULT NOW() |

---

> ### **promocoes**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| restaurante_id | BIGINT | Restaurante (NULL = promoção geral) | FK → restaurantes(id) |
| titulo | VARCHAR(150) | Título da promoção | NOT NULL |
| descricao | TEXT | Descrição detalhada | - |
| tipo_desconto | VARCHAR(20) | 'percentual', 'valor', 'frete_gratis' | NOT NULL |
| valor_desconto | NUMERIC(10, 2) | Valor do desconto | - |
| data_inicio | TIMESTAMP | Início da validade | NOT NULL |
| data_fim | TIMESTAMP | Fim da validade | NOT NULL |
| ativo | BOOLEAN | Status de ativação | NOT NULL, DEFAULT TRUE |
| criado_em | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |

---

> ### **promocoes_clientes**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| promocao_id | BIGINT | Promoção relacionada | NOT NULL, FK → promocoes(id) |
| cliente_id | BIGINT | Cliente beneficiado | NOT NULL, FK → clientes(id) |
| resgatada | BOOLEAN | Se foi resgatada | NOT NULL, DEFAULT FALSE |
| resgatada_em | TIMESTAMP | Data do resgate | - |

---

## **PARTE 5: Premium e Suporte (H9 e H10)**

> ### **planos_premium**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| nome | VARCHAR(100) | Nome do plano | NOT NULL |
| descricao | TEXT | Descrição dos benefícios | - |
| valor_mensal | NUMERIC(10, 2) | Valor mensal | NOT NULL |
| duracao_dias | INT | Duração em dias | NOT NULL, DEFAULT 30 |
| ativo | BOOLEAN | Status de disponibilidade | NOT NULL, DEFAULT TRUE |
| criado_em | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |

---

> ### **assinaturas_premium**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| cliente_id | BIGINT | Cliente assinante | NOT NULL, FK → clientes(id) |
| plano_id | BIGINT | Plano contratado | NOT NULL, FK → planos_premium(id) |
| status | VARCHAR(20) | 'ativa', 'cancelada', 'expirada', 'pendente' | NOT NULL |
| data_inicio | TIMESTAMP | Início da assinatura | NOT NULL, DEFAULT NOW() |
| data_fim | TIMESTAMP | Fim da assinatura | - |
| renovacao_automatica | BOOLEAN | Renovação automática | NOT NULL, DEFAULT TRUE |
| metodo_pagamento | VARCHAR(50) | Método de pagamento | - |
| referencia_pagamento | VARCHAR(100) | ID da transação | - |
| criado_em | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |

---

> ### **suporte_atendimentos**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| usuario_id | BIGINT | Usuário solicitante | NOT NULL, FK → usuarios(id) |
| assunto | VARCHAR(150) | Assunto do atendimento | - |
| status | VARCHAR(20) | 'aberto', 'em_atendimento', 'encerrado' | NOT NULL |
| criado_em | TIMESTAMP | Data de abertura | NOT NULL, DEFAULT NOW() |
| encerrado_em | TIMESTAMP | Data de encerramento | - |

---

> ### **suporte_mensagens**

| Campo | Tipo | Descrição | Constraints |
|-------|------|-----------|-------------|
| id | BIGSERIAL | Identificador único | PRIMARY KEY |
| atendimento_id | BIGINT | Atendimento relacionado | NOT NULL, FK → suporte_atendimentos(id) |
| remetente_tipo | VARCHAR(20) | Tipo: 'usuario', 'atendente' | NOT NULL |
| remetente_usuario_id | BIGINT | Usuário remetente | FK → usuarios(id) |
| mensagem | TEXT | Conteúdo da mensagem | NOT NULL |
| enviado_em | TIMESTAMP | Data de envio | NOT NULL, DEFAULT NOW() |

---

## 🔗 Relacionamentos Principais

> ### Hierarquia de Usuários

- usuarios (1) → (1) clientes
- usuarios (1) → (1) restaurantes
- usuarios (1) → (1) entregadores


> ### Fluxo de Pedidos

- clientes (1) → (N) carrinhos
- carrinhos (1) → (N) carrinho_itens
- carrinhos (1) → (1) pedidos
- pedidos (1) → (N) pedido_itens
- pedidos (1) → (1) entregas


> ### Avaliações

- pedidos (1) → (1) avaliacoes_restaurantes
- pedidos (1) → (1) avaliacoes_entregadores


> ### Promoções

- promocoes (1) → (N) promocoes_clientes

> ### Premium

- planos_premium (1) → (N) assinaturas_premium
- clientes (1) → (N) assinaturas_premium

> ### Suporte

- suporte_atendimentos (1) → (N) suporte_mensagens
- usuarios (1) → (N) suporte_atendimentos

---
**Versão:** 2.0  
**Última Atualização:** 20 de Novembro de 2025  
**Autor:** Salomão de Moraes