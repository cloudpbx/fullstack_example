# Serverless REST API with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Setup

Note: Your node version must be v15.4 or below, or POST requests will not work with serverless offline.

```bash
npm i -g serverless@2.72.3
npm install
serverless dynamodb install (or to use a persistent docker dynamodb instead, open a new terminal: cd ./dynamodb && docker-compose up -d)
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Usage

You can create, retrieve, update, or delete todos with the following commands:

### Create a Language

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/languages --data '{ "name": "Javascript", "description": "Learn JS", "link": "https://en.wikipedia.org/wiki/JavaScript" }'
```

Example Result:
```bash
{"id":"4c3523e0-c67f-11ec-9fe9-8d91c0387302","name":"Javascript","description":"Learn JS","link":"www.google.com","createdAt":1651101058333,"updatedAt":1651101058333}
```

### List all Todos

```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/languages
```

Example output:
```bash
[{"id":"4c3523e0-c67f-11ec-9fe9-8d91c0387302","name":"Javascript","description":"Learn JS","link":"https://en.wikipedia.org/wiki/JavaScript","createdAt":1651101058333,"updatedAt":151101058333}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your languages table
curl -H "Content-Type:application/json" http://localhost:3000/dev/languages/<id>
```

Example Result:
```bash
[{"id":"4c3523e0-c67f-11ec-9fe9-8d91c0387302","name":"Javascript","description":"Learn JS","link":"https://en.wikipedia.org/wiki/JavaScript","createdAt":1651101058333,"updatedAt":14551101058333}]%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/dev/languages/<id> --data '{ "name": "Typescript", "description": "Learn JS", "link": "https://www.typescriptlang.org" }'
```

Example Result:
```bash
[{"id":"4c3523e0-c67f-11ec-9fe9-8d91c0387302","name":"Typescript","description":"Learn JS","link":"https://www.typescriptlang.org","createdAt":1651101058333,"updatedAt":1651101099333}]%
```

No output
