const jwt = require("jsonwebtoken");
const config = require("config");

// Check if user is valid 
module.exports = (req, res, next) => {
    //we need to get the token from the header so we can access protected routes

    const token = req.header("x-auth-token");

    //no token then no access
    if (!token) {
        return res.status(401).json({ msg: "not authorized, token not present" });
    }

    //verify the token
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "token is either expired or not valid" });
    }
};
