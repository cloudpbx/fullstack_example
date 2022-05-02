export function successResponse(payload: any) {
  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}

export function successDelete(payload: any) {
  return {
    statusCode: 200,
    body: JSON.stringify({msg: 'deleted item'})
  }
}

export function errorResponse(errorCode: number, message: string) {
  return {
    statusCode: errorCode,
    body: JSON.stringify(message)
  }
}