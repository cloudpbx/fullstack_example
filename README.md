# Serverless REST API with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Languages stored in a DynamoDB, similar to the
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

You can create, retrieve, update, or delete languages with the following commands:

### Create a Language

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/languages --data '{ "name": "Javascript", "description": "Learn JS", "link": "https://en.wikipedia.org/wiki/JavaScript" }'
```

Example Result:
```bash
{"id":"ff196020-c710-11ec-a538-17e50b4d1a94","name":"Javascript","description":"Learn JS","link":"https://en.wikipedia.org/wiki/JavaScript","createdAt":1651163635490,"updatedAt":1651163635490}
```

### List all Languages

```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/languages
```

Example output:
```bash
[{"name":"Javascript","link":"https://en.wikipedia.org/wiki/JavaScript","description":"Learn JS","createdAt":1651163635490,"id":"ff196020-c710-11ec-a538-17e50b4d1a94","updatedAt":1651163635490},{"name":"Python","link":"https://en.wikipedia.org/wiki/Python","description":"Learn Python","createdAt":1651163711566,"id":"2c71a6e0-c711-11ec-a1d6-2d2195dcab61","updatedAt":1651163711566}]%
```

### Get one Language

```bash
# Replace the <id> part with a real id from your languages table
curl -H "Content-Type:application/json" http://localhost:3000/dev/languages/<id>
```

Example Result:
```bash
{"name":"Javascript","link":"https://en.wikipedia.org/wiki/JavaScript","description":"Learn JS","createdAt":1651163635490,"id":"ff196020-c710-11ec-a538-17e50b4d1a94","updatedAt":1651163635490}%
```

### Update a Language

```bash
# Replace the <id> part with a real id from your languages table
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/dev/languages/<id> --data '{ "name": "Typescript", "description": "Learn JS", "link": "https://www.typescriptlang.org" }'
```

Example Result:
```bash
[{"link":"https://www.typescriptlang.org","name":"Typescript","createdAt":1651163635490,"description":"Learn JS","id":"ff196020-c710-11ec-a538-17e50b4d1a94","updatedAt":1651163933940}%]
```

No output

### Remove a Language

```bash
# Replace the <id> part with a real id from your languages table
curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/dev/languages/<id>
```

Example Result:
```bash
{"link":"https://www.typescriptlang.org","name":"Typescript","createdAt":1651163635490,"description":"Learn JS","id":"ff196020-c710-11ec-a538-17e50b4d1a94","updatedAt":1651163933940}%
```
