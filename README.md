Escriba dev.js dentro de server/config/ para poder conectarse con la base de datos mongo.

Recomiendo utilizar postman/insomnia para verificar la introduccion de datos al registrarse, hasta este momento no logro hacer que el front end de esa pagina funcione. Sigo intentado.

La introduccion de datos funciona, genera tokens y cookies, encripta claves, y hace las validaciones al momento del login.
Esta desplegada en heroku.
Utilize 'npm run dev' para inicializar los servidores de Backend Y Frontend de manera concurrente, el backend esta en localhost:5000 y en frontend en localhost:3000

las direcciones del frontend son localhost:3000/login y localhost:3000/register

La bd tiene las IP en whitelist para que puedan conectarse sin problema.

No pude terminar con el resto de las indicaciones, me enfoque demasiado en los datos y conecciones.