export default class ApiError extends Error {

	constructor(code, message, errors = []) {
		super(message)
    this.code = code;
		this.errors = errors
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static internal(msg) {
    return new ApiError(500, msg);
  }

}
