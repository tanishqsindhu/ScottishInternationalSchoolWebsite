const User = require('../models/user');

module.exports.renderRegister=(req, res) => {
    res.render('users/register');
}

module.exports.register=async(req,res,next)=>{
    try{
        const {username,password}= req.body
        const user = await new User({username});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','Welcome to Scottish Mess System');
            res.redirect('/');
        });
    } catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }

}

module.exports.renderLogin=(req,res)=>{
    res.render('users/login');
}

module.exports.login=(req,res)=>{
    const redirectUrl= req.session.returnTo || '/';
    req.flash('success','Welcome Back!');
    res.redirect(redirectUrl);
}

module.exports.logout=(req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', "Goodbye!");
        res.redirect('/');
      });
}