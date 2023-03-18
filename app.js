const express = require("express");

const mongoose = require("mongoose");

const app = express();

const env = require("dotenv").config()

const bodyParser = require("body-parser")
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = require("./Router/router")


app.use("",router)

const url = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.l162asa.mongodb.net/myData`

async function main(){
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{console.log("connected.....")})
}

main().catch(err => console.log(err))


app.listen(process.env.port, ()=>{
    console.log(`Server is running on port ${process.env.port}`)
} )