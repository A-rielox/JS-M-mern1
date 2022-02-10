import express from 'express';
const app = express();

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// @@@@@@@@@@@@@@@@@@@@ MIDDLEWARE
app.get('/', (req, res) => {
   res.send('Holi hola');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// @@@@@@@@@@@@@@@@@@@@ APP LISTEN
const port = process.env.PORT || 5000;

app.listen(port, () =>
   console.log(`Server es listening in port: ${port}...🐸`)
);
