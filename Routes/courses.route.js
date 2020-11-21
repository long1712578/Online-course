const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelCategory=require('../Models/category.model');
const router=express.Router();

router.get('/courses', async(req,res)=>{
    const rows=await modelCourses.getCoursesAll();
    const rows1=await modelCategory.getCategoryAll();
    res.render('users/courses',{
        courses:rows,
        category:rows1,
        // empty:rows.length===0
    });
})
module.exports=router;