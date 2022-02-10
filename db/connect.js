import mongoose from 'mongoose';

const connectDB = url => {
   return mongoose.connect(url);
};

export default connectDB;

// mongoose.connect() devuelve una promesa xeso en server.js en strat() le mando await en frente
