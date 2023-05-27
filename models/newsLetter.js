const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsLetterSchema=new Schema({
    email:[String],
    date:Date
})

module.exports = mongoose.model('NewsLetter', NewsLetterSchema);