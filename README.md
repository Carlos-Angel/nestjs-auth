## Description
sistema de autenticación con nestjs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## database

```bash
# database with docker
docker run --name mysql-nestjs-auth -p 5000:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=database -d mysql:8.0.26

# stop container
docker stop mysql-nestjs-auth

# run container
docker start mysql-nestjs-auth

```