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
    const rows=await modelCourse.getCoursesByRouteId(id);
    res.render('users/courses',{
        courses:rows,
        // empty:rows.length===0
    });
})
module.exports=router;