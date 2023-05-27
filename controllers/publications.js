const NewsLetter = require('../models/newsLetter');

module.exports.home =(req,res)=>{
    // const errorMessage='underConstruction'
    res.render('publications/HomePage');
}

module.exports.renderAddForm =(req,res)=>{
    res.render('publications/addForm');
}

module.exports.add=async(req,res)=>{
    const imgs={url:req.file.path,filename:req.file.filename};
    const newsLetter = new NewsLetter({...req.body.newsLetter})
    newsLetter.images=imgs;
    await newsLetter.save();
    const news = await NewsLetter.find({});
    res.render('publications/HomePage',{news});
}