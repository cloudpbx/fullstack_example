export function APIResponse(data: any, message = '', statusCode = 200) {
  let res = {
    statusCode: statusCode,
    body: JSON.stringify({
      data: data,
      message: message
    })
  }

  return res
}
