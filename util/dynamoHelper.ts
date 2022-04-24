import { DynamoDB } from 'aws-sdk'

export const dynamoDb = new DynamoDB.DocumentClient({ region: 'us-east-1', endpoint: 'http://localhost:8000', accessKeyId: 'xxxxx', secretAccessKey: 'xxxxx' })