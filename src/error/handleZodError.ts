import { ZodError, ZodIssue } from 'zod';
import { iGenericErrorResponse } from '../interface/common';
import { iGenericErrorMessage } from '../interface/error';

const handelZodError = (error: ZodError): iGenericErrorResponse => {
  const errors: iGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handelZodError;
