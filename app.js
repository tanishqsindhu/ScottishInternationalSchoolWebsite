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
// const flash = require('connect-flash');

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

//using session and flash
// app.use(session(sessionConfig))
// app.use(flash());

// setting local variables
app.use((req, res, next) => {
    res.locals.errorMessage = '';
    next();
})

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/gallery',(req,res)=>{
    res.render('gallery');
})
app.get('/contact-us',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('contact-us');
})
app.get('/accomplishments-academics',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('accomplishments/academics');
})
// app.get('/accomplishments-sports',(req,res)=>{
//     // const errorMessage='underConstruction'
//     res.render('accomplishments/sports');
// })
// app.get('/accomplishments-co-curricular',(req,res)=>{
//     // const errorMessage='underConstruction'
//     res.render('accomplishments/coCurricular');
// })
app.get('/beyond-classroom',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('beyondClassroom/beyond-classroom');
})
app.get('/beyond-classroom-sports',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('beyondClassroom/sports');
})
app.get('/beyond-classroom-co-curricular',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('beyondClassroom/coCurricular');
})
app.get('/about-us',(req,res)=>{
    res.render('about-us');
})
app.get('/admission',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('admissions');
})
app.get('/academics',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('academics');
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