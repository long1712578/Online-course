const express=require('express');
const modelTeacher=require('../Models/teacher.model');
const router=express.Router();
const bcrypt = require('bcryptjs');
const moment = require('moment');
const userModel=require('../Models/user.model');
const courseModel=require('../Models/courses.model.js');
const { add } = require('../utils/db');

router.get('/', async(req,res)=>{
  if(req.session.authUser){
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/home_gv',{
        teacher:rows
    });
  }else{
    res.render('teacher/login',{
        err_message: 'Please login to use this function'
    });
  }

})
router.get('/createCourse', async(req,res)=>{
  if(req.session.authUser){
    res.render('teacher/createCourse');
  }else{
    res.render('teacher/login',{
        err_message: 'Please login to use this function'
    });
  }

})
router.post('/createCourse',async(req,res)=>{
  if(req.session.authUser){
    let newCourse={};
    newCourse.name=req.body.nameCourse;
    newCourse.described=req.body.describe;
    newCourse.price=req.body.price;
    newCourse.rating=Math.round(Math.random()*5);
    newCourse.image='nodejs.png';
    newCourse.idroute=Math.round(Math.random()*5);
    newCourse.idTeacher=req.session.authUser.Id;
    newCourse.idCategory=0;
    newCourse.dateCourse=moment(Date.now()).format('YYYY-MM-DD');
    newCourse.view=0;
    await courseModel.addCourseFromTeacher(newCourse);
    res.send('da add thanh cong')
  }else{
    res.render('teacher/login',{
        err_message: 'Please login to use this function'
    });
  }
})
router.get('/addChuong', async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/addChuong',{
        teacher:rows,
        // empty:rows.length===0
    });
})
router.get('/login', async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/login',{
        teacher:rows,
        // empty:rows.length===0
    });
})
router.get('/register', async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/register',{
        teacher:rows,
        // empty:rows.length===0
    });
})
router.post('/auth/register', async(req,res)=>{
  const hash = bcrypt.hashSync(req.body.password, 10);
  const dob = moment(req.body.DOB).format('YYYY-MM-DD');
  const gender=2;//chua xong
  const user = {
    UserName: req.body.username,
    Password: hash,
    dob: dob,
    FullName: req.body.name,
    email: req.body.email,
    address:req.body.address,
    phone:req.body.phoneNumber,
    gender:gender,
    type: 2,
    image: 'chua co',
    describe:req.body.describe,
    level:req.body.level

  }

  await userModel.add(user);
  return res.render('teacher/login',{
    err_message: 'create account successly, please login to continue'
  });
})
router.post('/login',async(req,res)=>{
  const user = await userModel.getUserByUserName(req.body.username);

  if (user === null) {
    return res.render('teacher/login', {
      err_message: 'Invalid username or password.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.Password);
  if (ret === false) {
    return res.render('teacher/login', {
      err_message: 'Invalid username or password.'
    });
  }

  req.session.isAuth=true;
  req.session.authUser=user;


  if(user.type===2){
    res.redirect('/teacher')
  }else{
    return res.render('teacher/login', {
      err_message: 'Invalid username or password.'
    });
  }

})
router.get('/myCourse', async (req,res)=>{
  if(req.session.authUser){
    let myCourses=await courseModel.teacherGetCourse(req.session.authUser.Id);
    console.log(myCourses);
    res.send('dang xuli')
  }else{
    res.render('teacher/login',{
        err_message: 'Please login to use this function'
    });
  }
})
router.get('/myProfile',(req,res)=>{
  if(req.session.authUser){
    res.render('teacher/myProfile',{
        profile:req.session.authUser
    });
  }else{
    res.render('teacher/login',{
        err_message: 'Please login to use this function'
    });
  }
})
router.post('/myProfile',async(req,res)=>{
  if(req.session.authUser){
    let dataUpdate=req.session.authUser;
    for(p in req.body){
      dataUpdate[p]=req.body[p];
    }
    if(req.body.password=='') dataUpdate.password=req.session.authUser.Password;
    await userModel.updateProfile(dataUpdate.Id,dataUpdate.FullName, dataUpdate.email, dataUpdate.phonenumber, dataUpdate.gender, dataUpdate.dob, dataUpdate.address, dataUpdate.UserName,dataUpdate.password);
    req.session.isAuth = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
  }else{
    res.render('teacher/login',{
        err_message: 'update successly, login to use this function'
    });
  }

})
router.get('/reset', async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/reset',{
        teacher:rows,
        // empty:rows.length===0
    });
})
module.exports=router;
