const express = require('express');
const router  = express.Router();

router.get('/', function(req, res, next) {
	res.json({
		message: 'ok'
	});
});

router.post('/', function(req, res, next) {
	res.json({
		message: 'ok',
	})
});

module.exports = router;