import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
   const user = await User.create({ ...req.body });

   res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
   res.send('login route de jobify');
};

const updateUser = async (req, res) => {
   res.send('update user route de jobify');
};

export { register, login, updateUser };

//
// con el next() en el catch se pasa el error al error middleware : "app.use(errorHandlerMiddleware);"
//
// const register = async (req, res, next) => {
//    try {
//       const user = await User.create({ ...req.body });

//       res.status(201).json({ user });
//    } catch (error) {
//       // pasa el error al middleware de error
//       next(error);
//    }
// };
