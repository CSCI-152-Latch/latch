const jwt = require("jsonwebtoken");
const config = require("config");
const Friend = require('../models/Friend');

// Check if user is valid 
const auth = (req, res, next) => {
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

// Check if both user are friend 
const is_friend = (req, res, next) => {
    try {
        const { newRequester, newSpender } = req.body;
        Friend.findOne(
            { 
                _id: newRequester, 
                friends: newSpender 
            },
            (_, result) => {
                if (result) {
                    return res.status(500).send("This user is your friend already"); 
                }
                else {
                    next();
                }
            }
        );
    }
    catch (err) {
        res.status(500).send(err);
    }
    
};

// Check if the user is already a request (friend)
const is_request = (req, res, next) => {
    try {
        const { newRequester, newSpender } = req.body;
        Friend.findOne(
            {
                _id: newRequester,
                requesting: newSpender
            },
            (_, result) => {
                if (result) {
                    return res.send('You have already requested this user!'); 
                }
                else {
                    next();
                }
            }
        ); 
    }
    catch (err) {
        res.status(500).send(err);
    }
}

// Check if user doesn't have connection
const not_related = (req, res, next) => {
    try {
        const { currRequester, currSpender } = req.body;
        Friend.findOne(
            {
                _id: currRequester,
                requesting: currSpender
            },
            (_, result) => {
                if (result) {
                    next();
                }
                else {
                    return res.send('You dont know this user at all!'); 
                }
            }
        ); 
    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    auth,
    is_friend,
    is_request,
    not_related
}
