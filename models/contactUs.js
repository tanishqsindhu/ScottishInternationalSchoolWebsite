const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUsSchema=new Schema({
    name:String,
    email:String,
    phone:Number,
    message:String,
    date:Date
})

module.exports = mongoose.model('ContactUs', ContactUsSchema);