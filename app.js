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
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport =require('passport');
const LocalStrategy=require('passport-local')
const multer=require('multer');
const {storage} = require('./cloudinary')
const upload=multer({storage});

const ExpressError = require('./utils/ExpressError');

// Route Imports
const beyondClassroomRoute=require('./routes/beyondClassroom')
const accomplishmentsRoute=require('./routes/accomplishments')
const newsAndEventsRoute=require('./routes/newsAndEvents')
const newsLetterRoute=require('./routes/newsLetter')
const userRoute=require('./routes/user')
const publicationsRoute =require('./routes/publications');

// Models
const User = require('./models/user');
const newsAndEvents = require('./models/newsAndEvents');
const ContactUs = require('./models/contactUs');

// environment variables
const secret=process.env.SECRET;
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
    .then(()=>{
    console.log("MONGO CONNECTION OPEN!!!")
    })
.catch((err)=>{
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

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

//Session Store on DataBase
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on('error',function(e){
    console.log("SESSION STORE ERROR",e)
})

//Session configure
const sessionConfig = {
    store,
    name:'messScottish',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        SameSite:'strict',
        expires: Date.now() + 1000 * 60 * 60 * 3,
        maxAge: 1000 * 60 * 60 * 3
    }
}
//using session and flash
app.use(session(sessionConfig))
app.use(flash());

// User Login Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setting local variables
app.use((req, res, next) => {
    res.locals.errorMessage = '';
    res.locals.successMessage = '';
    res.locals.currentUser=req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/',async(req,res)=>{
    const news = await newsAndEvents.find({});
    res.render('home',{news});
})

app.get('/gallery',(req,res)=>{
    res.render('gallery');
})
app.get('/contact-us',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('contact-us');
})
app.post('/contact-us',(req,res)=>{
    const {user}=req.body;
    const date = Date.now();
    const newContact = new ContactUs({...user,date})
    newContact.save();
    res.redirect('/')
})
app.use('/beyond-classroom',beyondClassroomRoute)
app.use('/newsLetter',newsLetterRoute)
app.use('/news-events',newsAndEventsRoute)
app.use('/accomplishments',accomplishmentsRoute)
// app.use('/publications',publicationsRoute)
app.use('/',userRoute)

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
app.get('/principal-message',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('principalsMessage');
})
app.get('/director-message',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('directorsMessage');
})
app.get('/jobs',(req,res)=>{
    res.render('jobOpening')
})

// app.get('/calenders',(req,res)=>{
//     // const errorMessage='underConstruction'
//     res.render('calenders/homePage');
// })
// app.get('/calenders/add',(req,res)=>{
//     res.render('calenders/addForm');
// })
// app.post('/calenders',(req,res)=>{
//     console.log(req)
//     res.render('calenders/HomePage');
// })

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