const express=require('express');
const modelComman=require('../Models/contact.model');
const router=express.Router();

router.get('/contact', async(req,res)=>{
    res.render('users/contact');
});
router.get('/contact-history', async(req,res)=>{
    const userId= req.session.authUser.Id;
    if(userId==='undefined'){
        res.redirect('/signIn')
    }
    const rows=await modelComman.getAll(userId);
    rows.forEach(element => {
        const d=element.commanDate;
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        element.commanDate = `${ye}-${mo}-${da}`;
    }); 
    res.render('users/contactHistory',{
        contact:rows,
    });
});
router.post('/contact', async(req,res)=>{
    const userId= req.session.authUser.Id;
    if(userId==='undefined'){
        res.redirect('/signIn')
    }
    const contact={
        name: req.body.name,
        email: req.body.email,
        content: req.body.content,
        userId:userId,
        commanDate: new Date()
    }
    await modelComman.add(contact);
    res.redirect(req.headers.referer);
});
module.exports=router;