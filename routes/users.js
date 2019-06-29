const express 	= require('express');
const router 	= express.Router();
const model  	= require('../models');
const user      = model.user; 

/* GET users listing. */
router.get('/', async function(req, res, next) {
	user.findAll({})
		.then(data => {
			if(data.length === 0) {
				return res.status(200).json({
					message: 'Users empty'
				})
			}
			return res.status(200).json(data)
		})
		.catch(err => {
			res.status(500).json({
				message: 'Server Error'
			})
		});
});

module.exports = router;
