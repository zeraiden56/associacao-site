# 📊 Projeto ASPDEMAT - Painel Administrativo + Site Público

**Data de geração:** 25/03/2025

---

## ✅ Visão Geral

Este projeto é o sistema web da **ASPDEMAT** contendo:

- 🏠 Site público com exibição de notícias.
- 🔐 Área administrativa com autenticação e CRUD de notícias.
- 📤 Upload de imagens.
- 📦 Backend em PHP + PostgreSQL.
- ⚛️ Frontend com React (Vite + Tailwind).
- 🐳 Infraestrutura em Docker + Compose.

---

## 🧱 Tecnologias Utilizadas

| Camada        | Tecnologia              |
|---------------|--------------------------|
| Backend       | PHP 8.2 (FPM)            |
| Banco de Dados| PostgreSQL 15           |
| Frontend      | React + Vite            |
| Estilização   | TailwindCSS             |
| Auth/Cripto   | pgcrypto + crypt()      |
| Deploy        | Docker + Docker Compose |
| Ambiente      | VPS via SSH             |

---

## 🔐 Autenticação

- Verificação com `pgcrypto` usando:
  ```sql
  SELECT * FROM admins 
  WHERE username = $1 AND password = crypt($2, password);

Admins são armazenados na tabela admins.

## 📁 Estrutura do Projeto

associacao-site/
├── backend-php/
│   ├── api.php
│   ├── db.php
│   ├── upload_noticia.php
├── frontend/
│   ├── public/
│   │   ├── index.html   ← título da aba configurado aqui
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── NovaNoticia.jsx
│   │   │   └── VerNoticias.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       └── PrivateRoute.jsx
│   └── .env           ← define VITE_API_URL
├── .env               ← define dados do banco
├── deploy.sh          ← automatiza build e subida
├── docker-compose.yml

## 🧩 Tabelas do Banco

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE noticias (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255),
  subtitulo TEXT,
  conteudo TEXT,
  imagem_url TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE logs_acessos (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES admins(id),
  ip VARCHAR(45),
  navegador TEXT,
  data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contatos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  mensagem TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## 🚀 Deploy

# Em qualquer terminal com acesso SSH:
./deploy.sh

Esse script realiza:

cd frontend
npm run build
cd ..
docker-compose down
docker-compose up --build -d

## ⚠️ Cuidados
Após npm run build, o Vite sobrescreve o dist/index.html com o título padrão.

✅ Para mudar o nome da aba, edite frontend/public/index.html

Use dois arquivos .env:

Um na raiz → banco de dados.

Outro no frontend → VITE_API_URL=http://SEU_IP.

## 🧠 Dicas para próximos devs (como o o3 mini)
Só acessa o painel (/admin/dashboard) se estiver logado com token (localStorage).

Frontend usa PrivateRoute para proteger rotas.

Para subir imagem: formulário faz upload e backend salva em /uploads.

Se algo der errado, cheque:

docker logs associacao-site_backend_1

Se .env do frontend foi buildado antes de subir

Recomendo rodar deploy.sh sempre após mudanças.


