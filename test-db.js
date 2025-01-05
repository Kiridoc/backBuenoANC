require('dotenv').config({ path: './' }); // Especifica la ruta explícita al archivo .env

console.log(process.env.DB_USER);  // Esto debe imprimir el valor de DB_USER si todo está bien
