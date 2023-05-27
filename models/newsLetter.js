const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url:String,
    filename:String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_300')
});

const NewsLetterSchema=new Schema({
    title:String,
    documentUrl:String,
    images:ImageSchema,
})

module.exports = mongoose.model('NewsLetter', NewsLetterSchema);