const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelRoute=require('../Models/routeCourse.model');
const modelCategory=require('../Models/category.model');
const router=express.Router();

router.get('/home', async(req,res)=>{
    const mCourses=await modelCourses.getCoursesAll(1);
    const mRout=await modelRoute.getRouteAll();
    const mCategory =await modelCategory.getCategoryAll();
    const mCourseTOP10=await modelCourses.getCoursesTopTen();
    const mCourseView= await modelCourses.getCoursesViewTen();
    console.log("top10", mCourseTOP10);
    res.render('users/home',{
        courses:mCourses.rourses,
        route: mRout,
        category: mCategory,
        coursesTop10:mCourseTOP10,
        courseView: mCourseView,
        // empty:rows.length===0
    });
})
module.exports=router;