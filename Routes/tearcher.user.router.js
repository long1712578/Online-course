const express=require('express');
const modelTeacher=require('../Models/teacher.model');
const router=express.Router();

router.get('/teacher', async(req,res)=>{
    const rows=await modelTeacher.getTeacherAll();
    res.render('users/teacher',{
        teacher:rows,
    });
})
module.exports=router;