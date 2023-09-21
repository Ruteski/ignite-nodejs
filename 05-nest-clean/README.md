<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Comandos
- yarn tsc --noEmit ??
- yarn add eslint @rocketseat/eslint-config -D
- yarn add prisma -D
- yarn add @prisma/client
- rodar: yarn prisma init
- yarn add @rocketseat/eslint-config -D
- yarn add bcryptjs
- yarn add -D @types/bcryptjs
- yarn add zod
- yarn add zod-validation-error
- yarn add @nestjs/config // acesso ao env 
- yarn add @nestjs/passport @nestjs/jwt passport passport-jwt
- yarn add -D vitest unplugin-swc @swc/core @vitest/coverage-v8 vite-tsconfig-paths
- yarn add -D dotenv
- yarn add -D supertest @types/supertest
- yarn add -D @faker-js/faker
- yarn add dayjs


## Gerando RSA private e public no wsl ubuntu
### Gerar a chave privada
- openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
- ou
- openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

### Gerar a chave pública
- openssl rsa -pubout -in private.key -out public.key -outform PEM
- ou
- openssl rsa -pubout -in private_key.pem -out public_key.pem -outform PEM

### Os itens abaixo rodar em um unico comando, concatenando com && no final de cada comando
#### JWT_PRIVATE_KEY=$(openssl base64 -in private.key -A) && JWT_PUBLIC_KEY=$(openssl base64 -in public.key -A) && echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> .env && echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> .env
### Converter a chave privada para base64
- JWT_PRIVATE_KEY=$(openssl base64 -in private.key -A)

### Converter a chave pública para base64
- JWT_PUBLIC_KEY=$(openssl base64 -in public.key -A)

### Adicionar as chaves ao arquivo .env
- echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> .env
- echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> .env

### Remover os arquivos de chave
- rm private.key public.key

