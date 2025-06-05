# CaminhoDev Backend

Bem-vindo ao backend da plataforma **CaminhoDev**! Este sistema é construído com **Node.js**, **Fastify**, **Prisma** e **PostgreSQL**, e foi projetado para ser robusto, escalável e fácil de manter.

## ✨ Features

* **Autenticação e Gerenciamento de Usuários**: Sistema completo de cadastro, login (com JWT e Cookies) e gerenciamento de perfis e permissões (usuário e administrador).
* **Gestão de Conteúdo Educacional**: CRUD completo para Matérias (Subjects), Tópicos (Topics) e Conteúdos (Contents).
* **Acompanhamento de Progresso**: Rastreia o progresso de estudo dos usuários por matéria e tópico, além de registrar o último acesso.
* **Estatísticas de Usuário**: Fornece dados sobre o desempenho do usuário, como tempo de estudo, matérias e tópicos concluídos.
* **Conteúdos Salvos**: Permite que os usuários salvem conteúdos para visualização posterior.

## 🚀 Tecnologias Utilizadas

Este projeto utiliza uma variedade de tecnologias modernas para garantir uma base sólida e uma ótima experiência de desenvolvimento.

| Categoria              | Tecnologia                                                                                                                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Backend** | Node.js, Fastify, TypeScript                                                                                                                                                                            |
| **Banco de Dados** | PostgreSQL                                                                                                 |
| **ORM** | Prisma                                                                                                               |
| **Containerização** | Docker, Docker Compose                                                                                      |
| **Testes** | Jest, ts-jest                                                                                                 |
| **Linting & Formatação** | ESLint, Prettier, Lint-Staged, Husky                                                                      |
| **Validação** | Zod                                                                                                               |
| **Autenticação** | JWT, Bcrypt                                                                                                     |

<br>

## ⚙️ Configuração do Ambiente

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento.

### Pré-requisitos

* [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/) (para desenvolvimento local e execução de scripts)
* [Git](https://git-scm.com/)

### Iniciando o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:Engenharia-II/backend.git
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie os containers Docker:**
    ```bash
    docker-compose up -d
    ```
    Este comando irá iniciar:
    * O serviço da **API** na porta `3333`.
    * O banco de dados **PostgreSQL** na porta `5432`.
    * A execução automática das migrations e seeding do banco.

4.  **Popule o banco com dados iniciais (opcional):**
    Para preencher o banco com matérias, tópicos e conteúdos de exemplo, execute:
    ```bash
    npm run db:populate
    ```
   

## 📜 Scripts Disponíveis

O projeto conta com diversos scripts para facilitar o desenvolvimento, definidos no arquivo `package.json`:

| Comando              | Descrição                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------- |
| `npm run dev`        | Inicia o servidor em modo de desenvolvimento com hot-reload (`tsx`).                               |
| `npm run build`      | Compila o código TypeScript para JavaScript (`dist/`).                                               |
| `npm run start`      | Inicia o servidor em modo de produção a partir dos arquivos compilados.                            |
| `npm run lint`       | Executa o ESLint para verificar a qualidade do código.                                             |
| `npm run lint:fix`   | Corrige automaticamente os problemas de lint que forem possíveis.                                  |
| `npm run format`     | Formata todo o código do projeto com o Prettier.                                                   |
| `npm test`           | Roda a suíte de testes com o Jest.                                                                 |
| `npm run prisma:migrate` | Cria uma nova migration do Prisma com base nas alterações do schema.                               |
| `npm run prisma:deploy`  | Aplica as migrations pendentes no banco de dados.                                                  |
| `npm run prisma:studio`| Abre a interface visual do Prisma para gerenciamento do banco.                                     |
| `npm run prisma:seed`| Executa o script de seeding (`prisma/seed.ts`) para popular dados essenciais (roles, admin).        |
| `npm run db:populate`| Roda o script para popular o banco com dados de matérias e conteúdos (`prisma/scripts/populate.js`). |

<br>

## 🗄️ Gestão do Banco de Dados

O projeto utiliza o **Prisma** como ORM. As migrations são gerenciadas para garantir a consistência do schema do banco.

* **Schema**: A definição do banco de dados está no arquivo `prisma/schema.prisma`.
* **Migrations**: Para criar uma nova migration após alterar o `schema.prisma`, use:
    ```bash
    docker-compose exec api npx prisma migrate dev --name <nome_da_migration>
    ```
* **Prisma Studio**: Para visualizar e editar os dados diretamente no banco de maneira gráfica:
    ```bash
    docker-compose exec api npx prisma studio
    ```
    O Studio estará acessível em `http://localhost:5555`.

## 📚 Rotas da API

A documentação completa e interativa da API está disponível em `http://localhost:3333/docs` quando o servidor está rodando. Abaixo está um resumo das rotas disponíveis.

*Observação: Rotas marcadas com 🔒 requerem autenticação.*

---

### Autenticação (`/sessions`)

| Método | Rota         | Descrição                                         | Auth |
| :----- | :----------- | :------------------------------------------------ | :--- |
| `POST` | `/sign-up`   | Cria uma nova conta de usuário.                   | 🔓    |
| `POST` | `/login`     | Autentica um usuário e retorna um token JWT.      | 🔓    |
| `POST` | `/logout`    | Limpa o cookie de autenticação do usuário.        | 🔒    |

---

### Usuários (`/users`)

| Método   | Rota               | Descrição                                      | Auth |
| :------- | :----------------- | :--------------------------------------------- | :--- |
| `GET`    | `/get-by-id`       | Retorna os dados do usuário autenticado.       | 🔒    |
| `GET`    | `/list-all`        | Lista todos os usuários (apenas admin).        | 🔒    |
| `PUT`    | `/update`          | Atualiza as informações do usuário autenticado. | 🔒    |
| `DELETE` | `/delete/:id`      | Deleta um usuário (apenas admin).              | 🔒    |
| `PUT`    | `/last-app-access` | Atualiza a data do último acesso do usuário.   | 🔒    |
| `GET`    | `/statistics`      | Retorna as estatísticas de estudo do usuário.  | 🔒    |

---

### Matérias (`/subjects`)

| Método   | Rota             | Descrição                                                        | Auth |
| :------- | :--------------- | :--------------------------------------------------------------- | :--- |
| `POST`   | `/create`        | Cria uma nova matéria (apenas admin).                            | 🔒    |
| `GET`    | `/`              | Lista todas as matérias.                                         | 🔒    |
| `GET`    | `/:id`           | Retorna uma matéria específica pelo ID.                          | 🔒    |
| `GET`    | `/:id/details`   | Retorna os detalhes de uma matéria, incluindo tópicos e progresso. | 🔒    |
| `GET`    | `/:id/topics`    | Lista todos os tópicos de uma matéria.                           | 🔓    |
| `PUT`    | `/:id`           | Atualiza uma matéria (apenas admin).                             | 🔒    |
| `DELETE` | `/:id`           | Deleta uma matéria (apenas admin).                               | 🔒    |
| `GET`    | `/progress`      | Lista todas as matérias com o progresso do usuário.              | 🔒    |

---

### Tópicos (`/topics`)

| Método   | Rota           | Descrição                             | Auth |
| :------- | :------------- | :------------------------------------ | :--- |
| `POST`   | `/create`      | Cria um novo tópico (apenas admin).   | 🔒    |
| `GET`    | `/`            | Lista todos os tópicos.               | 🔒    |
| `GET`    | `/:id`         | Retorna um tópico específico pelo ID. | 🔒    |
| `GET`    | `/:id/contents`| Lista todos os conteúdos de um tópico.| 🔒    |
| `PUT`    | `/:id`         | Atualiza um tópico (apenas admin).    | 🔒    |
| `DELETE` | `/:id`         | Deleta um tópico (apenas admin).      | 🔒    |

---

### Conteúdos (`/contents`)

| Método   | Rota      | Descrição                               | Auth |
| :------- | :-------- | :-------------------------------------- | :--- |
| `POST`   | `/create` | Cria um novo conteúdo (apenas admin).   | 🔒    |
| `GET`    | `/`       | Lista todos os conteúdos.               | 🔒    |
| `GET`    | `/:id`    | Retorna um conteúdo específico pelo ID. | 🔒    |
| `PUT`    | `/:id`    | Atualiza um conteúdo (apenas admin).    | 🔒    |
| `DELETE` | `/:id`    | Deleta um conteúdo (apenas admin).      | 🔒    |

---

### Progresso e Acessos

| Método   | Rota          | Prefixo             | Descrição                                       |
| :------- | :------------ | :------------------ | :---------------------------------------------- |
| `PUT`    | `/`           | `/subject-study`    | Atualiza o status de estudo de uma matéria.     |
| `GET`    | `/`           | `/subject-study`    | Lista o progresso de estudo das matérias do usuário.|
| `DELETE` | `/`           | `/subject-study`    | Remove o progresso de estudo de uma matéria.    |
| `PUT`    | `/`           | `/topic-study`      | Atualiza o status de estudo de um tópico.       |
| `GET`    | `/`           | `/topic-study`      | Lista o progresso de estudo dos tópicos do usuário. |
| `DELETE` | `/`           | `/topic-study`      | Remove o progresso de estudo de um tópico.      |
| `PUT`    | `/`           | `/subject-access`   | Atualiza o último acesso a uma matéria.         |
| `GET`    | `/`           | `/subject-access`   | Lista os últimos acessos às matérias.           |
| `PUT`    | `/`           | `/topic-access`     | Atualiza o último acesso a um tópico.           |
| `GET`    | `/`           | `/topic-access`     | Lista os últimos acessos aos tópicos.           |
| `POST`   | `/save`       | `/saved-content`    | Salva um conteúdo para o usuário.               |
| `DELETE` | `/remove`     | `/saved-content`    | Remove um conteúdo salvo.                       |
| `GET`    | `/by-user-id` | `/saved-content`    | Lista os conteúdos salvos pelo usuário.         |

*Todas as rotas de progresso e acesso são autenticadas* 🔒.

## 📁 Estrutura do Projeto

```
.
├── prisma/               # Schema, migrations e scripts do banco
│   ├── migrations/       # Arquivos de migration SQL
│   ├── scripts/          # Scripts para popular o banco
│   └── schema.prisma     # Definição do schema do Prisma
├── src/                  # Código-fonte da aplicação
│   ├── application/      # Lógica de aplicação (controllers, services, routes)
│   ├── domain/           # Entidades, interfaces e validações (Zod)
│   ├── infrastructure/   # Configurações de baixo nível (DB, servidor, plugins)
│   └── tests/            # Testes automatizados
├── .eslintrc.json        # Configurações do ESLint
├── docker-compose.yml    # Arquivo de configuração do Docker Compose
├── Dockerfile            # Definição do container da API
├── package.json          # Dependências e scripts do projeto
└── tsconfig.json         # Configurações do TypeScript
```

## 🔧 Solução de Problemas

1.  **Problemas de conexão com o banco:**
    ```bash
    docker-compose restart postgres
    ```

2.  **Resetar o banco de dados (CUIDADO: todos os dados serão perdidos):**
    ```bash
    docker-compose down -v
    docker-compose up -d
    ```

3.  **Visualizar logs dos serviços:**
    ```bash
    docker-compose logs -f
    ```
4.  **Verificar o status das migrations:**
    ```bash
    docker-compose exec api npx prisma migrate status
    ```
