const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const router = express.Router();
const userModel=require('../Models/user.model');
const { add } = require('../utils/db');
router.get('/signUp', async function (req, res) {
    res.render('account/signUp');
  })
  
router.post('/signUp', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = moment(req.body.DOB).format('YYYY-MM-DD');
  const gender=parseInt(req.body.gender);
  const user = {
    UserName: req.body.username,
    Password: hash,
    dob: dob,
    FullName: req.body.fullname,
    email: req.body.email,
    address:req.body.address,
    phone:req.body.phoneNumber,
    gender:gender,
    type: req.body.typeAccount,
    image: req.body.image,
    describe:req.body.describe,
    level:req.body.level
    
  }
  
  await userModel.add(user);
  res.render('account/signIn');
})

router.get('/signIn', async function (req, res) {
  res.render('account/signIn');
})
router.post('/signIn', async (req,res)=>{
 
  const user = await userModel.getUserByUserName(req.body.username);
  
  if (user === null) {
    return res.render('account/signIn', {
      err_message: 'Invalid username or password.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.Password);
  if (ret === false) {
    return res.render('account/signIn', {
      err_message: 'Invalid username or password.'
    });
  }

  req.session.isAuth=true;
  req.session.authUser=user;
  

  // let url = req.session.retUrl || '/';
  if(user.type===1){
    //req.session.cart=[];
    res.redirect('/user/home');
  }else if(user.type===2){
    res.redirect('/teacher')
  }else{
    res.redirect('/admin/dashboad')
  }
 
})

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.getUserByUserName(username);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
})
router.post('/logout', async function (req, res) {
  req.session.isAuth = false;
  req.session.authUser = null;
  req.session.cart = [];
  res.redirect(req.headers.referer);
})

router.get('/profile',async (req,res)=>{
  if(req.session.isAuth===false){
    res.redirect('/signIn')
  }
  const userId= req.session.authUser.Id;
  const rows= await userModel.getUserById(userId);
  res.render('account/profile',{
    myUser: rows,
  });
})
router.post('/profile', async(req,res)=>{
  if(req.session.isAuth===false){
    res.redirect('/signIn')
  }
  const userId= req.session.authUser.Id;
  const Dob = moment(req.body.dob).format('YYYY-MM-DD');
  const hash = bcrypt.hashSync(req.body.password, 10);
    const FullName= req.body.fullname;
    const Email=req.body.email;
    const phone= req.body.phoneNumber;
    const Gender=req.body.gender;
    const dob=Dob;
    const Address=req.body.address;
    const UserName=req.body.username;
    const Password=hash;

  await userModel.updateProfile(userId,FullName, Email, phone, Gender, dob, Address, UserName,Password);
  res.redirect('/profile');
})
module.exports=router;