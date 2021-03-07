//Aqui se encuentra el modelo de base de datos para la informacion de usuarios.
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    //primer nombre del usuari
    firstname: {
        type: String,
        maxlength: 50
    },
    //apellido del usuario
    lastname: {
        type: String,
        maxlength: 50
    },
    //direccion de correo del usuario
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    //clave del usuario
    password: {
        type: String,
        minlength: 8
    },
    //rol, si es administrador del sitio o usuario normal
    role: {
        type: Number,
        default: 0
    },
    //token de identificacion del usuario
    token: {
        type: String,
    },
    //token de identificacion de usuario
    tokenExp: {
        type: Number
    }

});

//Con esto se crea la coleccion que estara en la base de datos
const User =mongoose.model('User', userSchema);

//Exportamos
module.exports = {User};