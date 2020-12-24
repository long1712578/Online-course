const port = 3000;
const express = require('express');
const express_handlebars = require('express-handlebars');
const http_errors = require('http-errors');
const body_parser = require('body-parser');
const express_handlebars_sections = require('express-handlebars-sections');
var session = require('express-session')

const app=express();

app.engine('.hbs',express_handlebars({
    extname: '.hbs',
    helpers:{
        section:express_handlebars_sections(),
        }
    },
));
app.set('view engine', '.hbs');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'SECRET_KEYt',
  resave: false,
  saveUninitialized: true,
  cookie: { 
      //secure: true 
    }
}))


app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
require('./MiddleWare/locals.mdw')(app);
require('./MiddleWare/router.mdw')(app);


require('./MiddleWare/error.mdw')(app);

app.listen(port, function(req, res) {
    console.log('App is listening on port ' + port);
});
