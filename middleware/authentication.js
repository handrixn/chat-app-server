const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	let headers = req.headers;
	let token = headers.authorization ? headers.authorization.split(" ")[1] : "";

	if(!token) {
		return res.status(403).json({
			message: 'authentication failed'
		});
	}
	
	try {
		let result = jwt.verify(token, process.env.SECRET_KEY);
		req.user = result
		next();
	} catch(e) {
		res.status(403).json({
			message: 'authorization failed',
		})
	}
}

module.exports = auth;