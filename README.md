# Game Tracker - Back-end

Este é o repositório do back-end do projeto Game Tracker. O Game Tracker é uma aplicação desenvolvida em Node.js, TypeScript, Prisma, Postgres e Redis. O objetivo do projeto é ajudar os usuários a gerenciar os jogos que eles pretendem jogar ou já jogaram.

## Configuração

Antes de executar o back-end, certifique-se de ter as seguintes dependências instaladas:

- Node.js: [Download Node.js](https://nodejs.org)
- PostgreSQL: [Download PostgreSQL](https://www.postgresql.org)
- Redis: [Download Redis](https://redis.io/)

Siga as etapas abaixo para configurar e executar o back-end:

1. Clone o repositório:

```
git clone https://github.com/hignicao/game-tracker-back.git
```

2. Navegue até o diretório do projeto:

```
cd game-tracker-back
```

3. Instale as dependências:
```
npm install
```


4. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:

```
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DATABASE=
DATABASE_URL=
REDIS_URL=
SECRET_JWT=
IGDB_API_KEY=
IGDB_CLIENT_ID=
```
Para conseguir uma chave da Api IGDB, você precisa fazer o cadastro no site: https://api-docs.igdb.com/#account-creation

5. Execute as migrações e seed no banco de dados:
```
npm run dev:migration:run
npm run dev:seed
```

Isso irá executar as migrações do Prisma e criar as tabelas necessárias no banco de dados e também popula-las com as informações necessárias para rodar a aplicação.

6. Inicie o servidor:
```
npm run dev
```
O servidor será executado em http://localhost:5000.

## Rotas
Aqui estão as rotas disponíveis no back-end:

### Health:
- GET '/health': Verifica se a aplicação está de pé.

### Auth:
- POST '/auth/sign-in': Faz Login.

### Users:
- GET '/users/profile/:username': Retorna informações do usuario requisitado.
- POST '/users': Cadastra novo usuário.
### Games:
- GET '/games/trending': Retorna os jogos trending do momento.
- GET '/games/info/:id': Retorna informações sobre o jogo requisitado.
- GET '/games/search': Retorna resultado da busca passando o nome como query.
### Collection:
- GET '/collection': Retorna informações simplificadas sobre a coleção de jogos passando o token do usuário logado.
- PUT '/collection/update-collection': Atualiza status do jogo na sua coleção.
- DELETE '/collection/:gameId': Remove jogo da sua coleção.

## Licença
Este projeto está licenciado sob a Licença Mozilla Public License Version 2.0.
