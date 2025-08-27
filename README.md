<h1 align="center"> API Node.js </h1>

Este projeto é uma API RESTful desenvolvida em Node.js, utilizando Fastify como framework web, Drizzle ORM para acesso ao banco de dados PostgreSQL, autenticação JWT, validação com Zod, e deploy preparado para ambientes modernos como Docker e Fly.io.
O objetivo é fornecer uma base robusta para aplicações backend modernas, com testes automatizados, cobertura de código e práticas recomendadas de versionamento e deploy.



---

# Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no backend.
- **Fastify**: Framework web rápido e eficiente para APIs.
- **Drizzle ORM**: ORM moderno para TypeScript, com migrations SQL versionadas.
- **PostgreSQL**: Banco de dados relacional robusto.
- **Zod**: Validação de dados e schemas.
- **jsonwebtoken**: Geração e validação de tokens JWT.
- **argon2**: Hash de senhas seguro.
- **Vitest**: Testes automatizados e cobertura de código.
- **Docker**: Containerização para desenvolvimento e produção.
- **Fly.io**: Deploy em nuvem global.
- **Neon**: Banco de dados PostgreSQL gerenciado na nuvem.



---

## Pré-requisitos

- **[Git](https://git-scm.com/downloads)**
- **[Node.js](https://nodejs.org/en/download) (versão 18 ou superior)**
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**



---

# Clone o repositório
```
git clone https://github.com/rafaelstx/api-node.git
cd api-node
```

# Instale as dependências
```
npm install
```

# Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
JWT_SECRET="sua-chave-secreta-aqui"
```

# Suba o banco de dados local com Docker
```
docker-compose up -d
```

# Gere e aplique as migrations
```
npm run db:generate
npm run db:migrate
```

# Rode a aplicação
```
npm run dev
```
A API estará disponível em [http://localhost:3333](http://localhost:3333).

# Como rodar os testes
```
npm run test
```



---

# Principais Funcionalidades
- **CRUD de cursos**: criar, listar, buscar por ID.
- **Autenticação JWT**: login e rotas protegidas.
- **Validação de dados**: schemas Zod em todas as rotas.
- **Migrations versionadas**: Drizzle ORM gera e aplica migrations SQL.
- **Testes automatizados**: cobertura de código com Vitest.
- **Seed de banco**: script para popular dados iniciais.
- **Pronto para produção**: Dockerfile, deploy no Fly.io, variáveis seguras.



---

## Estrutura do Projeto

```
api-node/
├── src/
│   ├── database/
│   │   ├── client.ts
│   │   ├── schema.ts
│   │   └── seed.ts
│   └── routes/
│       ├── create-course.ts
│       ├── get-courses.ts
│       ├── get-course-by-id.ts
│       └── login.ts
├── drizzle/
<<<<<<< HEAD
│   ├── 0000_nome_migration.sql   # Migrations SQL geradas pelo Drizzle
│   └── ...                       # Outras migrations
├── .env                          # Variáveis de ambiente (NUNCA subir para o GitHub)
├── .gitignore                    # Arquivos/pastas ignorados no versionamento
├── docker-compose.yml            # Sobe o banco de dados localmente via Docker
├── Dockerfile                    # Build da aplicação para produção
├── package.json                  # Dependências e scripts do projeto
├── README.md                     # Documentação do projeto

└── fly.toml                      # Configuração de deploy no Fly.io
=======
│   ├── 0000_nome_migration.sql
│   └── ...
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
└── fly.toml
```

- `client.ts`: Conexão e configuração do Drizzle ORM
- `schema.ts`: Definição das tabelas e enums do banco
- `seed.ts`: Script para popular o banco com dados iniciais
- `create-course.ts`: Rota para criar cursos
- `get-courses.ts`: Rota para listar cursos
- `get-course-by-id.ts`: Rota para buscar curso por ID
- `login.ts`: Rota de autenticação/login
- `drizzle/*.sql`: Migrations SQL geradas pelo Drizzle
- `.env`: Variáveis de ambiente (**NUNCA subir para o GitHub**)
- `.gitignore`: Arquivos/pastas ignorados no versionamento
- `docker-compose.yml`: Sobe o banco de dados localmente via Docker
- `Dockerfile`: Build da aplicação para produção
- `package.json`: Dependências e scripts do projeto
- `README.md`: Documentação do projeto
- `fly.toml`: Configuração de deploy no Fly.io
>>>>>>> 47923b1 (README update)
