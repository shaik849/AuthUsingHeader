const jwt = require('jsonwebtoken');
const middleware = (req, res, next) => {

    const token = req.headers.authorization;
    if(token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
    if(err){
        res.status(401).json({
                    message: 'No token provided or token invalid.'
                })
    }
    else{
        next()
    }
    })
}
    else {
        return res.status(401).json({
            message: 'No token provided or token invalid.'
        })
    
}
}

module.exports = middleware