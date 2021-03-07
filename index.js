//Este es el servidor de la aplicacion
const express = require('express');
const mongoose = require ('mongoose');
const app = express();

//Conectando a la BD
mongoose.connect('mongodb+srv://AlilatMDB:LetUsProceedToTheEvaluationUwU@cdcluster.3vgt9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Estamos conectados a la DB'))
                                                    .catch(err => console.error(err));

//Va a mostrar la pagina principal
app.get('/', (req, res) => {
    res.send('Funciona el Servidor');
});

//Puerto donde el servidor se encontrara
app.listen(5000);