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