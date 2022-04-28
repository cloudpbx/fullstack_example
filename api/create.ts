import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import * as uuid from 'uuid'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper'

export const create: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().getTime();
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body)
	const name = data.name;
	const description = data.description;
	const link = data.link;

  if (typeof name !== 'string' || typeof description !== 'string' || typeof link !== 'string') {
    console.error('Validation Failed')
    return errorResponse(400, `Could not create because of validation errors.`);
  };

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Item: {
      id: uuid.v1(),
      name: name,
			description: description,
			link: link,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  // write the language to the database
  try {
    const res = dynamoDb.put(params).promise()
    return successResponse(params.Item)
  } catch (error) {
    console.error(error)
    return errorResponse(400, 'Couldn\'t create the language item.')
  }
}
