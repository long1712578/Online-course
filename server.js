const port = 3000;
const express = require('express');
const express_handlebars = require('express-handlebars');
const http_errors = require('http-errors')

const app=express();

app.engine('.hbs',express_handlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use("/", express.static(__dirname + '/public'));
//Trang chu
app.use('/',require('./Routes/home.route'));
//Lien lac
app.get("/contact",function(req,res){
    res.render('users/contact');
});
//Khoahoc
app.use('/',require('./Routes/courses.route'));
//Chi tiet khoa hoc
app.get("/coursesDetail",function(req,res){
    res.render('users/coursesDetail');
});
//Chi tiet khoa hoc angular
app.get("/coursesDetailAngular",function(req,res){
    res.render('users/coursesDetailAngular');
});
//Lo trinh
app.use('/',require('./Routes/routeCourse.route'));
//Gioi thieu
app.get("/document",function(req,res){
    res.render('users/document');
});
//Huong dan
app.get("/help",function(req,res){
    res.render('users/help');
});
//Giao vien
app.use('/',require('./Routes/teacher.route'));
//Dang nhap
app.get("/signIn",function(req,res){
    res.render('account/signIn');
});
//Dang ki
app.get("/signUp",function(req,res){
    res.render('account/signUp');
});
app.use((req, res, next) => {
    next(http_errors(404));
})

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let errorCode = 'error';
    if (status === 404)
        errorCode = '404';
    if (status === 500)
        errorCode = '500';
    let errorMsg = err.message;
    res.render('Error/404', {
        layout: false,
        errorCode,
        errorMsg,
        error: err
    });
});

app.listen(port, function(req, res) {
    console.log('App is listening on port ' + port);
});