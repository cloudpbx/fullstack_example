import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper';

export const remove: Handler = async (event: APIGatewayEvent, context: Context) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
	  ReturnValues: "ALL_OLD",
  };

  // delete language item from the database
	 console.log('params', params);

  try {
    const res = await dynamoDb.delete(params).promise();
		console.log('res', res)
    return successResponse(res.Attributes);
  } catch (error) {
    return errorResponse(error.statusCode || 501, `Couldn't fetch the language item`);
  };
};
