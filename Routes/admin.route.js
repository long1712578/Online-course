const express = require('express');
const modelCourse=require('../Models/courses.model');
const modelField=require('../Models/routeCourse.model');
const modelTeacher=require('../Models/teacher.model');
const { route } = require('./courses.route');
const router = express.Router();

router.get('/dashboad',async (req,res)=>{
    const course=await modelCourse.quantityCourses();
    const field=await modelField.quantityField();
    const teacher=await modelTeacher.quantityTeacher();
    res.render('admin/index',{
        layout:"main_admin",
        quantityCourses:course.quantityCourses,
        quantityField:field.quantityField,
        quantityTeacher:teacher.quantityTeacher,
    });
});

router.get('/course',async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const condition='';
    const courses= await modelCourse.getCoursesAll(page,condition);
    const pages = [];
            for (let i = 0; i < courses.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page};
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < courses.pageTotal) {
                navs.next = page + 1;
            }
    res.render('admin/course',{
        layout:"main_admin",
        courses:courses.rourses,
        pages:pages,
        navs:navs
    });
});

router.get('/course/delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    await modelCourse.deleteCourse(id);
    res.redirect('/admin/course');
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
    const page = parseInt(req.query.page) || 1;
    const condition='';
    const courses= await modelTeacher.getTeacherAll();
    const pages = [];
            for (let i = 0; i < courses.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page};
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < courses.pageTotal) {
                navs.next = page + 1;
            }
    res.render('admin/teacher',{
        layout:"main_admin",
    });
});



module.exports = router;