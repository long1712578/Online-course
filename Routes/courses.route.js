const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelCategory=require('../Models/category.model');
const router=express.Router();

router.get('/courses/:id', async(req,res)=>{
    const id= parseInt(req.params.id);
    const courseDetail=await modelCourses.getCoursesById(id);
    res.render('users/coursesDetail',{
        courseDetail:courseDetail,
    });
});

router.get('/courses', async(req,res)=>{
    const rows1=await modelCategory.getCategoryAll();

    const page=parseInt(req.query.page)||1;
    const rows=await modelCourses.getCoursesAll(page);
    const pages=[];
    for (let i=0; i< rows.pageTotal;i++){
        pages[i]= {value: i+1, active: (i+1)===page};
    }
    const navs={};
    if(page>1){
        navs.prev= page-1;
    }
    if(page<rows.pageTotal){
        navs.next=page+1;
    }
    //Phan trang
    res.render('users/courses',{
        courses:rows.rourses,
        category:rows1,
        pages:pages,
        navs: navs,
        // empty:rows.length===0
    });
});
// router.get('/courses/detail/:id', async(req,res)=>{
//     const id= parseInt(req.params.id);
//     const courseDetail=await modelCourses.getCoursesById(id);
//     res.render('users/coursesDetail',{
//         courseDetail:courseDetail,
//     });
// });
module.exports=router;