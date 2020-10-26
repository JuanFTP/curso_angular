'use-strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user')

function pruebas(req, res){
	res.status(200).send({
		mensaje: "Probando una acción del controlador del Usuario del API REST con Node y MongoDB"
	});
}

function saveUser(req, res) {
	var user = new User();
	var params = req.body;

	// Corregir el Object: null prototype

	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';

	if(params.password) {
		// Encriptar contraseña y guardar datos
		bcrypt.hash(params.password, null, null, function(err, hash) {
			user.password = hash;
			if(user.email != null && user.surname != null && user.email != null) {
				// Guardar el usuario en la base de datos
				user.save((err, userStored) => {
					if(err) {
						res.status(500).send({message: 'Error al guardar el usuario'});
					} else {
						if(!userStored) {
							res.status(404).send({message: 'No se ha podido guardar el usuario'});
						} else {
							res.status(200).send({message: userStored});
						}
					}
				});
			} else {
				// Indicar campos vacíos al usuario
				res.status(200).send({message: "Rellena todos los campos"});
			}
		});
	} else {
		res.status(200).send({message: 'Introduce la contraseña'});
	}
};

module.exports = {
	pruebas,
	saveUser
};