# 📊 Projeto ASPDEMAT - Painel Administrativo + Site Público

**Data de geração:** `25/03/2025`

---

## ✅ Visão Geral

Sistema web da **ASPDEMAT**, com:

- 🏠 **Site público** com exibição de notícias
- 🔐 **Área administrativa** com login + CRUD de notícias
- 🖼️ **Upload de imagens** diretamente no backend
- ⚙️ Backend em **PHP + PostgreSQL**
- ⚛️ Frontend em **React (Vite + Tailwind)**
- 🐳 Deploy via **Docker + Docker Compose**

---

## 🧱 Tecnologias Utilizadas

| Camada        | Tecnologia              |
|---------------|--------------------------|
| Backend       | PHP 8.2 (FPM)            |
| Banco de Dados| PostgreSQL 15           |
| Frontend      | React + Vite            |
| Estilização   | TailwindCSS             |
| Auth/Cripto   | `pgcrypto` + `crypt()`  |
| Deploy        | Docker + Docker Compose |
| Ambiente      | VPS via SSH             |

---

## 🔐 Autenticação

Admin login seguro usando **`pgcrypto`**:

```sql
SELECT * FROM admins 
WHERE username = $1 
AND password = crypt($2, password);
```

---

## 📁 Estrutura do Projeto

```
associacao-site/
├── backend-php/
│   ├── api.php
│   ├── db.php
│   ├── upload_noticia.php
│   └── index.php
│
├── frontend/
│   ├── public/
│   │   └── index.html        ← título da aba configurado aqui
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
│   └── .env                 ← define VITE_API_URL
│
├── .env                     ← dados do banco de dados (NÃO subir no Git)
├── deploy.sh                ← automatiza build e subida
├── docker-compose.yml       ← orquestra os containers
└── README.md
```

---

## 🧩 Tabelas do Banco

```sql
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
```

---

## 🚀 Deploy Rápido

```bash
./deploy.sh
```

Esse script executa:

```bash
cd frontend
npm run build
cd ..
docker-compose down
docker-compose up --build -d
```

---

## ⚠️ Cuidados

- O Vite sobrescreve `dist/index.html` após build.
- Para alterar o título da aba do navegador, edite:  
  `frontend/public/index.html`

- Use dois `.env` separados:
  - `/.env` → Dados do banco
  - `/frontend/.env` → `VITE_API_URL=http://SEU_IP`

---

## 💡 Dicas para quem for assumir depois (ex: `o3 mini`)

- A dashboard só é acessível com token no `localStorage`.
- A rota `/admin/dashboard` é protegida por `PrivateRoute`.
- Upload de imagem vai para `/uploads` no backend.
- Se algo der errado, cheque:
  ```bash
  docker logs associacao-site_backend_1
  ```

- Garanta que `.env` do frontend foi buildado com:
  ```bash
  npm run build
  ```

- Sempre rode o `./deploy.sh` após alterações.

---

> Projeto mantido com ❤️ e muito café.
