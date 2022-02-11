import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';

const register = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      throw new BadRequestError('Please provide all values');
   }

   const userAlreadyExist = await User.findOne({ email });
   if (userAlreadyExist) {
      throw new BadRequestError('Email already in use');
   }

   const user = await User.create({ name, email, password });

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
