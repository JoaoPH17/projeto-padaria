# Projeto Padaria
Projeto full-stack (Front-end e Back-end) de um e-commerce para padarias.

## Descrição do Contexto do Projeto
Este repositório contém a **Entrega 02** do projeto de desenvolvimento de um Sistema de Padaria web. O objetivo do sistema é modernizar o atendimento e facilitar a compra dos clientes, permitindo que eles visualizem o catálogo de pães, bolos e cafés, gerenciem um carrinho de compras, atualizem seus perfis e realizem pedidos de forma rápida e intuitiva, com todos os dados persistidos em um banco de dados relacional.

## O que foi desenvolvido na Entrega 02
Cumprindo os requisitos da segunda etapa do projeto, o sistema evoluiu de um protótipo visual para uma aplicação funcional integrada:

* **Documentação Atualizada:**
  * Criação do **Diagrama de Classes**.
  * Atualização do **Diagrama de Casos de Uso**.
  * Arquivos PNG com os **Diagramas de Classes** e de **Casos de Uso** foram anexados na pasta **docs/diagramas** no repositório.
* **Back-end & API:**
  * Desenvolvimento de uma API RESTful completa implementando os casos de uso.
  * Endpoints documentados interativamente via **Swagger UI**.
  * Arquivo PNG com a **Swagger UI** foi anexado na pasta **docs/swaggerUI** no repositório.
* **Banco de Dados:**
  * Persistência de dados implementada utilizando **PostgreSQL**.
  * Modelagem de tabelas essenciais (usuarios, produtos, pedidos, itens_pedido, carrinho, ...).
  * Arquivos PNG com os dados da tabelas foram anexados na pasta **docs/tabelasBD** no repositório.
* **Front-end Integrado:**
  * Adaptação do Next.js para consumir os endpoints da API real, substituindo dados estáticos por requisições dinâmicas.

## O que já foi desenvolvido na Entrega 01

* **Prototipação em Baixa Fidelidade:**
  * Wireframes criados no Figma estruturando o esqueleto visual das páginas.<br>
  * [Link para o design](https://www.figma.com/design/duQLSR4kQgvqdHLNpeyX8Q/ProjetoPadaria?node-id=0-1&t=y89OXRHP66XlRrmJ-1) 
  * [Link para o protótipo](https://www.figma.com/proto/duQLSR4kQgvqdHLNpeyX8Q/ProjetoPadaria?node-id=0-1&t=y89OXRHP66XlRrmJ-1)

## Tecnologias e Ferramentas Utilizadas
**Front-end:**
* **Framework Web:** Next.js
* **Linguagem:** TypeScript / HTML / CSS

**Back-end e Dados:**
* **Linguagem:** Python
* **Framework API:** FastAPI
* **ORM:** SQLAlchemy
* **Banco de Dados:** PostgreSQL
* **Documentação de API:** Swagger / OpenAPI

**Design e Modelagem:**
* **Prototipação:** Figma
* **Modelagem UML:** Diagramas de Casos de Uso e Diagrama de Classes (Lucidchart)

## Telas Implementadas
1. **Home:** 
2. **Catálogo de Produtos:** 
3. **Detalhes do Produto:** 
4. **Carrinho:** 
5. **Login/Autenticação:** 
6. **Checkout:** 
7. **Perfil do Usuário** 
8. **Histórico de Pedidos**
9. **Casdastro**
10. **Página do Administrador**

## Como executar o projeto?

**Pré-requisitos**
 
Antes de começar, certifique-se de ter instalado na sua máquina:
 
- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)
---
 
## 1. Clonando o repositório
 
```bash
git clone <URL-do-repositorio>
cd projeto-padaria
```
 
---
 
## 2. Configurando o banco de dados
 
1. Crie um banco de dados chamado **`padaria_db`**.
2. No arquivo `models.py`, dentro da pasta do backend, coloque a sua senha do seu PostgreSQL local:
```python
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:SUA_SENHA@localhost:5432/padaria_db"
```
---
 
## 3. Executando o Backend (FastAPI)
 
Abra um terminal na pasta do backend:
 
```bash
cd padaria-backend
```
 
### 3.1. Criar e ativar o ambiente virtual
 
```bash
python -m venv venv
venv\Scripts\activate
```
 
### 3.2. Instalar as dependências
 
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic
```
 
### 3.3. Popular o banco com dados iniciais
 
```bash
python initial_data.py
```
 
Esse comando cria as tabelas e insere usuários e produtos de teste no banco `padaria_db`.
 
### 3.4. Subir o backend
 
```bash
uvicorn main:app --reload
```
 
O backend estará disponível em `http://127.0.0.1:8000`.
Você pode acessar `http://127.0.0.1:8000/docs` para ver a documentação interativa da API.
 
---
 
## 4. Executando o Frontend (Next.js)
 
Em um **outro terminal** (deixe o backend rodando), navegue até a pasta do frontend:
 
```bash
cd padaria-frontend
```
 
### 4.1. Instalar as dependências
 
```bash
npm install
```
 
### 4.2. Subir o frontend
 
```bash
npm run dev
```
 
O frontend estará disponível em `http://localhost:3000`.
 
---
 
## 5. Acessando o sistema
 
Com o backend e o frontend rodando, acesse no navegador:
 
```
http://localhost:3000/login
```
 
### Login do cliente teste
 
| Campo | Valor |
|-------|-------|
| E-mail | `cliente@padaria.com` |
| Senha | `123` |
 
---
 
## Autores
- José Fernando Avelino
- João Pedro Holanda