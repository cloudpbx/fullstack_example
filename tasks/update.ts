import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { dynamoDb } from '../util/dynamoHelper'
import { APIResponse } from '../util/APIResponse';

export const updateTask: Handler = async (event: APIGatewayEvent, context: Context) => {

  const timestamp = new Date().getTime();
  const validTaskStatus = ["pending", "completed"]

  if (!event.body) return APIResponse({}, `Body is required`, 400)
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.title !== 'string' || typeof data.description !== 'string') {
    console.error('Validation Failed');
    return APIResponse({}, `Field 'title' or 'description' is required`, 400)
  }
  if (!validTaskStatus.includes(data.taskStatus)) {
    return APIResponse({}, `Task Status is required and can be either pending or completed.`, 400)
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
    Key: {
      id: event.pathParameters!.id,
    },
    ExpressionAttributeNames: {
      '#todo_title': 'title',
    },
    ExpressionAttributeValues: {
      ':title': data.title,
      ':description': data.description,
      ':taskStatus': data.taskStatus,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #todo_title = :title, description = :description, taskStatus = :taskStatus, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  console.log(">>>>>>",params)


  // update the task in the database
  try {
    const res = await dynamoDb.update(params).promise()
    return APIResponse(res.Attributes, `Tasks Updated Successfully`, 200)
  } catch (error) {
    console.log("Error :",error)
    return APIResponse({}, `Couldn't update the task with id : ${event.pathParameters!.id}`, error.statusCode || 501)
  }
};