#  Projeto Padaria

Esse é um sistema de compras de uma padaria online. Clientes podem navegar pelo catálogo de produtos, adicionar itens ao carrinho, finalizar pedidos e acompanhar o histórico de compras. Administradores têm acesso a um painel para gerenciar o estoque e atualizar o status dos pedidos.

---

## 🔗 Acesso ao Sistema (Deploy)

| Serviço | URL |
|---|---|
| **Frontend (Vercel)** | https://projeto-padaria-nu.vercel.app/ |
| **Documentação da API (Render)** | https://api-padaria-gcfu.onrender.com/docs |

> **Credenciais de teste:**
>
> | Perfil | E-mail | Senha |
> |---|---|---|
> | Cliente | cliente@padaria.com | 123 |
> | Administrador | admin@padaria.com | 123 |

---

## 📋 Descrição do Projeto

Este repositório contém o projeto de desenvolvimento de um Sistema de Padaria web. O objetivo é modernizar o atendimento e facilitar a compra dos clientes, permitindo que eles visualizem o catálogo de produtos, gerenciem um carrinho de compras, atualizem seus perfis e realizem pedidos de forma rápida e intuitiva, com todos os dados persistidos em banco de dados relacional.

---

## 🖥️ Telas Implementadas

- Home
- Catálogo de Produtos
- Detalhes do Produto
- Carrinho
- Checkout
- Login / Autenticação
- Cadastro
- Perfil do Usuário
- Histórico de Pedidos
- Painel do Administrador

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **Framework:** Next.js
- **Linguagem:** TypeScript
- **Deploy:** Vercel

### Back-end
- **Linguagem:** Python
- **Framework:** FastAPI
- **ORM:** SQLAlchemy
- **Autenticação:** JWT
- **Documentação de API:** Swagger / OpenAPI
- **Deploy:** Render

### Banco de Dados
- **Produção:** PostgreSQL hospedado no Neon
- **Local:** PostgreSQL local (desenvolvimento)

### Design e Modelagem
- **Prototipação:** Figma
- **Modelagem UML:** Lucidchart (Diagramas de Casos de Uso e de Classes)

---

## 📁 O que foi feito

- Prototipação em baixa fidelidade no Figma — [design](https://www.figma.com) e [protótipo](https://www.figma.com)
- API RESTful completa com FastAPI e autenticação via JWT
- Banco de dados PostgreSQL com tabelas de usuários, produtos, pedidos, carrinho e pagamentos
- Front-end em Next.js integrado à API, com todas as telas funcionais
- Painel administrativo para gerenciar produtos e status de pedidos
- Deploy do frontend na Vercel, backend no Render e banco de dados no Neon
- Diagramas de Classes e Casos de Uso (pasta `docs/diagramas`)
- Documentação interativa via Swagger UI em `/docs`
- Total de 10 telas visualmente agradáveis implementadas

---

## 🚀 Como executar o projeto

### Pré-requisitos

- Python 3.10+
- Node.js 18+
- PostgreSQL (apenas para execução local)
- Git

---

### Opção 1 — Usando o deploy remoto (mais simples)

Basta acessar o frontend na Vercel. Ele já está configurado para se comunicar com o backend no Render e o banco de dados no Neon — nenhuma configuração adicional é necessária.

👉 **https://projeto-padaria.vercel.app**

---

### Opção 2 — Execução local

#### 1. Clone o repositório

```bash
git clone <URL-do-repositorio>
cd projeto-padaria
```

#### 2. Configure o banco de dados

Crie um banco de dados PostgreSQL local chamado `padaria_db` e anote a senha do seu PostgreSQL.

#### 3. Configure e execute o Backend (FastAPI)

Abra um terminal na pasta do backend:

```bash
cd padaria-backend
```

Crie e ative o ambiente virtual:

```bash

python -m venv venv
venv\Scripts\activate

```

Instale as dependências:

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic python-jose[cryptography]
```

Configure a sua senha do banco de dados.

```
DATABASE_URL=postgresql://postgres:SUA_SENHA@localhost:5432/padaria_db
```

Suba o backend:

```bash
uvicorn main:app --reload
```

O backend estará disponível em `http://127.0.0.1:8000`. Acesse `http://127.0.0.1:8000/docs` para ver a documentação interativa da API.

> O banco é populado automaticamente na primeira execução com usuários e produtos de teste.

#### 4. Configure e execute o Frontend (Next.js)

Em um **segundo terminal** (deixe o backend rodando), volte para a raiz do projeto:

```bash
cd projeto-padaria
```

Instale as dependências e suba o frontend:

```bash
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

#### 5. Acesse o sistema

Com backend e frontend rodando, acesse:

```
http://localhost:3000
```

---

## 👥 Autores

- **João Pedro Holanda**
- **José Fernando Avelino**