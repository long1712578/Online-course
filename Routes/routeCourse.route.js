const express=require('express');
const modelRoute=require('../Models/routeCourse.model');
const modelCourse=require('../Models/courses.model');
const router=express.Router();

router.get('/coursesRoute', async(req,res)=>{
    const rows=await modelRoute.getRouteAll();
    res.render('users/coursesRoute',{
        route:rows,
        // empty:rows.length===0
    });
})
router.get('/coursesRoute/:id', async(req,res)=>{
    const id= parseInt(req.params.id);
    let courseStar=[];
    const rows=await modelCourse.getCoursesByRouteId(id);
    rows.forEach(element => {
        stars = [];
        for (let i = 0; i < element.rating; i++) {
            stars.push({ value: i });
        }
        courseStar.push({ star: stars, courses: element });
    });
   
    res.render('users/courses',{
        courseStar: courseStar,
    });
})
module.exports=router;