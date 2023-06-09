# 🍎 Daily Diet

Esta API foi desenvolvida para que o usuário possa gerenciar suas refeições de forma simples e prática.

<p align="center">
  <img src="https://img.shields.io/static/v1?logo=Fastify&logoColor=000000&label=Fastify&message=Fastify&color=000000" alt="Logo Fastify" />
  <img src="https://img.shields.io/static/v1?logo=Node.js&logoColor=339933&label=Node.js&message=Node.js&color=339933" alt="Logo Node.js" />
  <img src="https://img.shields.io/static/v1?logo=SQLite&logoColor=003B57&label=SQLite&message=SQLite&color=003B57" alt="Logo SQLite" />
  <img src="https://img.shields.io/static/v1?logo=PostgreSQL&logoColor=4169E1&label=PostgreSQL&message=PostgreSQL&color=4169E1" alt="Logo PostgreSQL" />
  <img src="https://img.shields.io/static/v1?logo=Vitest&logoColor=6E9F18&label=Vitest&message=Vitest&color=6E9F18" alt="Logo Vitest" />
</p>

---

## 🧭 Como rodar o projeto

Instale as dependências

```bash
npm install
```

Crie e preencha as variáveis de ambiente no arquivo `.env`

```bash
cp .env.example .env
```

Execute as migrations

```bash
npm run knex -- migrate:latest
```

Rode o projeto

```bash
npm run dev
```

---

## 🎯 Funcionalidades da aplicação

### RF

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações (_As refeições devem ser relacionadas a um usuário._):
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência por dia de refeições dentro da dieta

### RN

- [x] Deve ser possível identificar o usuário entre as requisições
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

---

## 🔍 Contexto

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

- [Link Daily Diet Figma](https://www.figma.com/community/file/1218573349379609244/Daily-Diet)

---

