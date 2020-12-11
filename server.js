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

require('./MiddleWare/router.mdw')(app);


require('./MiddleWare/error.mdw')(app);

app.listen(port, function(req, res) {
    console.log('App is listening on port ' + port);
});
