import ApiError from "../utils/ApiError.js";

export default function apiErrorHandler(err, req, res, next) {
  // in prod, don't use console.log or console.err because
  // it is not async
  console.error('APIERROR: ',err);

  if (err instanceof ApiError) {
    return res.status(err.code).json({message: err.message, errors: err.errors})
  }

  res.status(500).json(err.message);
}
