const jwt= require('jsonwebtoken')
const _=require('lodash')
const bcrypt= require('bcrypt')
const Cryptr = require('cryptr')
cryptr = new Cryptr('sateesh')
const { User,validate } = require('../model/user')
const express = require('express')
const router = express()


router.get('/', async (req,res)=>{
    const users = await User.find().sort({name:1})
    res.send(users)
})
router.post('/', async (req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('user already exists')

    user = new User(_.pick(req.body,['firstname','lastname','username','email','password','role']))
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password,salt)
    Enpassword = await cryptr.encrypt(user.password)
    password = await cryptr.decrypt(Enpassword)

    console.log(Enpassword);
    console.log(password);

    const user1 = await user.save()

    const token = jwt.sign({_id:user._id},'jwtPrivateKey')
    res.header('x-auth-token',token).send(_.pick(user1,['_id','firstname','lastname','username','email','password','role']))
})

module.exports=router;