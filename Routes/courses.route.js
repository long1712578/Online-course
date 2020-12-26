const express = require('express');
const modelCourses = require('../Models/courses.model');
const modelCategory = require('../Models/category.model');
const modelVideo = require('../Models/video.model');
const { getVideoDeatilAll } = require('../Models/video.model');
const db = require('../utils/db');
const router = express.Router();

router.get('/courses/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const video = parseInt(req.query.video) || 1;
    const checkUser = req.session.isAuth;
    if (checkUser === true) {
        //TangView len 1
        await modelCourses.increaseView(id);
    }
    const courseDetail = await getVideoDeatilAll(id, video);
    const coursesList = await modelVideo.getVideoDeatilList(id);
    res.render('users/coursesDetail', {
        Detail: courseDetail,
        List: coursesList,
    });
});

router.get('/courses', async (req, res) => {
    const rowsCat = await modelCategory.getCategoryAll();

    const cat = parseInt(req.query.category) || 0;
    const page = parseInt(req.query.page) || 1;
    const courseStar = [];
    const condition='';
    

    if (cat === 0) {
            
            let rows = await modelCourses.getCoursesAll(page,condition);
            rows.rourses.forEach(element => {
                stars = [];
                for (let i = 0; i < element.rating; i++) {
                    stars.push({ value: i });
                }
                courseStar.push({ star: stars, courses: element });
            });
            const pages = [];
            for (let i = 0; i < rows.pageTotal; i++) {
                pages[i] = { value: i + 1, active: (i + 1) === page, cat: cat };
            }
            const navs = {};
            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < rows.pageTotal) {
                navs.next = page + 1;
            }
            //Phan trang
            res.render('users/courses', {
                courseStar: courseStar,
                category: rowsCat,
                pages: pages,
                navs: navs,
    
                // empty:rows.length===0
            });

    }
    // --------
    if (cat === 1 || cat === 2) {
        const rows = await modelCourses.getCoursesCatAll(cat, page)
        rows.rourses.forEach(element => {


            stars = [];
            for (let i = 0; i < element.rating; i++) {
                stars.push({ value: i });
            }
            courseStar.push({ star: stars, courses: element });
        });
        const pages = [];
        for (let i = 0; i < rows.pageTotal; i++) {
            pages[i] = { value: i + 1, active: (i + 1) === page, cat: cat };
        }
        const navs = {};
        if (page > 1) {
            navs.prev = page - 1;
        }
        if (page < rows.pageTotal) {
            navs.next = page + 1;
        }
        //Phan trang
        res.render('users/courses', {
            courseStar: courseStar,
            category: rowsCat,
            pages: pages,
            navs: navs,
            // empty:rows.length===0
        });
    }
});

router.post('/courses', async (req, res) => {
    const cat = parseInt(req.query.category) || 0;
    //const cat=req;
    const page = parseInt(req.query.page) || 1;
    const courseStar = [];
    const rowsCat = await modelCategory.getCategoryAll();
    let keyWord = req.body.keyWord;
    let value=+req.body.level;
    let value1=+req.body.price;
    let rows = await modelCourses.getCoursesSearch(page, keyWord);
     if(value>0|| req.body.level!=='NaN'){
        if(value===1){
            rows = await modelCourses.getCoursesPriceDESC(page);
        }else if(value===2){
            rows=await modelCourses.getCoursesPriceASC(page)
        }else if(value===3){
            rows=await modelCourses.getCoursesRateDesc(page);
        }else if(value===4){
            rows=await modelCourses.getCoursesRateASC(page);
        }
     }
     if(value1>0|| req.body.price!=='NaN'){
        if(value1===1){
            console.log("a");
            rows = await modelCourses.getCoursesPriceUnderOneMillion(page);
        }else if(value1===2){
            console.log("b");
            rows=await modelCourses.getCoursesPriceOneToTwoMillion(page)
        }else if(value1===3){
            console.log("c");
            rows=await modelCourses.getCoursesPriceOnTwoMillion(page);
        }
     }
      
    rows.rourses.forEach(element => {
        stars = [];
        for (let i = 0; i < element.rating; i++) {
            stars.push({ value: i });
        }
        courseStar.push({ star: stars, courses: element });
    });
    let pages = [];
    for (let i = 0; i < rows.pageTotal; i++) {
        pages[i] = { value: i + 1, active: (i + 1) === page, cat: cat };
    }
    let navs = {};
    if (page > 1) {
        navs.prev = page - 1;
    }
    if (page < rows.pageTotal) {
        navs.next = page + 1;
    }
    //Phan trang
    res.render('users/courses', {
        courseStar: courseStar,
        category: rowsCat,
        pages: pages,
        navs: navs,
    });
});


router.post('/course-rating', async (req, res) => {
    const userId = req.session.authUser.Id;
    if (userId === 'undefined') {
        res.redirect('/signIn')
    }
    const rating = {
        courseId: req.body.course,
        rating: req.body.rating,
        userId: userId
    }
    await modelCourses.addRating(rating);
    await modelCourses.updateRating(req.body.course);
    res.redirect(req.headers.referer);
})

module.exports = router;