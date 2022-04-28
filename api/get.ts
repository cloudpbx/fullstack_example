import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper';

export const get: Handler = async (event: APIGatewayEvent, context: Context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
  };

  // fetch language item from the database
  try {
    const res = await dynamoDb.get(params).promise()
    return successResponse(res.Item)
  } catch (error) {
    return errorResponse(error.statusCode || 501, `Couldn't fetch the language item`);
  };
};
