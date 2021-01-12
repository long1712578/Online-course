const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const router = express.Router();
const userModel=require('../Models/user.model');
const modelOrder=require('../Models/order.model');
const modelOrderDetail=require('../Models/order-detail.model');
const modelCourseLike=require('../Models/courseLike.model');
const { add } = require('../utils/db');
var nodemailer=require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pdlong578@gmail.com',
    pass: 'long1712578'
  }
});

router.get('/signUp', async function (req, res) {
    res.render('account/signUp');
  })
  
router.post('/signUp', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = moment(req.body.DOB).format('YYYY-MM-DD');
  const gender=parseInt(req.body.gender);
  const active=0;
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
    level:req.body.level,
    isActive:active
  }
  var mailOptions = {
    from: 'pdlong578@gmail.com',
    to: req.body.email,
    subject: 'Register success!',
    text: 'You had regiater account of my course online!'
  };
  console.log("mail",mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
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
    res.redirect('/signIn');
    return 0;
  }
  const userId= req.session.authUser.Id;
  const rows= await userModel.getUserById(userId);
  const course=await modelOrder.getListOrderByIdUser(userId);
  const courseLike=await modelCourseLike.getLikeByUserId(userId);
  res.render('account/profile',{
    myUser: rows,
    courses: course,
    courseLike:courseLike
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
}),
router.get('/profile-delete/:id',async(req,res)=>{
  const id=parseInt(req.params.id);
  await modelOrderDetail.delete(id);
  res.redirect('/profile');
});
module.exports=router;