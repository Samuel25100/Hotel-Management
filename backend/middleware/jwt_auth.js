const jwt = require("jsonwebtoken");

function jwt_auth(req, res, next) {
    let authtoken = req.headers["authorization"] || null;
    if (!authtoken) {
        res.status(401).json({"message": "Token missing"});
        return;
    }
    authtoken = authtoken.toString();
    const token = authtoken && authtoken.split(' ')[1];
    if (!token){
        res.status(401).json({"message": "Token missing"});
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            res.status(403).json({"message": "Unathorize token in jwt_auth"});
            return;
        }
        req.userId = user.userId;
        next();
    });
}

module.exports = jwt_auth;
