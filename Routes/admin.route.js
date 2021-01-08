const express = require('express');
const modelCourse=require('../Models/courses.model');
const modelField=require('../Models/routeCourse.model');
const modelTeacher=require('../Models/teacher.model');
const router = express.Router();

router.get('/dashboad',async (req,res)=>{
    const row=await modelCourse.quantityCourses();
    const field=await modelField.quantityField();
    const teacher=await modelTeacher.quantityTeacher();
    res.render('admin/index',{
        layout:"main_admin",
        quantityCourses:row.quantityCourses,
        quantityField:field.quantityField,
        quantityTeacher:teacher.quantityTeacher,
    });
});

router.get('/course',async (req,res)=>{
    res.render('admin/course',{
        layout:"main_admin",
    });
});

router.get('/category',async (req,res)=>{
    res.render('admin/category',{
        layout:"main_admin",
    });
});

router.get('/chart',async (req,res)=>{
    res.render('admin/chart',{
        layout:"main_admin",
    });
});

router.get('/teacher',async (req,res)=>{
    res.render('admin/teacher',{
        layout:"main_admin",
    });
});



module.exports = router;