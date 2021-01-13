const express=require('express');
const modelRoute=require('../Models/routeCourse.model');
const modelCourse=require('../Models/courses.model');
const router=express.Router();

router.get('/coursesRoute', async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const rows=await modelRoute.getRouteAll(page);
    
    const pages = [];
            for (let i = 0; i < rows.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page};
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < rows.pageTotal) {
                navs.next = page + 1;
            }
    res.render('users/coursesRoute',{
        route:rows.category,
        pages:pages,
        navs:navs
    });
})
router.get('/coursesRoute/:id', async(req,res)=>{
    const id= parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    let courseStar=[];
    const rows=await modelCourse.getCoursesByRouteId(id,page);
    const pages = [];
    for (let i = 0; i < rows.pageTotal; i++) {
        pages[i] = { value: i + 1, active: (i + 1) === page};
    }
    const navs = {};
    if (page > 1) {
        navs.prev = page - 1;
    }
    if (page < rows.pageTotal) {
        navs.next = page + 1;
    }
    rows.courses.forEach(element => {
        stars = [];
        for (let i = 0; i < element.rating; i++) {
            stars.push({ value: i });
        }
        courseStar.push({ star: stars, courses: element });
    });
   
    res.render('users/courses',{
        courseStar: courseStar,
        pages:pages,
        navs:navs
    });
})
module.exports=router;