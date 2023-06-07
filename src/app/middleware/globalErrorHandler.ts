/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { iGenericErrorMessage } from '../../interface/error'
import handelValidationError from '../../error/handelValidationError'
import config from '../../config'
import ApiError from '../../error/ApiError'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('🚀 globalErrorHandler~~', error)
    : errorLogger.error('🚀 globalErrorHandler~~', error)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: iGenericErrorMessage[] = []

  if (error?.name === 'validationError') {
    const simplifiedError = handelValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
