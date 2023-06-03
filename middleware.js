const { studentSchema, orderSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

const User=require('./models/user')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateStudent = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isArticleEditor = async (req, res, next) => {
    if (!req.user.role.includes('articlesEditor')) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/`);
    }
    next();
}
module.exports.isAdmin=async (req, res, next) => {
    if (!req.user.role.includes('admin')) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/`);
    }
    next();
}
module.exports.isMess = async (req, res, next) => {
    if (!(req.user.role=='admin'||req.user.role=='mess')) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/`);
    }
    next();
}

module.exports.validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}