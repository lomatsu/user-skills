# user-skills
Este repositório é um MVP criado para gerir skills de usuários


Ambientes:

- Local - [localhost:3000](http://localhost:3333/)


## Contents

- [user-skills](#user-skills)
	- [Contents](#contents)
	- [Structure](#structure)
	- [Usage](#usage)

## Structure

Projeto escrito utilizando [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/) and [Typescript](https://www.typescriptlang.org/).

```
src
  |_ bin
  |_ common
  |     |_ middlewares
  |_ config
  |_ database
  |     |_ helps
  |     |_ migrations
  |     |_ model
  |     |_ seeds
  |_ purchase
  |_ repositories
  |_ routes
  |_ skill
  |_ user
  |_ view-model
  app.ts
```

**Docker**

Rodando o banco localmente com docker

```bash

docker-compose up -d

```

## Usage

```bash


# build

npm run build

# run develop

npm run start:dev

# run develop migrations

npm run knex:migrate

```

