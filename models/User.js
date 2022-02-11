import mongoose from 'mongoose';
import validator from 'validator'; // 🥊
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: 3,
      maxlength: 20,
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'Please provide an email'],
      validate: {
         validator: validator.isEmail,
         message: 'Please provide a valid email',
      },
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // para q no me lo devuelva al buscar user
   },
   lastName: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'Apellido',
   },
   location: {
      type: String,
      trim: true,
      maxlength: 20,
      default: 'Mi Ciudad',
   },
});

// 📑
UserSchema.pre('save', async function () {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
   });
};

// const createTokenUser = user => {
//    return { name: user.name, userId: user._id, role: user.role };
// };
//
// const jwt = require('jsonwebtoken');
//
// // no es necesaria la expiración del token ya q se tiene la de la cookie
// const createJWT = ({ payload }) => {
//    const token = jwt.sign(payload, process.env.JWT_SECRET);
//    return token;
// };

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//    const isMatch = await bcrypt.compare(candidatePassword, this.password);
//    return isMatch;
// };

export default mongoose.model('User', UserSchema);

//
// 🔥
// en los métodos "this" hace referencia al documento

//
// 📑
// se puede omitir el "next" en funcion(next), di se devuelve una promesa

//
// 🥊 paquete para pasarle a la fcn y q me valide el mail, lo de la fcn lo sequé de la documentación. ".isEmail" es la fcn q viene en el package de "validator" para validar el email.
//npm install validator
//
// Custom Validators
// If the built-in validators aren't enough, you can define custom validators to suit your needs.
//
// Custom validation is declared by passing a validation function. You can find detailed instructions on how to do this in the SchemaType#validate() API docs.
//
// const userSchema = new Schema({
//   phone: {
//     type: String,
//     validate: {
//       validator: function(v) {
//         return /\d{3}-\d{3}-\d{4}/.test(v);
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     },
//     required: [true, 'User phone number required']
//   }
// });
