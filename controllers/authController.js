import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

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

   // en el payload del token { userId: this._id }
   const token = user.createJWT();

   res.status(StatusCodes.CREATED).json({
      user: {
         email: user.email,
         lastName: user.lastName,
         location: user.location,
         name: user.name,
      },
      token,
      location: user.location,
   });
};

const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new BadRequestError('Please provide all values');
   }

   const user = await User.findOne({ email }).select('+password');
   if (!user) {
      throw new UnauthenticatedError('Invalid Credentials');
   }

   const isPasswordCorrect = await user.comparePassword(password);
   if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials');
   }

   // en el payload del token { userId: this._id }
   const token = await user.createJWT();

   user.password = undefined; //para no mandar el pass al front
   res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
   const { email, name, lastName, location } = req.body;
   if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all required fields');
   }

   const user = await User.findOne({ _id: req.user.userId });

   user.email = email;
   user.name = name;
   user.lastName = lastName;
   user.location = location;

   await user.save(); // va a intentar hashiar un pass q no le estoy pasando

   const token = await user.createJWT(); // tecnicamente no cambio el id, asi q no necesito cambiar el token

   res.status(StatusCodes.OK).json({
      user,
      token,
      location: user.location,
   });
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
