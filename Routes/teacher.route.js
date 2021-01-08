const express=require('express');
const modelTeacher=require('../Models/teacher.model');
const router=express.Router();

router.get('/', async(req,res)=>{
    
    //const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/index',{
        // teacher:rows,
        // empty:rows.length===0
    });
})
router.get('/profile', async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/profile',{
        teacher:rows,
        // empty:rows.length===0
    });
})
router.get('/my-course',async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/my-course',{
        teacher:rows,
        // empty:rows.length===0
    });
})
router.get('/chart',async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/chart',{
        teacher:rows,
        // empty:rows.length===0
    });
})
router.get('/help',async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('teacher/help',{
        teacher:rows,
        // empty:rows.length===0
    });
})
module.exports=router;
