const jwt = require("jsonwebtoken");

// verify jwt token
function verifyToken(req, res, next) {
	const token = req.cookies.JWT.token;
	console.log(token)
	try {
		jwt.verify(token, process.env.JWT_KEY, (err, user) => {
			if (err) {
				console.log(err);
				return;
			}
			req.user = user;
			next();
		});
	} catch (err) {
		res.send("No token provided");
	}
}
exports.verifyToken = verifyToken;

// generate jwt
function generateToken(user) {
	const token = jwt.sign(user, process.env.JWT_KEY, {
		expiresIn: "1day",
	});
	return token;
}
exports.generateToken = generateToken;