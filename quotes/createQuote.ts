import { Handler, APIGatewayEvent, Context } from "aws-lambda";
import * as uuid from "uuid";
import { dynamoDb } from "../util/dynamoHelper";
import { errorResponse, successResponse } from "../util/responseHelper";

export const createQuote: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().toISOString().split(".")[0];
  if (!event.body) return errorResponse(400, `Body is required`);
  const data = JSON.parse(event.body);

  if (typeof data.content !== "string" || typeof data.author !== "string") {
    console.error("Validation Failed");
    return errorResponse(400, `Field 'content' or 'author' is missing`);
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      content: data.content,
      author: data.author,
      pictureData: "https://picsum.photos/400",
    },
  };

  // write the todo to the database
  try {
    const res = dynamoDb.put(params).promise();
    return successResponse(params.Item);
  } catch (error) {
    console.error(error);
    return errorResponse(400, "Couldn't create the todo item.");
  }
};
