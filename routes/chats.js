const express = require('express');
const router  = express.Router();
const model   = require('../models');
const chat    = model.chat;

router.get('/', function(req, res, next) {
	chat.scope('withUser').findAll({})
	    .then(data => {
	    	if(data.length == 0) {
	    		return res.status(200).json({message: 'chat empty'})
	    	}
	    	res.status(200).json(data);
	    })
	    .catch(e => {
	    	res.status(500).json({message: 'Server error'})
	    })
});

router.post('/', function(req, res, next) {
	const body = {
		chat: req.body.chat,
		user_id: req.user.id
	}

	chat.create(body)
	    .then(data => {
	    	res.status(201).json(data);
	    })
	    .catch(e => {
	    	res.status(500).json({message: "Server error"})
	    })
});

router.patch('/:id', function(req, res, next) {
	let body = {
		chat: req.body.chat
	}
	chat.update(body, {where: {id: req.params.id, user_id: req.user.id}})
	    .then(response => {
	    	if(response[0]) {
		    	return res.status(200).json({"message" : "success"});
	    	}
	    	return res.status(404).json({"message" : "not found"})
	    })
	    .catch(err => {
	    	res.status(500).json({"message" : "Server error"})
	    })
});

router.delete('/:id', function(req, res, next) {
	chat.destroy({where: {id: req.params.id, user_id: req.user.id}})
	    .then(data => {
	    	if(data) {
		    	return res.status(200).json({message: 'success'});
	    	}

	    	return res.status(404).json({message: 'Not found'});

	    })
	    .catch(error => console.error(error));
})

module.exports = router;