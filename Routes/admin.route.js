const express = require('express');
const session = require('express-session');
const modelCourse=require('../Models/courses.model');
const modelField=require('../Models/routeCourse.model');
const modelTeacher=require('../Models/teacher.model');
const modelUser=require('../Models/user.model');
const modelRoute=require('../Models/routeCourse.model');
const { route } = require('./courses.route');
const router = express.Router();
const alert =require('alert');

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

router.post('/course',async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    let keyWord = req.body.keyWord;
    const courses= await modelCourse.getCoursesSearch(page,keyWord);
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
});
router.post('/category-add', async(req,res)=>{
    const name= req.body.name;
    const image=req.body.image;

    const entity={
        name:name,
        image:image
    };
    await modelRoute.add(entity);
    res.redirect('/admin/category')
})

router.get('/category-update/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const category=await modelField.getRouteByID(id);
    res.render('admin/category-update',{
        layout:"main_admin",
        category:category[0]
    })
});

router.post('/category-update',async(req,res)=>{
    let name=req.body.name;
    let id=req.body.id;

    await modelField.updateCategory(id,name);
    res.redirect('/admin/category')
});

router.get('/category-delete/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const rows=await modelRoute.count(id);
    const count=+rows[0].count;
    if(count>0){
        alert("Oops! Something went wrong.");
        res.redirect('/admin/category');
        return;
    }
    await modelRoute.delete(id);
    alert("Xoa thanh cong");
    res.redirect('/admin/category');
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