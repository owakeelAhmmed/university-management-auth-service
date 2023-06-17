import mongoose from 'mongoose';
import { iGenericErrorMessage } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: iGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
