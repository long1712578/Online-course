const express=require('express');
const modelCourses=require('../Models/courses.model');
const router=express.Router();

router.get('/courses', async(req,res)=>{
    const rows=await modelCourses.getCoursesAll();
    res.render('users/courses',{
        courses:rows,
        // empty:rows.length===0
    });
})
module.exports=router;