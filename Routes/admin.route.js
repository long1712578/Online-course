const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/dashboad',async (req,res)=>{
    res.render('admin/index',{
        layout:"main_admin",
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