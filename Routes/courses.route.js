const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelCategory=require('../Models/category.model');
const modelVideo=require('../Models/video.model');
const { getVideoDeatilAll } = require('../Models/video.model');
const db = require('../utils/db');
const router=express.Router();

router.get('/courses/:id', async(req,res)=>{
    const id= parseInt(req.params.id);
    const video=parseInt(req.query.video) || 1;
    const checkUser=req.session.isAuth;
    if(checkUser===true){
        //TangView len 1
        await modelCourses.increaseView(id);
    }
    const courseDetail=await getVideoDeatilAll(id,video);
    const coursesList=await modelVideo.getVideoDeatilList(id);
    res.render('users/coursesDetail',{
        Detail:courseDetail,
        List: coursesList,
    });
});


router.get('/courses', async(req,res)=>{
    const rowsCat=await modelCategory.getCategoryAll();

    const cat=parseInt(req.query.category)||0;
    const page=parseInt(req.query.page)||1;
    const courseStar=[];
    if(cat===0){
        const rows=await modelCourses.getCoursesAll(page);
        rows.rourses.forEach(element => {
        
        
            stars=[];
            for(let i=0;i<element.rating;i++){
                stars.push({value:i});
            }
            courseStar.push({star:stars,courses:element});
        }); 
        const pages=[];
    for (let i=0; i< rows.pageTotal;i++){
        pages[i]= {value: i+1, active: (i+1)===page,cat:cat};
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
        courseStar:courseStar,
        category:rowsCat,
        pages:pages,
        navs: navs,
        
        // empty:rows.length===0
    });
    }
    // --------
    if(cat===1 || cat===2){
        const rows=await modelCourses.getCoursesCatAll(cat,page)
        rows.rourses.forEach(element => {
        
        
            stars=[];
            for(let i=0;i<element.rating;i++){
                stars.push({value:i});
            }
            courseStar.push({star:stars,courses:element});
        });
        const pages=[];
    for (let i=0; i< rows.pageTotal;i++){
        pages[i]= {value: i+1, active: (i+1)===page,cat:cat};
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
        courseStar:courseStar,
        category:rowsCat,
        pages:pages,
        navs: navs,
        // empty:rows.length===0
    }); 
}
});

router.post('/courses',async(req,res)=>{
    const cat=parseInt(req.query.category)||0;
    //const cat=req;
    const page=parseInt(req.query.page)||1;
   
    const rowsCat=await modelCategory.getCategoryAll();
    let keyWord = req.body.keyWord;
    
        const rows=await modelCourses.getCoursesSearch(page,keyWord);
        const pages=[];
    for (let i=0; i< rows.pageTotal;i++){
        pages[i]= {value: i+1, active: (i+1)===page,cat:cat};
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
        category:rowsCat,
        pages:pages,
        navs: navs,
        
        // empty:rows.length===0
    });
});

router.post('/course-rating',async(req,res)=>{
    const userId= req.session.authUser.Id;
    if(userId==='undefined'){
        res.redirect('/signIn')
    }
    const rating={
        courseId: req.body.course,
        rating: req.body.rating,
        userId:userId
    }
    await modelCourses.addRating(rating);
    await modelCourses.updateRating(req.body.course);
    res.redirect(req.headers.referer);
})

module.exports=router;