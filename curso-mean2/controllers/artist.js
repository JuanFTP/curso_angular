'use-strict'

var fs = require('fs');
var path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {
	res.status(200).send({message: 'Método getArtist del controlador artist.js'});	
}

function saveArtist(req, res) {
	var artist = new Artist();

	var params  =req.body;
	artist.name = params.name;
	artist.description = params.description;
	artist.image = 'null';

	artist.save((err, artistStore) => {
		if(err) {
			res.status(500).send({message: 'Error al guardar el mensaje'});
		} else {
			if(!artistStore) {
				res.status(404).send({message: 'El artista no ha sido guardado'});
			} else {
				res.status(200).send({message: 'Artista guardado exitosamente', artist: artistStore});
			}
		}
	});
}

module.exports = {
	getArtist,
	saveArtist
};