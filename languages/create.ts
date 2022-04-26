import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import * as uuid from 'uuid'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper'

export const create: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().getTime()
  if (!event.body) return errorResponse(400, `Body is required`)
  const data = JSON.parse(event.body)
	console.log('data', data);
  if (typeof data.name !== 'string') {
    console.error('Validation Failed')
    return errorResponse(400, `Field 'name' is required`)
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Item: {
      id: uuid.v1(),
      name: data.name,
			description: data.description,
			link: data.link,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }

  // write the language to the database
  try {
    const res = dynamoDb.put(params).promise()
    return successResponse(params.Item)
  } catch (error) {
    console.error(error)
    return errorResponse(400, 'Couldn\'t create the todo item.')
  }
}
