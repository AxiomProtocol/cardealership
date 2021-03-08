//Este es el servidor de la aplicacion
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//Llamamos el modelo de la coleccion de usuarios
const {User} = require('./models/user');
//Llamamos al middleware the autorizacion
const {auth} = require('./middleware/auth');
//Llamamos a la llave para que se da la coneccion a la BD
const config =require('./config/key');


//Conectando a la BD
mongoose.connect(config.mongoURI, 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => console.log('Estamos conectados a la DB'))
                                                    .catch(err => console.error(err));
//Con esto evitamos las depreciaciones
app.use(bodyParser.urlencoded({extended: true}));
//con esto hacemos que pueda leer el formato json
app.use(bodyParser.json());
//con esto activamos las galletas xd
app.use(cookieParser());


app.get('/', (req, res) => {
    res.json({"LO LOGRAMOS": "SIUUUUUUUUUU"})
});


app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role
    });
});



//Con esto vamos a hacer que la informacion introducida al registrar usuarios se almacene y muestre
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    
    user.save((err, doc) => {
        if(err) return res.json ({success: false, err})
        return res.status(200).json({
            success:true,
            userData: doc
        });
    });
});


/*con esto nos vamos a asegurar de que el email y la clave del
del usuario concuerden con lo que esta almacenado en su registro 
dentro de la BD, permitiendole que inicie la sesion.
Tambien general el token de identificacion*/
app.post('/api/user/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user)
        return res.json({
            loginSuccess: false,
            message: "Email  incorrecta."
        });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
            return res.json({
                loginSuccess: false,
                message: "Clave incorrecta."
            });
            
        
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie("donotthinkkiddo", user.token).status(200)
                    .json({
                        loginSuccess: true
                    });
            });
        });
    });
});

//Con esta funcion permitios que el usuario termine sesion
app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token:""}, (err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).send({
            success: true
        });
    });
});

//Permite que la app decida si utilizar cliente(heroku) o el port 5000
const port = process.env.PORT || 5000;

//Puerto donde el servidor se encontrara
app.listen(port, () => {
    console.log(`Servidor se encuentra funcionando por ${port}`)
});