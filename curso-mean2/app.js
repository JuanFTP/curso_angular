'use-strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras HTTP

//Rutas base
app.get('/pruebas', function (req, res) {
	res.status(200).send({mensaje: "Hellow al curso..."});
});

module.exports = app;