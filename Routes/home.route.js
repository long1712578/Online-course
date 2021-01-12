const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelRoute=require('../Models/routeCourse.model');
const modelCategory=require('../Models/category.model');
const router=express.Router();

router.get('/home', async(req,res)=>{
    const mCourses=await modelCourses.getCoursesAll(1);
    const mRout=await modelRoute.getRouteAll(1);
    const mCategory =await modelCategory.getCategoryAll();
    const mCourseTOP10=await modelCourses.getCoursesTopTen();
    const mCourseView= await modelCourses.getCoursesViewTen();
    let coursesStar=[];
    let courseTop10Star=[];
    let courViewStar=[];
    mCourses.rourses.forEach(element => {
        
        
        stars=[];
        for(let i=0;i<element.rating;i++){
            stars.push({value:i});
        }
        coursesStar.push({star:stars,courses:element});
    }); 

    mCourseTOP10.forEach(element => {
        stars=[];
        for(let i=0;i<element.rating;i++){
            stars.push({value:i});
        }
        courseTop10Star.push({star:stars,courses:element});
    }); 

    mCourseView.forEach(element => {
        
        
        stars=[];
        for(let i=0;i<element.rating;i++){
            stars.push({value:i});
        }
        courViewStar.push({star:stars,courses:element});
        
    }); 
    res.render('users/home',{
        coursesStar:coursesStar,
        route: mRout.category,
        category: mCategory,
        courseTop10Star:courseTop10Star,
        courViewStar:courViewStar,
        // empty:rows.length===0
    });
})
module.exports=router;