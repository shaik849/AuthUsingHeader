const data = require('../Model/model')
const jwt = require("jsonwebtoken")




function createToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY)
}

// error handler
function handleError(err) {
    let errors = {email : '',password : '',firstname : '',lastname : '',company : '',role: ''}
    if(err.code === 11000){
        errors.email = "Email is already registered"
        return errors;
     }
     if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const postData = async (req, res) => {
    const getMyData = new data(req.body)
    let token = createToken(getMyData._id)
    getMyData.token = token;
     try{
        await getMyData.save()
        res.status(201).json({
           message : "data sent successfully",
         })
     }
     catch(err){
        let errors = handleError(err)
        res.status(500).json({"error" : errors})
     }
}



const getData = async (req, res) => {
   try{
    const alldata = await data.find({})
    res.status(200).json(alldata)
   }
   catch(err){
    res.status(400).json({error: err})
   }
}

const login = async (req,res) => {
    const {email, password} = req.body;
    try{
    const user = await data.loggedin(email, password)
    const result = await data.findOne({email: user.email })
    res.status(200).json({ user:
        {
            firstname : result.firstname,
            lastname : result.lastname,
            email : result.email,
            company : result.companyname,
            role : result.role,
            token : result.token
        }  
    })
 }
 catch(err){
    res.status(400).json({error :    "check email or password" })
}
}
module.exports = {getData, postData, login}