const port = 3000;
const express = require('express');
const express_handlebars = require('express-handlebars');

const app=express();

app.engine('.hbs',express_handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use("/", express.static(__dirname + '/public'));
//Trang chu
app.get("/home",function(req,res){
    res.render('users/home');
});
//Lien lac
app.get("/contact",function(req,res){
    res.render('users/contact');
});
//Khoahoc
app.get("/courses",function(req,res){
    res.render('users/courses');
});
//Chi tiet khoa hoc
app.get("/coursesDetail",function(req,res){
    res.render('users/coursesDetail');
});
//Chi tiet khoa hoc angular
app.get("/coursesDetailAngular",function(req,res){
    res.render('users/coursesDetailAngular');
});
//Lo trinh
app.get("/coursesRoute",function(req,res){
    res.render('users/coursesRoute');
});
//Gioi thieu
app.get("/document",function(req,res){
    res.render('users/document');
});
//Huong dan
app.get("/help",function(req,res){
    res.render('users/help');
});
//Giao vien
app.get("/teacher",function(req,res){
    res.render('users/teacher');
});
//Dang nhap
app.get("/signIn",function(req,res){
    res.render('account/signIn');
});
//Dang ki
app.get("/signUp",function(req,res){
    res.render('account/signUp');
});

app.listen(port, function(req, res) {
    console.log('App is listening on port ' + port);
});