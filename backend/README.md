# Dan's Car Barn Backend

This the backend REST API for Dan's Car Barn, built on [Express.js](https://expressjs.com/).

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```

### Compile for Production

```sh
yarn run build
```

### Run Production Build

```sh
yarn run start
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn run lint
```

## Environment Variables

The `.env` file should be located in the `backend/src/` directory. The variables take the form of:

```
NAME=VALUE
```
Make sure that you do not surround the values in quotes!


## DB Setup

Install the correct version of [postgresql](https://www.postgresql.org) for your operating system.
Ensure that it is running, and create a DB. Find the connection information and place the database url in the `DATABASE_URL` variable in the `.env` file. The name of the database should be set as the `DATABASE_NAME` variable in the `.env` file.

### Other Environment Variables

For the authentication system to work, it is necessary to define a `JWT_KEY` variable in the `.env` file. This doesn't have to be anything specific, just a set of letters and numbers.
