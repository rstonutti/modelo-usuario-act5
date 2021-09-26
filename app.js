const express = require('express');
require('dotenv').config();

require('./database/connection.js')

const app = express()

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Settings
app.set('port', process.env.PORT || 3000);

//Routes
app.use('/api', require('./routes/usuario.routes'));

app.listen(app.get('port'), ()=> console.log(`Servidor en el puerto ${app.get('port')}`));