const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url:String,
    filename:String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_300')
});

const NewsSchema=new Schema({
    title:String,
    secondaryTitle:String,
    date:String,
    month:String,
    year:Number,
    shortDescription:String,
    paragraph1:String,
    paragraph2:String,
    paragraph3:String,
    paragraph4:String,
    paragraph5:String,
    author:String,
    images:[ImageSchema],
})

module.exports = mongoose.model('NewsArticles', NewsSchema);