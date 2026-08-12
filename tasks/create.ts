import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import * as uuid from 'uuid'
import { dynamoDb } from '../util/dynamoHelper'
import { APIResponse } from '../util/APIResponse';

export const createTask: Handler = async (event: APIGatewayEvent, context: Context) => {

  const timestamp = new Date().getTime()
  if (!event.body) return APIResponse({}, `Body is required`, 400)
  const data = JSON.parse(event.body)

  if (typeof data.title !== 'string' || typeof data.description !== 'string') {
    console.error('Validation Failed')
    return APIResponse({}, `Field 'title' or 'description' is required`, 400)
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Item: {
      id: uuid.v1(),
      title: data.title,
      description: data.description,
      taskStatus: "pending",
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  // write the task to the database
  try {
    const res = dynamoDb.put(params).promise()
    return APIResponse(params.Item, `Task Created Successfully`, 201)
  } catch (error) {
    console.error(error)
    return APIResponse(params.Item, `Couldn\'t create a task.`, error.statusCode || 400)
  }
}
