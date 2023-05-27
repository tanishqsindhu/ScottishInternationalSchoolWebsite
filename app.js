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
const multer=require('multer');
const {storage} = require('./cloudinary')
const upload=multer({storage});
const{cloudinary} = require('./cloudinary');

const ExpressError = require('./utils/ExpressError');

const NewsLetter = require('./models/newsLetter');
const NewsArticles = require('./models/newsAndEvents');

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

//using session and flash
// app.use(session(sessionConfig))
// app.use(flash());

// setting local variables
app.use((req, res, next) => {
    res.locals.currentUser='';
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
app.get('/principal-message',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('principalsMessage');
})
app.get('/director-message',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('directorsMessage');
})
app.get('/login',(req,res)=>{
    const errorMessage='underConstruction';
    res.render('home',{errorMessage});
})

app.get('/publications',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('publications/HomePage');
})
app.get('/publications/add',(req,res)=>{
    res.render('publications/addForm');
})
app.post('/publications',upload.single('image'),(req,res)=>{
    console.log(req)
    res.render('publications/HomePage');
})

app.get('/calenders',(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('calenders/homePage');
})
app.get('/calenders/add',(req,res)=>{
    res.render('calenders/addForm');
})
app.post('/calenders',(req,res)=>{
    console.log(req)
    res.render('calenders/HomePage');
})

app.post('/newsLetterEmail',async(req,res)=>{
    const{email}=req.body;
    const newEmail = await NewsLetter.findOne({});
    newEmail.email.push(email);
    await newEmail.save();
    res.redirect('/');
})

app.get('/news-events',async(req,res)=>{
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{news});
})
app.get('/news-events/add',(req,res)=>{
    res.render('newsAndEvents/addNewsAndEvents');
})
app.post('/news-events/add',upload.array('image'),async(req,res)=>{
    const imgs=req.files.map(f=>({url:f.path,filename:f.filename}));
    const newsArticle = new NewsArticles({...req.body.article})
    newsArticle.images.push(...imgs);
    await newsArticle.save();
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{news});
})
app.get('/news-events/:id',async(req,res)=>{
    const news = await NewsArticles.findById(req.params.id)
    res.render('newsAndEvents/EventPage',{news});
})
app.get('/news-events/:id/edit',async(req,res)=>{
    const news = await NewsArticles.findById(req.params.id)
    res.render('newsAndEvents/editNewsAndEvents',{news});
})
app.put('/news-events/:id',upload.array('image'),async(req,res)=>{
    const imgs=req.files.map(f=>({url:f.path,filename:f.filename}));
    const newsArticle = await NewsArticles.findByIdAndUpdate(req.params.id, { ...req.body.article });
    newsArticle.images.push(...imgs);
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await newsArticle.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    }
    await newsArticle.save();
    res.redirect(`/news-events/${newsArticle._id}`);
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