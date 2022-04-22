const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const mid1 = function(req, res, next) {
    //     const validToken=req.headers["x-auth-token"]
    //     console.log(validToken)
    // if(!validToken) return res.send({msg:"token is required"})

    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];


    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken)
        return res.send({ status: false, msg: "token is invalid" });

    next()
        //console.log(token);
}

module.exports.mid1 = mid1