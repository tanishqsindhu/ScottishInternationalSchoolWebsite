const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../utils/catchAsync');
const users=require('../controllers/user')
const{isAdmin}=require('../middleware');

router.route('/register')
    .get( isAdmin,users.renderRegister)
    .post(isAdmin,catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login);

router.get('/logout', users.logout)

module.exports=router;