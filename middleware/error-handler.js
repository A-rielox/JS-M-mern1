import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
   console.log(err.message);

   const defaultError = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Something went wrong, try again later',
   };

   if (err.name === 'ValidationError') {
      defaultError.msg = Object.values(err.errors)
         .map(item => item.message)
         .join(',');

      defaultError.statusCode = StatusCodes.BAD_REQUEST;
   }

   if (err.code && err.code === 11000) {
      defaultError.msg = `Duplicate value entered for ${Object.keys(
         err.keyValue
      )} field, please choose another value`;
      defaultError.statusCode = StatusCodes.BAD_REQUEST;
   }

   return res.status(defaultError.statusCode).json({ msg: defaultError.msg });
   // return res.status(defaultError.statusCode).json({ msg: err });
};

export default errorHandlerMiddleware;
