import { Handler, APIGatewayEvent, Context } from "aws-lambda";
import { dynamoDb } from "../util/dynamoHelper";
import { errorResponse, successResponse } from "../util/responseHelper";

export const updateQuote: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().getTime();
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.author !== "string" || typeof data.content !== "string") {
    console.error("Validation Failed");
    return errorResponse(400, `Missing either author or content`);
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
    ExpressionAttributeNames: {
      "#todo_text": "author",
    },
    ExpressionAttributeValues: {
      ":author": data.author,
      ":content": data.content,
    },
    UpdateExpression: "SET #todo_text = :author, content = :content",
    ReturnValues: "ALL_NEW",
  };

  // update the todo in the database
  try {
    const res = await dynamoDb.update(params).promise();
    return successResponse(res.Attributes);
  } catch (error) {
    console.log(error);
    return errorResponse(error.statusCode || 501, `Couldn't fetch the todo item`);
  }
};
