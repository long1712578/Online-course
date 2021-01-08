const express = require('express');
const db = require('../utils/db');
const router = express.Router();

router.get('/dashboad',async (req,res)=>{
    res.render('admin/index',{
        layout:"main_admin",
    });
})



module.exports = router;