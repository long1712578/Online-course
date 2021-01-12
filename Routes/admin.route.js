const express = require('express');
const session = require('express-session');
const modelCourse=require('../Models/courses.model');
const modelField=require('../Models/routeCourse.model');
const modelTeacher=require('../Models/teacher.model');
const modelUser=require('../Models/user.model');
const { route } = require('./courses.route');
const router = express.Router();

router.get('/dashboad',async (req,res)=>{
    const course=await modelCourse.quantityCourses();
    const field=await modelField.quantityField();
    const teacher=await modelTeacher.quantityTeacher();
    console.log("session",req.session.authUser);
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
    const page = parseInt(req.query.page) || 1;
    const category= await modelField.getRouteAll(page);
    const pages = [];
            for (let i = 0; i < category.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page};
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < category.pageTotal) {
                navs.next = page + 1;
            }
    res.render('admin/category',{
        layout:"main_admin",
        category: category.category,
        pages:pages,
        navs:navs
    });
});

router.get('/category-add', async(req,res)=>{
    res.render('admin/add-category',{
        layout:"main_admin"
    })
})

router.get('/category-edit/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const category=await modelField.getRouteByID(id);
    res.render('admin/update-category',{
        layout:"main_admin",
        category:category[0]
    })
});

router.post('/category-edit',async(req,res)=>{
    let name=req.body.name;
    let image=req.body.image;

    await modelField.updateCategory(id,name,image);
    res.redirect('/admin/category')
});

router.get('/chart',async (req,res)=>{
    res.render('admin/chart',{
        layout:"main_admin",
    });
});

router.get('/teacher',async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const teacher= await modelTeacher.getTeacher(page);
    const pages = [];
            for (let i = 0; i < teacher.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page};
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < teacher.pageTotal) {
                navs.next = page + 1;
            }
    res.render('admin/teacher',{
        layout:"main_admin",
        teachers:teacher.teacher,
        pages:pages,
        navs:navs
    });
});
router.get('/teacher/delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    await modelTeacher.deleteTeacher(id);
    res.redirect('/admin/teacher');
});
router.get('/teacher/add/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    await modelTeacher.reviewTeacher(id);
    res.redirect('/admin/teacher');
});

router.get('/teacher-edit/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const teacher=await modelTeacher.getTeacherById(id);
    res.render('admin/update-teacher',{
        layout:"main_admin",
        teacher:teacher[0]
    })
});

router.post('/teacher-edit',async(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let level=req.body.level;

    await modelTeacher.updateTeacher(id,name,email,phone,level);
    res.redirect('/admin/teacher')
});

router.get('/user',async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const user= await modelUser.getUser(page)
    const pages = [];
            for (let i = 0; i < user.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page};
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < user.pageTotal) {
                navs.next = page + 1;
            }
    res.render('admin/user',{
        layout:"main_admin",
        users:user.users,
        pages:pages,
        navs:navs
    });
});
router.get('/user/delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    await modelUser.delete(id);
    res.redirect('/admin/user');
});

router.get('/user-edit/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const user=await modelUser.getUsersById(id);
    res.render('admin/update-user',{
        layout:"main_admin",
        user:user
    })
});

router.post('/user-edit',async(req,res)=>{
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let phone=req.body.phone;
    let level=req.body.level;

    await modelTeacher.updateTeacher(id,name,email,phone,level);
    res.redirect('/admin/user')
});

router.post('/logout', async function (req, res) {
    req.session.isAuth = false;
    req.session.authUser = null;
    res.redirect('/');
  })



module.exports = router;