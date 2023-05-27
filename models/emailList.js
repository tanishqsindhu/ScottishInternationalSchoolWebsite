const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailListSchema=new Schema({
    email:[String],
    date:Date
})

module.exports = mongoose.model('EmailList', EmailListSchema);