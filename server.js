import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

// ===== DB
import connectDB from './db/connect.js';

// ===== routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// @@@@@@@@@@@@@@@@@@@@ MIDDLEWARE
app.use(express.json()); // para req.body

// ===== routes
app.get('/', (req, res) => {
   res.send('Holi hola');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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
