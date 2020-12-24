const express=require('express');
const modelCourses=require('../Models/courses.model');
const modelCategory=require('../Models/category.model');
const modelVideo=require('../Models/video.model');
const { getVideoDeatilAll } = require('../Models/video.model');
const router=express.Router();

router.get('/courses/:id', async(req,res)=>{
    const id= parseInt(req.params.id);
    const video=parseInt(req.query.video) || 1;
    const courseDetail=await getVideoDeatilAll(id,video);
    const coursesList=await modelVideo.getVideoDeatilList(id);
    res.render('users/coursesDetail',{
        Detail:courseDetail,
        List: coursesList,
    });
});

router.get('/courses/:catId/category', async(req,res)=>{
    const rowsCat=await modelCategory.getCategoryAll();
    const cat= parseInt(req.params.catId);
    const page=parseInt(req.query.page)||1;
    if(cat===0){
        const rows=await modelCourses.getCoursesAll(page);
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
    }
    // --------
    if(cat===1 || cat===2){
        const rows=await modelCourses.getCoursesCatAll(cat,page)
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
}
}),

router.get('/courses', async(req,res)=>{
    const rowsCat=await modelCategory.getCategoryAll();

    const cat=parseInt(req.query.category)||0;
    const page=parseInt(req.query.page)||1;
    if(cat===0){
        const rows=await modelCourses.getCoursesAll(page);
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
    }
    // --------
    if(cat===1 || cat===2){
        const rows=await modelCourses.getCoursesCatAll(cat,page)
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
})

module.exports=router;