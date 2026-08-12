import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse, successDelete } from '../util/responseHelper';

export const deleteQuote: Handler = async (event: APIGatewayEvent, context: Context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
  };

  // first check if it exists, if not, resturn that it does not exist

  // fetch todo from the database
  try {
    const res = await dynamoDb.delete(params).promise()
    return successDelete(res)
  } catch (error) {
    return errorResponse(error.statusCode || 501, `Couldn't delete the item`)
  }
};