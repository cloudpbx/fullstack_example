import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper';

export const update: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().getTime();
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body);
	const name = data.name;
	const description = data.description;
	const link = data.link;

  // validation
  if (typeof name !== 'string' || typeof description !== 'string' || typeof link !== 'string') {
    console.error('Validation Failed');
    return errorResponse(400, `Couldn't update the language item because of validation errors`);
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
    return errorResponse(error.statusCode || 501, `Couldn't update the language item`);
  }
};
