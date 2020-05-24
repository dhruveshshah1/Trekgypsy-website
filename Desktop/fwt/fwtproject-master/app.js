// import 
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');


const route = require('./routes/route');

const uri = "mongodb+srv://trek_admin:" + process.env.PASS + "@trekgypsy-ub5o4.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

// on connection
mongoose.connection.on('connected',()=>{
    console.log('connect to database');
	console.log('hello, world from database')
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in connececting' + err);
    }
});


// port
const port = 8080;


app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/test.html');
    } else {
        next();
    }    
};

app.use('/api',route);


app.get('/',(req,res)=>{
    res.redirect('buffer.html');
});

app.listen(process.env.PORT || port,()=>{
    console.log("server listening at port:" + port);
});
