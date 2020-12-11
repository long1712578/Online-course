const port = 3000;
const express = require('express');
const express_handlebars = require('express-handlebars');
const http_errors = require('http-errors');
const body_parser = require('body-parser');
//const express_session = require('express-session');

const app=express();

app.engine('.hbs',express_handlebars({
    extname: '.hbs',
    helpers:{
        section:function(name, options){
            if(!this._sections){this._sections = {}};
            this._sections[name] = options.fn(this);
            return null;
        }
    },
}));
app.set('view engine', '.hbs');

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.redirect('/user/home')
});
//Trang chu
app.use('/user',require('./Routes/home.route'));
//Lien lac
app.get("/user/contact",function(req,res){
    res.render('users/contact');
});
//Khoahoc
app.use('/user',require('./Routes/courses.route'));
//Khoa hoc chi tiet angular
app.get("/coursesDetailAngular",function(req,res){
    res.render('users/coursesDetailAngular');
});
//Lo trinh cua user
app.use('/user',require('./Routes/routeCourse.route'));
//Giao vien view user
app.use('/user',require('./Routes/tearcher.user.router'));
//Gioi thieu
app.get("/user/document",function(req,res){
    res.render('users/document');
});

//Huong dan
app.get("/user/help",function(req,res){
    res.render('users/help');
});
//Giao vien
app.use('/teacher',require('./Routes/teacher.route'));
//Dang nhap
app.get("/signIn",function(req,res){
    res.render('account/signIn');
});
//Dang ki
app.get("/signUp",function(req,res){
    res.render('account/signUp');
});
//admin
//Dang ki
app.get("/admin/index",function(req,res){
    res.render('admin/index',{
        layout:"main_admin",
    });
});
app.get("/admin/course",function(req,res){
    res.render('admin/course',{
        layout:"main_admin",
    });
});
app.get("/admin/user",function(req,res){
    res.render('admin/user',{
        layout:"main_admin",
    });
});
app.get("/admin/chart",function(req,res){
    res.render('admin/chart',{
        layout:"main_admin",
    });
});
// app.get("/admin/charts",function(req,res){
//     res.render('admin/charts',{
//         layout:"main_admin",
//     });
// });
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
