const jwt = require("jsonwebtoken")

const authentication = async (req,res,next) => {
    try {
        const token = req.headers["token"]
        if(!token){
            return res.status(400).send({status : false, message : "token not found(please provide token in requests headers)"})
        }

        jwt.verify(token, process.env.SECRET_KEY,(err,decodedToken)=>{
            if(err){
            return res.status(401).send({status : false, message : err.message})
            }

            // making userId globally accssible
            req.userId = decodedToken.userId

            next();
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({status : false, message : "server error in authentication", error : error.message})
    }
}

module.exports = {authentication}