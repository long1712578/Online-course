const express=require('express');
const modelCourses=require('../Models/courses.admin.model');

const router=express.Router();


router.get('/course', async(req,res)=>{
    const rows=await modelCourses.getCoursesAdminAll();


    console.log(rows);
    res.render('admin/course',{
        layout:"main_admin",
        courses: rows,
    }
    
    );
});
module.exports=router;