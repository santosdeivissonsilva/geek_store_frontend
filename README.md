# 🛍️ Geek Store - Frontend

> Loja online especializada em produtos geek e colecionáveis (Funkos)

[![Angular](https://img.shields.io/badge/Angular-20.3.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Autenticação e Autorização](#-autenticação-e-autorização)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [Serviços](#-serviços)
- [Desenvolvimento](#-desenvolvimento)
- [Build para Produção](#-build-para-produção)
- [Testes](#-testes)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Sobre o Projeto

Geek Store é uma aplicação web de e-commerce desenvolvida em Angular para venda de produtos geek, especialmente Funkos e colecionáveis. A aplicação oferece funcionalidades completas de compra, gerenciamento de produtos e administração de usuários.

### Características Principais

- ✅ Autenticação e autorização (usuários e administradores)
- ✅ Catálogo de produtos com imagens
- ✅ Carrinho de compras
- ✅ Histórico de compras
- ✅ Painel administrativo completo
- ✅ Gerenciamento de usuários
- ✅ Controle de vendas
- ✅ Interface responsiva

---

## 🛠️ Tecnologias

### Core
- **Angular** 20.3.0 - Framework principal
- **TypeScript** 5.9.2 - Linguagem de programação
- **RxJS** 7.8.0 - Programação reativa

### UI/UX
- **Bootstrap** 5.3.8 - Framework CSS
- **SCSS** - Pré-processador CSS
- **ngx-toastr** 19.1.0 - Notificações toast

### Ferramentas
- **Angular CLI** 20.3.9 - Ferramentas de linha de comando
- **Karma** - Test runner
- **Jasmine** - Framework de testes

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (vem com Node.js)
- **Angular CLI** 20.3.9

### Instalando o Angular CLI

```bash
npm install -g @angular/cli@20.3.9
```

Verifique a instalação:

```bash
ng version
```

---

## 🚀 Instalação

1. **Clone o repositório** (ou navegue até a pasta do projeto):

```bash
cd geek_store_frontend
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Verifique se o backend está rodando**:

O frontend espera que o backend esteja rodando em `http://localhost:8080`. Certifique-se de que o servidor backend está ativo antes de iniciar o frontend.

---

## ⚙️ Configuração

### URLs da API

As URLs da API estão configuradas diretamente nos serviços. Por padrão, o backend deve estar em:

```
http://localhost:8080
```

**Serviços e suas URLs:**
- `LoginService`: `http://localhost:8080/auth`
- `ProductService`: `http://localhost:8080/product`
- `SaleService`: `http://localhost:8080/sale`
- `UserService`: `http://localhost:8080/user`

> **Nota:** Para produção, recomenda-se mover essas URLs para variáveis de ambiente.

---

## ▶️ Executando o Projeto

### Modo de Desenvolvimento

```bash
npm start
# ou
ng serve
```

A aplicação estará disponível em: **http://localhost:4200**

O servidor de desenvolvimento recarrega automaticamente quando você modifica os arquivos.

### Acessando a Aplicação

1. Abra seu navegador em `http://localhost:4200`
2. Na página inicial, você pode:
   - Fazer login (se já tiver conta)
   - Criar uma nova conta
3. Após o login, você terá acesso às funcionalidades de usuário
4. Usuários com role `ADMIN` terão acesso ao painel administrativo

---

## 📁 Estrutura do Projeto

```
geek_store_frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── default-homepage/    # Layout padrão com navbar
│   │   │   ├── default-login-layout/ # Layout para páginas de login
│   │   │   └── primary-input/        # Input customizado
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── admin/           # Painel administrativo
│   │   │   ├── cart/            # Carrinho de compras
│   │   │   ├── home/            # Página inicial
│   │   │   ├── login/           # Login
│   │   │   ├── my-purchases/    # Histórico de compras (usuário)
│   │   │   ├── products/        # Catálogo de produtos
│   │   │   ├── purchase-details/# Detalhes de compra/venda
│   │   │   ├── sales-management/# Gerenciamento de vendas (admin)
│   │   │   ├── signup/          # Cadastro
│   │   │   ├── user/            # Perfil do usuário
│   │   │   └── users-management/# Gerenciamento de usuários (admin)
│   │   ├── services/            # Serviços Angular
│   │   │   ├── admin-guard.ts   # Guard para rotas admin
│   │   │   ├── auth-guard.ts    # Guard para rotas autenticadas
│   │   │   ├── cart.service.ts  # Gerenciamento do carrinho
│   │   │   ├── login.service.ts # Autenticação
│   │   │   ├── product.service.ts # Produtos
│   │   │   ├── sale.service.ts  # Vendas
│   │   │   └── user.service.ts  # Usuários
│   │   ├── types/               # Definições de tipos TypeScript
│   │   │   ├── login-response.type.ts
│   │   │   ├── product.type.ts
│   │   │   ├── sale.type.ts
│   │   │   └── user.type.ts
│   │   ├── app.config.ts        # Configuração da aplicação
│   │   ├── app.routes.ts        # Rotas da aplicação
│   │   └── app.ts               # Componente raiz
│   ├── styles/                  # Estilos globais
│   │   └── variables.scss       # Variáveis SCSS
│   └── styles.scss              # Estilos globais
├── public/                      # Arquivos estáticos
│   ├── logo.svg
│   ├── cart.svg
│   └── user.svg
├── angular.json                  # Configuração do Angular
├── package.json                  # Dependências do projeto
└── tsconfig.json                 # Configuração TypeScript
```

---

## 🎨 Funcionalidades

### Para Usuários Autenticados

#### 1. **Catálogo de Produtos** (`/products`)
- Visualização de todos os produtos disponíveis
- Busca de produtos
- Adicionar produtos ao carrinho
- Visualização de imagens, preços e descrições

#### 2. **Carrinho de Compras** (`/cart`)
- Visualizar itens adicionados
- Atualizar quantidades
- Remover itens
- Visualizar total da compra
- Limpar carrinho

#### 3. **Minhas Compras** (`/purchases`)
- Histórico completo de compras
- Visualizar detalhes de cada compra
- Informações de data, total e itens

#### 4. **Perfil do Usuário** (`/user`)
- Visualizar informações pessoais
- Editar nome e email
- Alterar senha
- Logout

### Para Administradores

#### 1. **Painel Administrativo** (`/admin`)
- Gerenciamento de produtos
- Criar, editar e excluir produtos
- Upload de imagens
- Controle de estoque

#### 2. **Gerenciamento de Usuários** (`/admin/users`)
- Listar todos os usuários
- Criar novos usuários
- Editar informações de usuários
- Alterar roles (USER/ADMIN)
- Excluir usuários

#### 3. **Gerenciamento de Vendas** (`/admin/sales`)
- Visualizar todas as vendas do sistema
- Filtrar vendas por data
- Buscar vendas
- Criar novas vendas manualmente
- Visualizar detalhes de vendas
- Excluir vendas

---

## 🔐 Autenticação e Autorização

### Sistema de Autenticação

A aplicação usa **JWT (JSON Web Tokens)** para autenticação. O token é armazenado no `sessionStorage` após o login.

**Dados armazenados no sessionStorage:**
- `auth-token`: Token JWT
- `username`: Nome do usuário
- `user-role`: Role do usuário (USER ou ADMIN)
- `email`: Email do usuário

### Guards de Rota

#### `AuthGuard`
Protege rotas que requerem autenticação. Verifica se existe um token válido no `sessionStorage`.

**Rotas protegidas:**
- `/products`
- `/cart`
- `/user`
- `/purchases`
- `/purchases/:id`

#### `AdminGuard`
Protege rotas que requerem permissão de administrador. Verifica se o usuário tem role `ADMIN`.

**Rotas protegidas:**
- `/admin`
- `/admin/users`
- `/admin/sales`
- `/admin/sales/:id`

### Fluxo de Autenticação

1. Usuário faz login ou cadastro
2. Backend retorna token JWT
3. Token é armazenado no `sessionStorage`
4. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer <token>`
5. Ao fazer logout, o token é removido do `sessionStorage`

---

## 🗺️ Rotas da Aplicação

| Rota | Componente | Guard | Descrição |
|------|------------|-------|-----------|
| `/` | `HomeComponent` | - | Página inicial |
| `/login` | `LoginComponent` | - | Página de login |
| `/signup` | `SignupComponent` | - | Página de cadastro |
| `/products` | `Products` | `AuthGuard` | Catálogo de produtos |
| `/cart` | `CartComponent` | `AuthGuard` | Carrinho de compras |
| `/user` | `UserComponent` | `AuthGuard` | Perfil do usuário |
| `/purchases` | `MyPurchasesComponent` | `AuthGuard` | Histórico de compras |
| `/purchases/:id` | `PurchaseDetailsComponent` | `AuthGuard` | Detalhes da compra |
| `/admin` | `AdminPage` | `AdminGuard` | Painel administrativo |
| `/admin/users` | `UsersManagementComponent` | `AdminGuard` | Gerenciamento de usuários |
| `/admin/sales` | `SalesManagementComponent` | `AdminGuard` | Gerenciamento de vendas |
| `/admin/sales/:id` | `PurchaseDetailsComponent` | `AdminGuard` | Detalhes da venda (admin) |

---

## 🔧 Serviços

### `LoginService`
Gerencia autenticação e registro de usuários.

**Métodos:**
- `login(email: string, password: string)`: Realiza login
- `signup(name: string, email: string, password: string)`: Registra novo usuário

### `ProductService`
Gerencia operações relacionadas a produtos.

**Métodos:**
- `getAllProducts()`: Lista todos os produtos
- `getProductById(id: string)`: Busca produto por ID
- `createProduct(product: FormData)`: Cria novo produto
- `updateProduct(id: string, product: FormData)`: Atualiza produto
- `deleteProduct(id: string)`: Exclui produto
- `getImageUrl(imagePath: string | null)`: Retorna URL da imagem

### `SaleService`
Gerencia operações relacionadas a vendas.

**Métodos:**
- `getAllSales()`: Lista todas as vendas (admin)
- `getSaleById(id: string)`: Busca venda por ID (admin)
- `getMyPurchases()`: Lista compras do usuário autenticado
- `getMyPurchaseById(id: string)`: Busca compra por ID (usuário)
- `createSale(sale: Partial<Sale>)`: Cria nova venda (admin)
- `deleteSale(id: string)`: Exclui venda (admin)

### `UserService`
Gerencia operações relacionadas a usuários.

**Métodos:**
- `getAllUsers()`: Lista todos os usuários (admin)
- `getUserById(id: string)`: Busca usuário por ID
- `createUser(user: {...})`: Cria novo usuário (admin)
- `updateUser(id: string, user: Partial<User>)`: Atualiza usuário
- `deleteUser(id: string)`: Exclui usuário (admin)
- `updateUserRole(id: string, role: string)`: Atualiza role do usuário (admin)

### `CartService`
Gerencia o carrinho de compras localmente.

**Métodos:**
- `addToCart(product: Product, quantity: number)`: Adiciona produto ao carrinho
- `removeFromCart(productId: string)`: Remove produto do carrinho
- `updateQuantity(productId: string, quantity: number)`: Atualiza quantidade
- `getCartItems()`: Retorna itens do carrinho
- `getTotalPrice()`: Calcula preço total
- `clearCart()`: Limpa o carrinho
- `cart$`: Observable do carrinho

---

## 💻 Desenvolvimento

### Gerando Novos Componentes

```bash
ng generate component components/nome-do-componente
```

### Gerando Novos Serviços

```bash
ng generate service services/nome-do-servico
```

### Estrutura de um Componente

Cada componente possui:
- `*.ts`: Lógica do componente
- `*.html`: Template HTML
- `*.scss`: Estilos do componente
- `*.spec.ts`: Testes unitários

### Padrões de Código

- **TypeScript**: Tipagem forte, uso de interfaces/types
- **SCSS**: Variáveis em `src/styles/variables.scss`
- **Formulários**: Reactive Forms do Angular
- **HTTP**: HttpClient com observables RxJS
- **Notificações**: ngx-toastr para feedback ao usuário

---

## 🏗️ Build para Produção

### Build de Desenvolvimento

```bash
ng build
```

### Build de Produção

```bash
ng build --configuration production
```

Os arquivos compilados estarão em `dist/geek_store/`.

### Otimizações de Produção

O build de produção inclui:
- Minificação de código
- Tree-shaking
- AOT (Ahead-of-Time) compilation
- Otimização de bundles

---

## 🧪 Testes

### Executar Testes Unitários

```bash
npm test
# ou
ng test
```

Os testes são executados com **Karma** e **Jasmine**. O navegador será aberto automaticamente e os testes serão executados em modo watch.

### Cobertura de Código

```bash
ng test --code-coverage
```

O relatório de cobertura será gerado em `coverage/`.

---

## 🐛 Troubleshooting

### Problema: Erro de CORS

**Solução:** Certifique-se de que o backend está configurado para aceitar requisições do frontend (`http://localhost:4200`).

### Problema: Token não encontrado

**Solução:** 
1. Verifique se fez login corretamente
2. Limpe o `sessionStorage` e faça login novamente
3. Verifique se o backend está retornando o token corretamente

### Problema: Erro 401 (Não autorizado)

**Solução:**
1. O token pode ter expirado - faça login novamente
2. Verifique se o token está sendo enviado nos headers das requisições
3. Verifique se o backend está validando o token corretamente

### Problema: Imagens não carregam

**Solução:**
1. Verifique se o backend está servindo as imagens corretamente
2. Verifique a URL base configurada em `ProductService.getImageUrl()`
3. Certifique-se de que as imagens estão na pasta `uploads/images/` do backend

### Problema: Aplicação não recarrega automaticamente

**Solução:**
1. Verifique se o servidor de desenvolvimento está rodando
2. Limpe o cache do navegador
3. Reinicie o servidor: `Ctrl+C` e depois `ng serve`

---

## 📝 Notas Importantes

### Armazenamento de Dados

- **Carrinho**: Armazenado localmente no `sessionStorage`
- **Autenticação**: Token e dados do usuário no `sessionStorage`
- **Produtos**: Buscados do backend via API

### Segurança

- Tokens são armazenados no `sessionStorage` (limpos ao fechar a aba)
- Todas as requisições autenticadas usam header `Authorization: Bearer <token>`
- Guards protegem rotas sensíveis
- Validação de formulários no frontend e backend

### Performance

- Lazy loading pode ser implementado para rotas grandes
- Imagens devem ser otimizadas antes do upload
- Considere implementar cache para produtos frequentemente acessados

---

## 📚 Recursos Adicionais

- [Documentação Angular](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)

---

## 👥 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
3. Push para a branch (`git push origin feature/nova-funcionalidade`)
4. Abra um Pull Request

---

---

# 🛍️ Geek Store - Frontend

> Online store specialized in geek products and collectibles (Funkos)

[![Angular](https://img.shields.io/badge/Angular-20.3.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Authentication and Authorization](#-authentication-and-authorization)
- [Application Routes](#-application-routes)
- [Services](#-services)
- [Development](#-development)
- [Production Build](#-production-build)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 About the Project

Geek Store is a web e-commerce application developed in Angular for selling geek products, especially Funkos and collectibles. The application offers complete purchase functionality, product management, and user administration.

### Main Features

- ✅ Authentication and authorization (users and administrators)
- ✅ Product catalog with images
- ✅ Shopping cart
- ✅ Purchase history
- ✅ Complete administrative panel
- ✅ User management
- ✅ Sales control
- ✅ Responsive interface

---

## 🛠️ Technologies

### Core
- **Angular** 20.3.0 - Main framework
- **TypeScript** 5.9.2 - Programming language
- **RxJS** 7.8.0 - Reactive programming

### UI/UX
- **Bootstrap** 5.3.8 - CSS framework
- **SCSS** - CSS preprocessor
- **ngx-toastr** 19.1.0 - Toast notifications

### Tools
- **Angular CLI** 20.3.9 - Command line tools
- **Karma** - Test runner
- **Jasmine** - Testing framework

---

## 📦 Prerequisites

Before starting, make sure you have installed:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (comes with Node.js)
- **Angular CLI** 20.3.9

### Installing Angular CLI

```bash
npm install -g @angular/cli@20.3.9
```

Verify installation:

```bash
ng version
```

---

## 🚀 Installation

1. **Clone the repository** (or navigate to the project folder):

```bash
cd geek_store_frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Verify backend is running**:

The frontend expects the backend to be running at `http://localhost:8080`. Make sure the backend server is active before starting the frontend.

---

## ⚙️ Configuration

### API URLs

API URLs are configured directly in the services. By default, the backend should be at:

```
http://localhost:8080
```

**Services and their URLs:**
- `LoginService`: `http://localhost:8080/auth`
- `ProductService`: `http://localhost:8080/product`
- `SaleService`: `http://localhost:8080/sale`
- `UserService`: `http://localhost:8080/user`

> **Note:** For production, it's recommended to move these URLs to environment variables.

---

## ▶️ Running the Project

### Development Mode

```bash
npm start
# or
ng serve
```

The application will be available at: **http://localhost:4200**

The development server automatically reloads when you modify files.

### Accessing the Application

1. Open your browser at `http://localhost:4200`
2. On the home page, you can:
   - Login (if you already have an account)
   - Create a new account
3. After login, you'll have access to user features
4. Users with `ADMIN` role will have access to the administrative panel

---

## 📁 Project Structure

```
geek_store_frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable components
│   │   │   ├── default-homepage/    # Default layout with navbar
│   │   │   ├── default-login-layout/ # Layout for login pages
│   │   │   └── primary-input/        # Custom input
│   │   ├── pages/               # Application pages
│   │   │   ├── admin/           # Administrative panel
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── home/            # Home page
│   │   │   ├── login/           # Login
│   │   │   ├── my-purchases/    # Purchase history (user)
│   │   │   ├── products/        # Product catalog
│   │   │   ├── purchase-details/# Purchase/sale details
│   │   │   ├── sales-management/# Sales management (admin)
│   │   │   ├── signup/          # Registration
│   │   │   ├── user/            # User profile
│   │   │   └── users-management/# User management (admin)
│   │   ├── services/            # Angular services
│   │   │   ├── admin-guard.ts   # Guard for admin routes
│   │   │   ├── auth-guard.ts    # Guard for authenticated routes
│   │   │   ├── cart.service.ts  # Cart management
│   │   │   ├── login.service.ts # Authentication
│   │   │   ├── product.service.ts # Products
│   │   │   ├── sale.service.ts  # Sales
│   │   │   └── user.service.ts  # Users
│   │   ├── types/               # TypeScript type definitions
│   │   │   ├── login-response.type.ts
│   │   │   ├── product.type.ts
│   │   │   ├── sale.type.ts
│   │   │   └── user.type.ts
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.routes.ts        # Application routes
│   │   └── app.ts               # Root component
│   ├── styles/                  # Global styles
│   │   └── variables.scss       # SCSS variables
│   └── styles.scss              # Global styles
├── public/                      # Static files
│   ├── logo.svg
│   ├── cart.svg
│   └── user.svg
├── angular.json                  # Angular configuration
├── package.json                  # Project dependencies
└── tsconfig.json                 # TypeScript configuration
```

---

## 🎨 Features

### For Authenticated Users

#### 1. **Product Catalog** (`/products`)
- View all available products
- Search products
- Add products to cart
- View images, prices, and descriptions

#### 2. **Shopping Cart** (`/cart`)
- View added items
- Update quantities
- Remove items
- View total price
- Clear cart

#### 3. **My Purchases** (`/purchases`)
- Complete purchase history
- View details of each purchase
- Date, total, and items information

#### 4. **User Profile** (`/user`)
- View personal information
- Edit name and email
- Change password
- Logout

### For Administrators

#### 1. **Administrative Panel** (`/admin`)
- Product management
- Create, edit, and delete products
- Image upload
- Stock control

#### 2. **User Management** (`/admin/users`)
- List all users
- Create new users
- Edit user information
- Change roles (USER/ADMIN)
- Delete users

#### 3. **Sales Management** (`/admin/sales`)
- View all system sales
- Filter sales by date
- Search sales
- Manually create new sales
- View sale details
- Delete sales

---

## 🔐 Authentication and Authorization

### Authentication System

The application uses **JWT (JSON Web Tokens)** for authentication. The token is stored in `sessionStorage` after login.

**Data stored in sessionStorage:**
- `auth-token`: JWT token
- `username`: User name
- `user-role`: User role (USER or ADMIN)
- `email`: User email

### Route Guards

#### `AuthGuard`
Protects routes that require authentication. Checks if a valid token exists in `sessionStorage`.

**Protected routes:**
- `/products`
- `/cart`
- `/user`
- `/purchases`
- `/purchases/:id`

#### `AdminGuard`
Protects routes that require administrator permission. Checks if the user has `ADMIN` role.

**Protected routes:**
- `/admin`
- `/admin/users`
- `/admin/sales`
- `/admin/sales/:id`

### Authentication Flow

1. User logs in or registers
2. Backend returns JWT token
3. Token is stored in `sessionStorage`
4. All subsequent requests include the token in the `Authorization: Bearer <token>` header
5. On logout, the token is removed from `sessionStorage`

---

## 🗺️ Application Routes

| Route | Component | Guard | Description |
|-------|-----------|-------|-------------|
| `/` | `HomeComponent` | - | Home page |
| `/login` | `LoginComponent` | - | Login page |
| `/signup` | `SignupComponent` | - | Registration page |
| `/products` | `Products` | `AuthGuard` | Product catalog |
| `/cart` | `CartComponent` | `AuthGuard` | Shopping cart |
| `/user` | `UserComponent` | `AuthGuard` | User profile |
| `/purchases` | `MyPurchasesComponent` | `AuthGuard` | Purchase history |
| `/purchases/:id` | `PurchaseDetailsComponent` | `AuthGuard` | Purchase details |
| `/admin` | `AdminPage` | `AdminGuard` | Administrative panel |
| `/admin/users` | `UsersManagementComponent` | `AdminGuard` | User management |
| `/admin/sales` | `SalesManagementComponent` | `AdminGuard` | Sales management |
| `/admin/sales/:id` | `PurchaseDetailsComponent` | `AdminGuard` | Sale details (admin) |

---

## 🔧 Services

### `LoginService`
Manages user authentication and registration.

**Methods:**
- `login(email: string, password: string)`: Performs login
- `signup(name: string, email: string, password: string)`: Registers new user

### `ProductService`
Manages product-related operations.

**Methods:**
- `getAllProducts()`: Lists all products
- `getProductById(id: string)`: Finds product by ID
- `createProduct(product: FormData)`: Creates new product
- `updateProduct(id: string, product: FormData)`: Updates product
- `deleteProduct(id: string)`: Deletes product
- `getImageUrl(imagePath: string | null)`: Returns image URL

### `SaleService`
Manages sales-related operations.

**Methods:**
- `getAllSales()`: Lists all sales (admin)
- `getSaleById(id: string)`: Finds sale by ID (admin)
- `getMyPurchases()`: Lists authenticated user's purchases
- `getMyPurchaseById(id: string)`: Finds purchase by ID (user)
- `createSale(sale: Partial<Sale>)`: Creates new sale (admin)
- `deleteSale(id: string)`: Deletes sale (admin)

### `UserService`
Manages user-related operations.

**Methods:**
- `getAllUsers()`: Lists all users (admin)
- `getUserById(id: string)`: Finds user by ID
- `createUser(user: {...})`: Creates new user (admin)
- `updateUser(id: string, user: Partial<User>)`: Updates user
- `deleteUser(id: string)`: Deletes user (admin)
- `updateUserRole(id: string, role: string)`: Updates user role (admin)

### `CartService`
Manages shopping cart locally.

**Methods:**
- `addToCart(product: Product, quantity: number)`: Adds product to cart
- `removeFromCart(productId: string)`: Removes product from cart
- `updateQuantity(productId: string, quantity: number)`: Updates quantity
- `getCartItems()`: Returns cart items
- `getTotalPrice()`: Calculates total price
- `clearCart()`: Clears cart
- `cart$`: Cart observable

---

## 💻 Development

### Generating New Components

```bash
ng generate component components/component-name
```

### Generating New Services

```bash
ng generate service services/service-name
```

### Component Structure

Each component has:
- `*.ts`: Component logic
- `*.html`: HTML template
- `*.scss`: Component styles
- `*.spec.ts`: Unit tests

### Code Standards

- **TypeScript**: Strong typing, use of interfaces/types
- **SCSS**: Variables in `src/styles/variables.scss`
- **Forms**: Angular Reactive Forms
- **HTTP**: HttpClient with RxJS observables
- **Notifications**: ngx-toastr for user feedback

---

## 🏗️ Production Build

### Development Build

```bash
ng build
```

### Production Build

```bash
ng build --configuration production
```

Compiled files will be in `dist/geek_store/`.

### Production Optimizations

The production build includes:
- Code minification
- Tree-shaking
- AOT (Ahead-of-Time) compilation
- Bundle optimization

---

## 🧪 Testing

### Run Unit Tests

```bash
npm test
# or
ng test
```

Tests are run with **Karma** and **Jasmine**. The browser will open automatically and tests will run in watch mode.

### Code Coverage

```bash
ng test --code-coverage
```

Coverage report will be generated in `coverage/`.

---

## 🐛 Troubleshooting

### Problem: CORS Error

**Solution:** Make sure the backend is configured to accept requests from the frontend (`http://localhost:4200`).

### Problem: Token not found

**Solution:**
1. Verify you logged in correctly
2. Clear `sessionStorage` and login again
3. Verify backend is returning the token correctly

### Problem: 401 Error (Unauthorized)

**Solution:**
1. Token may have expired - login again
2. Verify token is being sent in request headers
3. Verify backend is validating the token correctly

### Problem: Images don't load

**Solution:**
1. Verify backend is serving images correctly
2. Verify base URL configured in `ProductService.getImageUrl()`
3. Make sure images are in the backend's `uploads/images/` folder

### Problem: Application doesn't auto-reload

**Solution:**
1. Verify development server is running
2. Clear browser cache
3. Restart server: `Ctrl+C` and then `ng serve`

---

## 📝 Important Notes

### Data Storage

- **Cart**: Stored locally in `sessionStorage`
- **Authentication**: Token and user data in `sessionStorage`
- **Products**: Fetched from backend via API

### Security

- Tokens are stored in `sessionStorage` (cleared when tab closes)
- All authenticated requests use `Authorization: Bearer <token>` header
- Guards protect sensitive routes
- Form validation on frontend and backend

### Performance

- Lazy loading can be implemented for large routes
- Images should be optimized before upload
- Consider implementing cache for frequently accessed products

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)

---

## 👥 Contributing

1. Create a branch for your feature (`git checkout -b feature/new-feature`)
2. Commit your changes (`git commit -m 'Add new feature'`)
3. Push to the branch (`git push origin feature/new-feature`)
4. Open a Pull Request

---