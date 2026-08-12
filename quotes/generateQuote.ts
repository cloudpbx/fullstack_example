import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import * as uuid from 'uuid'
import { dynamoDb } from '../util/dynamoHelper'
import { errorResponse, successResponse } from '../util/responseHelper'
import axios from 'axios';

export const generateQuote: Handler = async (event: APIGatewayEvent, context: Context) => {
  const timestamp = new Date().toISOString().split('.')[0]

  // if (!event.body) return errorResponse(400, `Body is required`)
  // const data = JSON.parse(event.body)

  const quoteResponse = await axios.get("https://api.quotable.io/random");
  const {content, author, length} = quoteResponse.data; 

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      content,
      author,
      length,
      pictureData: 'https://picsum.photos/400'
    }
  }

  // write the todo to the database
  try {
    const res = dynamoDb.put(params).promise()
    return successResponse(params.Item)
  } catch (error) {
    console.error(error)
    return errorResponse(400, 'Couldn\'t create the todo item.')
  }
}
