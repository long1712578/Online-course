const express=require('express');
const modelRoute=require('../Models/routeCourse.model');
const router=express.Router();

router.get('/coursesRoute', async(req,res)=>{
    const rows=await modelRoute.getRouteAll();
    res.render('users/coursesRoute',{
        route:rows,
        // empty:rows.length===0
    });
})
module.exports=router;