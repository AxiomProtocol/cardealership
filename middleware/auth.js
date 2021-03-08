//Aqui manejamos a los usuarios normales
const { User } = require('../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.donotthinkkiddo;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};