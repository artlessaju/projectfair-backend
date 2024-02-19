const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//fields -- schema collection
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    github:{
        type:String,
    },
    link:{
        type:String,
    },
    profile:{
        type:String,
    },

})
//model creation - users (mongodb - collection)
const users = mongoose.model("users",userSchema)

module.exports=users