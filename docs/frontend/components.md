# Documentação dos Componentes do Frontend

## Componentes Principais

### Componentes de Layout

#### Header

> **Localização**: [Header.tsx](frontend/src/components/Layout/Header.tsx)

- **Props**:
  - `user`: Informações do usuário logado
  - `onLogout`: Callback para logout

#### Sidebar

> **Localização**: [Siderbar.tsx](/frontend/src/components/Layout/Sidebar.tsx)

- **Props**:
  - `isOpen`: Estado de abertura/fechamento
  - `menuItems`: Lista de itens do menu

#### Footer

> **Localização**: [Footer.tsx](frontend/src/components/Layout/Footer.tsx)

### Componentes de Formulário

#### Input

> **Localização**: [Input.tsx](frontend/src/components/Form/Input.tsx)
- **Descrição**: Campo de entrada de texto customizado

- **Props**:
  - `label`: Rótulo do campo
  - `type`: Tipo do input (text, email, password, etc.)
  - `error`: Mensagem de erro
  - `required`: Campo obrigatório

#### Select

> **Localização**: [Select.tsx](frontend/src/components/Form/Select.tsx)
- **Descrição**: Campo de seleção dropdown

- **Props**:
  - `options`: Array de opções
  - `value`: Valor selecionado
  - `onChange`: Callback de mudança
- **Uso**: Formulários com seleção de opções

#### Button

> **Localização**: [Button.tsx](frontend/src/components/Form/Button.tsx)
- **Descrição**: Botão customizado 
- **Props**:
  - `variant`: primary, secondary, danger, success
  - `size`: small, medium, large
  - `loading`: Estado de carregamento
  - `disabled`: Estado desabilitado
- **Uso**: Ações em formulários e interfaces

### Componentes de Dados

#### Table

> **Localização**: [Table.tsx](frontend/src/components/Data/Table.tsx)
- **Descrição**: Tabela com paginação e ordenação

- **Props**:
  - `columns`: Definição das colunas
  - `data`: Dados a serem exibidos
  - `onSort`: Callback de ordenação
  - `onPageChange`: Callback de mudança de página

#### Card

> **Localização**: [Card.tsx](frontend/src/components/Data/Card.tsx)
- **Descrição**: Container para exibição de informações

- **Props**:
  - `title`: Título do card
  - `children`: Conteúdo
  - `actions`: Ações disponíveis

#### Modal

> **Localização**: [Modal.tsx](frontend/src/components/Data/Modal.tsx)
- **Descrição**: Janela modal para exibição de conteúdo
- **Props**:

  - `isOpen`: Estado de abertura
  - `onClose`: Callback de fechamento
  - `title`: Título do modal
  - `size`: Tamanho do modal
- **Uso**: Formulários, confirmações, detalhes

### Componentes de Feedback

#### Alert

> **Localização**: [Alert.tsx](frontend/src/components/Feedback/Alert.tsx)
- **Descrição**: Mensagens de alerta para o usuário

- **Props**:
  - `type`: success, error, warning, info
  - `message`: Mensagem a ser exibida
  - `dismissible`: Pode ser fechado
- **Uso**: Feedback visual

#### Loading

> **Localização**: [Loading.tsx](frontend/src/components/Feedback/Loading.tsx)
- **Descrição**: Indicador de carregamento

- **Props**:
  - `size`: Tamanho do spinner
  - `fullScreen`: Carregamento em tela cheia
- **Uso**: Aguardar requisições

#### Toast

> **Localização**: [Toast.tsx](frontend/src/components/Feedback/Toast.tsx)
- **Descrição**: Notificações temporárias

- **Props**:
  - `message`: Mensagem
  - `type`: success, error, warning, info
  - `duration`: Duração em ms
- **Uso**: Notificações rápidas

## Componentes de Negócio

### DeliveryCard

- **Descrição**: Card de exibição de entregas
- **Props**: Dados da entrega
- **Features**: Status, detalhes, ações

### OrderForm

- **Descrição**: Formulário de criação e edição de pedidos

### UserProfile

- **Descrição**: Perfil do usuário
- **Features**: Edição de dados, foto

## Hooks Customizados

### useAuth

- **Descrição**: Gerenciamento de autenticação
- **Retorno**: user, login, logout, isAuthenticated

### useApi

- **Descrição**: Chamadas à API
- **Retorno**: data, loading, error, refetch

### useForm

- **Descrição**: Gerenciamento de formulários
- **Retorno**: values, errors, handleChange, handleSubmit

**Versão:** 1.0  
**Última Atualização:** 19 de Novembro de 2025  
**Autor:** Salomão de Moraes
