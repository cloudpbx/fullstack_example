# Serverless REST API with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

#Note: For the Task Management Full Stack Application

* Modified the existing full stack application with the Simple Task Management feature 
by creating the necessary React components. 
* Kept the layout simple and classic to view the tasks easily 
* Created necessary CRUD operation and files for backend in the dynamodb 

## New Setup
```bash
npm i -g serverless@2.72.3
npm install
serverless dynamodb install
serverless dynamodb start
cd frontend
npm install
npm start
```

After running the project successfully, one can run below cmd from root directory
```bash
npm start
```

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

### Create a Todo

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/dev/todos --data '{ "text": "Learn Serverless" }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all Todos

```bash
curl -H "Content-Type:application/json" http://localhost:3000/dev/todos
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90feaa11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"206793aa11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -H "Content-Type:application/json" http://localhost:3000/dev/todos/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/dev/todos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

No output