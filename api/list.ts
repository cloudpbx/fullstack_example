import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper';

export const list: Handler = async (event: APIGatewayEvent, context: Context) => {
	const params = {
		TableName: process.env.DYNAMODB_TABLE as string,
	}
  // fetch all languages from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.
  try {
    const res = await dynamoDb.scan(params).promise()
    return successResponse(res.Items)
  } catch (error) {
    return errorResponse(error.statusCode || 501, `Couldn't fetch the language items`)
  }
};
