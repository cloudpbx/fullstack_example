import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { APIResponse } from '../util/APIResponse';

export const getTask: Handler = async (event: APIGatewayEvent, context: Context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
  };

  // fetch task from the database
  try {
    const res = await dynamoDb.get(params).promise()
    return APIResponse(res.Item, `Task fetched Successfully`, 200)
  } catch (error) {
    return APIResponse({}, `Couldn't fetch the task item`, error.statusCode || 501)
  }
};