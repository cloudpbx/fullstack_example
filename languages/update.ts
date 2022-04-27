import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper';

export const update: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().getTime();
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name !== 'string' || typeof data.description !== 'string' || typeof data.link !== 'string') {
    console.error('Validation Failed');
    return errorResponse(400, `Couldn't update the language item`);
  }

	const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
		ExpressionAttributeNames: {
      '#language_name': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':description': data.description,
      ':link': data.link,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #language_name = :name, description = :description, link = :link, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the language in the database
  try {
    const res = await dynamoDb.update(params).promise();
    return successResponse(res.Attributes);
  } catch (error) {
		console.log('error', error);

    return errorResponse(error.statusCode || 501, `Couldn't fetch the todo item`);
  }
};
