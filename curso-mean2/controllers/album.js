'use-strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

function getAlbum(req, res) {
	var albumId = req.params.id;

	// Conseguir todos los datos del artista que creó el album
	Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
		if(err) {
			res.status(500).send({message: 'Error en la petición'});
		} else {
			if(!album) {
				res.status(404).send({message: 'El album no existe'});
			} else {
				res.status(200).send({message: 'Album obtenido exitosamente', album});
			}
		}
	});
}

function saveAlbum(req, res) {
	var album = new Album();

	var params  = req.body;
	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = null;
	album.artist = params.artist;

	album.save((err, albumStored) => {
		if(err) {
			res.status(500).send({message: 'Error al guardar el album'});
		} else {
			if(!albumStored) {
				res.status(404).send({message: 'No se ha guardado el album'});
			} else {
				res.status(200).send({message: 'Album guardado exitosamente', album: albumStored});
			}
		}
	});
}

module.exports = {
	getAlbum,
	saveAlbum
};