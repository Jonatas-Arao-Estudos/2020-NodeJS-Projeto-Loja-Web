const express = require('express');
const routes = require('./src/routes');
const path = require('path');

require('./src/database');

// Iniciando
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express.static(path.join(__dirname,"src/public")));

// Rota
app.use(routes);

app.listen(3001);