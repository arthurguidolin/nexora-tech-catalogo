# 🛒 Nexora Tech — E-commerce & Web API Full-Stack

![.NET 10](https://img.shields.io/badge/.NET%2010.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![EF Core](https://img.shields.io/badge/Entity%20Framework%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

Plataforma e-commerce full-stack moderna de alta performance voltada para o catálogo e venda de hardware e periféricos premium. O projeto combina um frontend modular em Vanilla JavaScript, HTML5 e Vanilla CSS a uma Web API RESTful construída em **.NET 10** e **Entity Framework Core**, com persistência de dados no **PostgreSQL**.

---

## 🏛️ Visão Geral e Arquitetura

O sistema é estruturado em uma arquitetura limpa de 3 camadas (*3-tier*):

```
┌─────────────────────────────────────────────────────────┐
│              Frontend Client (SPA Modular)              │
│       HTML5 • Vanilla CSS • JavaScript (ES6+ Async)     │
└────────────────────────────┬────────────────────────────┘
                             │ REST API / JSON (CORS)
┌────────────────────────────▼────────────────────────────┐
│                  Backend Web API (.NET 10)              │
│       ASP.NET Core • Entity Framework Core • Swagger     │
└────────────────────────────┬────────────────────────────┘
                             │ Npgsql / SQL Driver
┌────────────────────────────▼────────────────────────────┐
│               Banco de Dados (PostgreSQL)               │
│       Tabelas: Products, Users, CartItems, Orders...    │
└─────────────────────────────────────────────────────────┘
```

* **Frontend**: Rápido, leve e responsivo. Desenvolvido sem frameworks pesados, aplicando manipulação dinâmica do DOM, componentes customizados e animações fluidas.
* **Backend**: Web API RESTful construída em .NET 10 com padrão Controllers assíncronos, injeção de dependência e documentação interativa OpenAPI/Swagger UI.
* **Persistência**: PostgreSQL com suporte a Migrations EF Core e suporte a **User Secrets** para credenciais seguras.

---

## ✨ Funcionalidades em Destaque

* 📦 **Catálogo de Produtos Dinâmico**: 24 produtos categorizados em 6 segmentos (*GPUs, CPUs, Monitores, Teclados, Mouses e Acessórios*) com preço, desconto, avaliação, especificações e imagens, populados automaticamente no PostgreSQL via `DbInitializer`.
* 👤 **Autenticação & Gestão de Usuários**: Fluxo de cadastro e login de clientes integrado via Web API (`/api/users`) com persistência relacional.
* 🛒 **Carrinho de Compras Sincronizado**: Adição, alteração de quantidade e remoção de itens sincronizados em tempo real com o banco de dados via `/api/cart`.
* 💳 **Checkout & Gestão de Pedidos**: Processamento de checkout com validação de endereço, seleção de pagamento (Pix, Boleto, Cartão) e geração de pedidos com identificadores únicos (ex: `NEX-982145`).
* 🔍 **Filtros e Busca**: Filtro dinâmico por categoria, busca textual instantânea por nome/descrição e ordenação por preços e relevância.

---

## 🔌 Documentação da Web API (Endpoints REST)

A API disponibiliza endpoints RESTful documentados no Swagger UI (`http://localhost:5194/swagger`):

| Recurso | Método HTTP | Rota | Descrição |
| :--- | :--- | :--- | :--- |
| **Produtos** | `GET` | `/api/products` | Lista todos os produtos cadastrados |
| | `GET` | `/api/products/{id}` | Busca produto específico por ID |
| | `POST` | `/api/products` | Cadastra um novo produto |
| | `PUT` | `/api/products/{id}` | Atualiza dados de um produto |
| | `DELETE` | `/api/products/{id}` | Remove um produto |
| **Usuários** | `GET` | `/api/users` | Lista todos os usuários cadastrados |
| | `GET` | `/api/users/{id}` | Busca usuário por ID (Guid) |
| | `POST` | `/api/users` | Registra novo usuário |
| | `PUT` | `/api/users/{id}` | Atualiza dados do usuário |
| | `DELETE` | `/api/users/{id}` | Remove um usuário |
| **Carrinho** | `GET` | `/api/cart` | Obtém itens do carrinho de compras |
| | `POST` | `/api/cart` | Adiciona um item ao carrinho |
| | `PUT` | `/api/cart/{id}` | Atualiza quantidade do item |
| | `DELETE` | `/api/cart/{id}` | Remove um item do carrinho |
| **Pedidos** | `GET` | `/api/orders` | Lista todos os pedidos realizados |
| | `GET` | `/api/orders/{id}` | Detalhes de um pedido específico |
| | `POST` | `/api/orders` | Registra novo pedido com itens |
| | `DELETE` | `/api/orders/{id}` | Cancela/exclui um pedido |

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
* [.NET 10 SDK](https://dotnet.microsoft.com/download)
* [PostgreSQL](https://www.postgresql.org/) rodando localmente (ou via Docker)
* Git

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/arthurguidolin/nexora-tech-catalogo.git
   cd nexora-tech-catalogo
   ```

2. **Configurar a Connection String do PostgreSQL:**
   Navegue até a pasta da API:
   ```bash
   cd backend/Nexora.Api
   ```
   Configure a string de conexão no **User Secrets** do .NET (ou atualize em `appsettings.json`):
   ```bash
   dotnet user-secrets set "ConnectionStrings:NexoraDb" "Host=localhost;Database=nexora_db;Username=postgres;Password=SUA_SENHA"
   ```

3. **Executar as Migrations do Entity Framework Core:**
   ```bash
   dotnet ef database update
   ```

4. **Iniciar a Web API (.NET 10):**
   ```bash
   dotnet run
   ```
   *A API estará ativa em `http://localhost:5194` (Swagger disponível em `http://localhost:5194/swagger`).*

5. **Abrir o Frontend:**
   Abra o arquivo `index.html` na raiz do repositório em seu navegador preferido (ou utilize a extensão *Live Server* do VS Code).

---

## 👤 Autor

Desenvolvido por **Arthur Guidolin**.

* **LinkedIn**: [linkedin.com/in/arthurguidolin](https://linkedin.com/in/arthurguidolin)
* **GitHub**: [github.com/arthurguidolin](https://github.com/arthurguidolin)