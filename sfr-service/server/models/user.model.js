const { model, Schema, models } = require('mongoose');

const nameRegex = /[a-zA-Z]+/; // Just letters
const emailRegex = /^[^@]+@[^@]+.[^@]+$/; // simply email validation
const strongPass =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const userSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
      match: [nameRegex, 'Nombre no debe contener numeros'],
    },
    lastName: {
      required: true,
      type: String,
      match: [nameRegex, 'Apellido no debe contener numeros'],
    },
    avatar: String,
    email: {
      type: String,
      required: true,
      match: [emailRegex, 'Email Invalido'],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: 'Ya existe un usuario registrado con ese correo',
        },
      ],
    },
    password: {
      required: [true, 'La contraseña es requerida'],
      match: [strongPass, 'La contraseña no es segura'],
      type: String,
    },
    isAdmin: {
      required: true,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
