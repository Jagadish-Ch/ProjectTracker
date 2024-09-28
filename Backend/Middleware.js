const jwt = require("jsonwebtoken");

module.exports = function( req, res, next){
    try {
        let token = req.header("x-token");
        if(!token){
            return res.send("Token Not Found...!");
        }
        let decode = jwt.verify(token, 'jwtSecretKey');
        req.user = decode.user
        next();
    } 
    catch (err) {
        console.log(err);
        return res.send("Invalid Token...!");
    }
}