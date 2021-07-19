const joi = require('joi')
const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    firstname:{
        type:String,
        maxlength:50,
        minlength:5,
        required:true
    },
    lastname:{
        type:String,
        maxlength:50,
        minlength:5,
        required:true
    },
    username:{
        type:String,
        maxlength:50,
        minlength:5,
        required:true
    },
    email:{
        type:String,
        maxlength:250,
        minlength:5,
        required:true,
        unique:true
    },
    password:{
        type:String,
        maxlength:1025,
        minlength:5,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        required:true
    }
}))

function validateUser(user){
    const schema={
        firstname:joi.string().min(5).max(50).required(),
        lastname:joi.string().min(5).max(50).required(),
        username:joi.string().min(5).max(50).required(),
        email:joi.string().min(5).max(120).required().email(),
        password:joi.string().min(5).max(150).required(),
        role:joi.required()
    }
    return joi.validate(user,schema)
}

exports.User=User
exports.validate=validateUser