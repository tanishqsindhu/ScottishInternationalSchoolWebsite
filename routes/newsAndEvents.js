const express = require('express');
const router = express.Router();
const app = express();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn,isOffice, validateStudent } = require('../middleware');
const newsLetter=require('../controllers/newsLetter');
const multer=require('multer');
const {storage} = require('../cloudinary')
const upload=multer({storage});

app.get('/',catchAsync(async(req,res)=>{
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{news});
}))
app.get('/news-events/add',(req,res)=>{
    res.render('newsAndEvents/addNewsAndEvents');
})
app.post('/news-events/add',upload.array('image'),catchAsync(async(req,res)=>{
    const imgs=req.files.map(f=>({url:f.path,filename:f.filename}));
    const newsArticle = new NewsArticles({...req.body.article})
    newsArticle.images.push(...imgs);
    await newsArticle.save();
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{news});
}))
app.get('/news-events/:id',catchAsync(async(req,res)=>{
    const news = await NewsArticles.findById(req.params.id)
    res.render('newsAndEvents/EventPage',{news});
}))
app.get('/news-events/:id/edit',catchAsync(async(req,res)=>{
    const news = await NewsArticles.findById(req.params.id)
    res.render('newsAndEvents/editNewsAndEvents',{news});
}))
app.put('/news-events/:id',upload.array('image'),catchAsync(async(req,res)=>{
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
}))

module.exports = router;