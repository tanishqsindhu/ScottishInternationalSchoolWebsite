const express = require('express');
const router = express.Router();
const app = express();
const catchAsync = require('../utils/catchAsync');
const NewsLetter = require('../models/newsLetter');

app.post('/newsLetterEmail',catchAsync(async(req,res)=>{
    const{email}=req.body;
    const newEmail = await NewsLetter.findOne({});
    newEmail.email.push(email);
    await newEmail.save();
    res.redirect('/');
}))

module.exports = router;