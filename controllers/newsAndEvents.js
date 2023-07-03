const NewsArticles = require('../models/newsAndEvents');
const{cloudinary} = require('../cloudinary');


module.exports.home=async(req,res)=>{
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{news});
}

module.exports.renderAddForm = (req,res)=>{
    res.render('newsAndEvents/addNewsAndEvents');
}

module.exports.add=async(req,res)=>{
    const imgs=req.files.map(f=>({url:f.path,filename:f.filename}));
    const newsArticle = new NewsArticles({...req.body.article})
    newsArticle.images.push(...imgs);
    await newsArticle.save();
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{news});
}

module.exports.newsArticle = async(req,res)=>{
    const news = await NewsArticles.findById(req.params.id)
    res.render('newsAndEvents/EventPage',{news});
}

module.exports.articleEdit=async(req,res)=>{
    const news = await NewsArticles.findById(req.params.id);
    if(!news){
        req.flash('error', 'Was not able to find that Menu');
        return res.redirect('/news-events')
    }
    res.render('newsAndEvents/editNewsAndEvents',{news});
}

module.exports.articleUpdate=async(req,res)=>{
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
}

module.exports.deleteArticle=async(req,res)=>{
    const newsArticle = await NewsArticles.findById(req.params.id);
    if(!newsArticle){
        req.flash('error', 'Was not able to find that News Article');
        return res.redirect('/news-events')
    }
    for(let filename of newsArticle.images){
        await cloudinary.uploader.destroy(filename);
    }
    await NewsArticles.findByIdAndDelete(req.params.id);
    const successMessage = 'successDelete';
    const news = await NewsArticles.find({});
    res.render('newsAndEvents/homePage',{successMessage,news});
}