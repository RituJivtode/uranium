// @ts-check
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const mid1 = function(req, res, next) {
    //     const validToken=req.headers["x-auth-token"]
    //     console.log(validToken)
    // if(!validToken) return res.send({msg:"token is required"})
    try {
        let token = req.headers["x-Auth-token"];
        if (!token) token = req.headers["x-auth-token"];
        if (!token) return res.status(406).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "functionup-thorium");
        if (!decodedToken)
            return res.status(401).send({ status: false, msg: "token is invalid" });
        next()
    } catch (err) {
        res.status(400).send({ status: false, msg: "invalid token, unable to verify" })
    }
    //console.log(token);   
}
module.exports.mid1 = mid1






const authenticate = function(req, req, next) {
    //check the token in request header
    //validate this token

    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    next()
}