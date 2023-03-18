const mongoose =  require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;


const userSchema = new Schema({
    email: {
        type : String,
        required : [true, "email required"],
        unique : true,
        validate : [isEmail, "Please enter valid email"]
    },
    password : {
        type : String,
        required :true
    },
    firstname: {
        type : String,
        required : [true, "firstname required"]
    },
    lastname: {
        type : String,
        required : [true, "lastname required"]  
    },
    companyname : {
        type : String,
        required : [true, "companyname required"]
    },
    role : {
        type : String,
        required : [true, "role required"]
    },
    token:{
        type : String
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt) 
    next();
  })

  userSchema.statics.loggedin = async function (email, password){
    const user = await this.findOne({email: email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        else{
            throw Error("password error")
        }
    }else{
        throw Error("user not found")
    }
}


const data = mongoose.model('user', userSchema);

module.exports = data;