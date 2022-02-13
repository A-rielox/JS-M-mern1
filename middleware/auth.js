import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
   const authHeader = req.headers.authorization; // aquí debe venir el "Bearer <token>"
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Authentication Invalid 🧐');
   }

   const token = authHeader.split(' ')[1];

   try {
      const payload = await jwt.verify(token, process.env.JWT_SECRET);

      // crea el req.user con el _id del usuario
      req.user = { userId: payload.userId };

      next();
   } catch (error) {
      throw new UnauthenticatedError('Authentication Invalid 🧐');
   }
};

export default auth;

// const jwt = require('jsonwebtoken');
//
// const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// const { isTokenValid } = require('../utils');
//
// const authenticateUser = async (req, res, next) => {
//    const token = req.signedCookies.token;
//
//    if (!token) {
//       throw new UnauthenticatedError('Authentication invalid');
//    }
//
//    try {
//       const { name, userId, role } = isTokenValid({ token });
//       req.user = { name, userId, role };
//
//       next();
//    } catch (error) {
//       throw new UnauthenticatedError('Authentication invalid');
//    }
// };
