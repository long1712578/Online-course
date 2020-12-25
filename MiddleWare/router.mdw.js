module.exports=(app)=>{
    app.get('/',(req,res)=>{
        res.redirect('/user/home')
    });
    app.get('/user',(req,res)=>{
        res.redirect('/user/home')
    });
    //Trang chu
    app.use('/user',require('../Routes/home.route'));
    //Lien lac
    app.use('/user',require('../Routes/contact.route'));
    //Khoahoc
    app.use('/user',require('../Routes/courses.route'));
    //Lo trinh cua user
    app.use('/user',require('../Routes/routeCourse.route'));
    //Giao vien view user
    app.use('/user',require('../Routes/tearcher.user.router'));
    //Giỏ hàng
    app.use('/user',require('../Routes/cart.route'));
    //Gioi thieu
    app.get("/user/document",function(req,res){
        res.render('users/document');
    });
    
    //Huong dan
    app.get("/user/help",function(req,res){
        res.render('users/help');
    });
    //Giao vien
    app.use('/teacher',require('../Routes/teacher.route'));
    
    //Tài khoản
    app.use('/',require('../Routes/account.route'));
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
    
}