export function buildResponse(data: any, success = true, message: any = null) {
  return {
    status: success ? "success" : "error",
    message,
    data,
  }
}