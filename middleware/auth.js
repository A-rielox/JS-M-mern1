const auth = async (req, res, next) => {
   const headers = req.headers;
   const authHeader = req.headers.authorization; // aquí debe venir el "Bearer <token>"
   console.log(headers);
   console.log(authHeader);
   next();
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
