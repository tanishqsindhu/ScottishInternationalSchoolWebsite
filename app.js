if(process.env.NODE_ENV!== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app =express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const mongoSantize=require('express-mongo-sanitize');

const ExpressError = require('./utils/ExpressError');

const secret=process.env.SECRET;
const dbUrl = process.env.DB_URL;

// mongoose.connect(dbUrl)
//     .then(()=>{
//     console.log("MONGO CONNECTION OPEN!!!")
//     })
// .catch((err)=>{
//     console.log("OH NO MONGO CONNECTION ERROR!!!!")
//     console.log(err)
// })

// configuring ejs 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// config public dir and decoding form
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
// safety messures
app.use(methodOverride('_method'));
app.use(mongoSantize({replaceWith:'_'}));

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/gallery',(req,res)=>{
    res.render('gallery');
})

app.post('/',(req,res)=>{
    const {email} =req.body;
    res.redirect('/');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const port= process.env.PORT||3000

app.listen(port,()=>{
    console.log(`app is listed on port ${port}`)
})