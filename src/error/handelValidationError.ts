import mongoose from 'mongoose'
import { iGenericErrorResponse } from '../interface/common'
import { iGenericErrorMessage } from '../interface/error'

const handelValidationError = (
  err: mongoose.Error.ValidationError
): iGenericErrorResponse => {
  const errors: iGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors,
  }
}

export default handelValidationError
