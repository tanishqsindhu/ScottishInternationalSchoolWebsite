const NewsLetter = require('../models/emailList');
const{cloudinary} = require('../cloudinary');

module.exports.addEmail=async(req,res)=>{
    const{email}=req.body;
    const newEmail = await NewsLetter.findOne({});
    newEmail.email.push(email);
    await newEmail.save();
    res.redirect('/');
}

module.exports.renderUnsubscribeForm = (req,res)=>{
    res.render('unsubscribeEmail');
}

module.exports.unsubscribed = async(req,res)=>{
    const email = req.body.email
    await NewsLetter.updateOne({email},{
        $pull: {
            email: email,
        },
    });
    req.flash('success','GoodBye! You have been removed from our mailing list.')
    res.redirect('/')   
}