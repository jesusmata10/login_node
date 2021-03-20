// 1. invocamos a express
const express = require('express');
const app = express();
// 2. seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json);
// 3. Invocamos el dotenv
const dotenv = require('dotenv');
dotenv.config({
	path: './env/.env'
});
// 4. el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
// 5. establecer el motor de plantilla ejs
app.set('view engine', 'ejs');
// 6. Invocamos a bcryptjs
const bcryptjs = require('bcryptjs');
// 7. var. session
const session = require('express-session');
app.use(session({
	secret: '12345678',
	resave: true,
	saveUninitialized: true
}));
// 8. Base de dato
const connection = require('./database/db');
app.listen(3000, (req, res) => {
	console.log('Servidor ejecutado en http://localhost:3000');
});