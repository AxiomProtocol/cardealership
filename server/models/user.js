//Aqui se encuentra el modelo de base de datos para la informacion de usuarios.
const mongoose = require('mongoose');
//cantidad de veces que se encriptan las pates de la clave
const saltRounds = 13;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    //primer nombre del usuario
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
        minglength: 8
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

//Con esto vamos a hacer que la clave del usuario sea encriptada antes de guardarse a la bd
userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err);
        
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash
                 /*Este next() se pone aqui para que el hashing se realice y se mande*/ 
                 next();
        });
    });
    
    }
    else{
        next();
    }
});

//haremos la comparacion de claves aqui
userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

//Hacemos la generacion de token aqui
userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'epsteinnosesuicidoxd')

    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    });
}

userSchema.statics.findByToken = function (token, cb){
    var user = this;
        //La decodificacion del token nos dara la ID del usuario, asi detectamos si esta autorizado o no
    jwt.verify(token, 'epsteinnosesuicidoxd', function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });
    });
}


//Con esto se crea la coleccion que estara en la base de datos
const User = mongoose.model('User', userSchema);

//Exportamos
module.exports = {User};