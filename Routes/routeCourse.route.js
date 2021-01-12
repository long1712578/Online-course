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
        navs:navs,
        pages:pages
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