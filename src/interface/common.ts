import { iGenericErrorMessage } from './error';

export type iGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: iGenericErrorMessage[];
};
