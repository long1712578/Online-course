const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelRoute=require('../Models/routeCourse.model');
const router=express.Router();

router.get('/home', async(req,res)=>{
    const mCourses=await modelCourses.getCoursesAll(1);
    const mRout=await modelRoute.getRouteAll();
    res.render('users/home',{
        courses:mCourses.rourses,
        route: mRout,
        // empty:rows.length===0
    });
})
module.exports=router;