const jwt= require('jsonwebtoken')
const joi = require('joi')
const _=require('lodash')
const bcrypt= require('bcrypt')
const { User } = require('../model/user')
const express = require('express')
const router = express()

router.post('/', async (req,res)=>{
    const {error}=validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email and password')

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email and password')

    const token = jwt.sign({_id:user._id},'jwtPrivateKey')
    res.send(token)
})

function validateUser(user){
    const schema = {
        email:joi.string().min(5).max(225).required().email(),
        password:joi.string().min(5).max(202).required()
    }
    return joi.validate(user,schema)
}
module.exports=router;