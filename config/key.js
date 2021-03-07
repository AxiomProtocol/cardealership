/*Con esto vamos a garantizar seguridad en la aplicacion
podra detectar si esta siendo utilizada en modo de produccion
o en modo de desarrollo, y mandara el archivo con las ordenes 
correspondientes al caso que sea: produccion(./prod), desarrollo(./dev)*/
if(process.env.NODE_ENV === 'production'){
        module.exports = require('./prod');
}else{
    module.exports = require('./dev');
};