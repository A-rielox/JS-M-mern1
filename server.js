import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';

//===== POST BUILD
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// ===== DB
import connectDB from './db/connect.js';

// ===== routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

// @@@@@@@@@@@@@@@@@@@@ MIDDLEWARE
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url)); // POST BUILD
app.use(express.static(path.resolve(__dirname, './client/build'))); // POST BUILD
app.use(express.json()); // para req.body

app.use(express.json()); // POST BUILD
app.use(helmet()); // POST BUILD
app.use(xss()); // POST BUILD
app.use(mongoSanitize()); // POST BUILD

// ===== routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', function (request, response) {
   response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
}); // POST BUILD

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// @@@@@@@@@@@@@@@@@@@@ APP LISTEN
const port = process.env.PORT || 5000;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URL);

      app.listen(port, () =>
         console.log(`Server es listening in port: ${port}...🐸`)
      );
   } catch (error) {
      console.log(error);
   }
};
// connectDB devuelve una promesa xeso es con await y la fcn es async

start();
