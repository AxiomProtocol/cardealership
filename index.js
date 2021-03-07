//Este es el servidor de la aplicacion
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//Llamamos el modelo de la coleccion de usuarios
const {User} = require('./models/user');
//Llamamos a la llave para que se da la coneccion a la BD
const config =require('./config/key');


//Conectando a la BD
mongoose.connect(config.mongoURI, 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(() => console.log('Estamos conectados a la DB'))
                                                    .catch(err => console.error(err));
//Con esto evitamos las depreciaciones
app.use(bodyParser.urlencoded({extended: true}));
//con esto hacemos que pueda leer el formato json
app.use(bodyParser.json());
//con esto activamos las galletas xd
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({"funciona": "quizas si uwu"});
});

//Va a mostrar la pagina principal
app.get('/', (req, res) => {
    res.send('Funciona el Servidor');
});

//Con esto vamos a hacer que la informacion introducida al registrar usuarios se almacene y muestre
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    
    user.save((err, userData) => {
        if(err) return res.json ({success: false, err})
        return res.status(200).json({
            success:true
        });
    });
});

//Puerto donde el servidor se encontrara
app.listen(5000);