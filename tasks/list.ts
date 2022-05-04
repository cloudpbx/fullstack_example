import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { APIResponse } from '../util/APIResponse';

const params = {
  TableName: process.env.DYNAMODB_TABLE as string,
};

export const listTasks: Handler = async (event: APIGatewayEvent, context: Context) => {
  // fetch all tasks from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.
  try {
    const res = await dynamoDb.scan(params).promise()
    return APIResponse(res.Items, `Tasks Fetched Successfully`, 200)

  } catch (error) {
    return APIResponse({}, `Couldn't fetch the tasks`, error.statusCode || 501)
  }
};
