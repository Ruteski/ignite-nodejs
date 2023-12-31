# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);


### Comandos
- npm i typescript @types/node tsx tsup -D
- npx tsc --init
  - target do tsconfig para es2020
- npm i fastify
- npm i dotenv
  - criar src/env/index.ts
- npm i zod
- npm i eslint @rocketseat/eslint-config -D
  - criar na raiz .eslintrc.json .eslintignore
- configurar aliases -> no tsconfig -> baseURL -> path
- npm i prisma -D
  - npx prisma init 
  - criar a primeira tabela com o id
  - npx prisma generate 
  - npx prisma -h
- npm i @prisma/client
- docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432  bitnami/postgresql
  - docker ps
  - docker ps -a
  - docker start nome/id
  - docker stop nome/id
  - docker rm nome
  - docker logs nome
- depois de configurado DATABSE_URL rodar npx prisma migrate dev
- npx prisma studio
- docker-componse.yml
- docker compose up/down -d - cria e deleta
- docker compose stop - para o docker componse
- npm i bcryptjs @types/bcryptjs
- npm i @types/bcryptjs -D
- npm i vitest vite-tsconfig-paths @vitest/ui -D
  - criar na raiz vite.config.ts 
- npm i dayjs 
- npm i @fastify/jwt
- criar pasta "vitest-environment-prisma" dentro da pasta prisma da raiz do projeto
  - dentro dessa pasta executar: npm init -y
  - executar: npm link
  - executar: npm link vitest-environment-prisma
- npm i -D npm-run-all
- npm i -D supertest @types/supertest
- npm i @fastify/cookie