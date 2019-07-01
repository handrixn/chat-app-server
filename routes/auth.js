const express 		= require('express');
const router  		= express.Router();
const jwt 	  		= require('jsonwebtoken');
const bcrypt  		= require('bcrypt');
const user 	  		= require('../models').user

router.post('/', function(req, res, next) {
	let identity = {
		username: req.body.username
	}

	user.scope('withPassword').findOne({where: identity})
		.then(data => {
			if(!(data)) {
				res.status(404).send({statusMessage: 'Username not found'});
			} else {
				payload = data.dataValues;
				password = payload.password;

				delete payload.password;
				delete payload.createdAt;
				delete payload.updatedAt;

				bcrypt.compare(req.body.password, password, function(err, result) {
					if(!result) {
						return res.status(404).send({statusMessage: 'Incorrect Password'});
					}

					let token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN});
					let refreshToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});
				
					return res.status(200).json({
								data: payload,
								token: token,
								refreshToken: refreshToken,
								status: 200
							});
				})
			}
		})
		.catch(err => res.status(500).send('Server error bre!'));
});

module.exports = router;