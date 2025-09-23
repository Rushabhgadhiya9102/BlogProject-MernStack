const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenvx = require('@dotenvx/dotenvx')
const database = require('./configs/database')
const LocalStartegy = require('./middleware/passport')
const session = require('express-session')
const router = require('./routers')
const passport = require('./middleware/passport')

const app = express()
dotenvx.config('.env')
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'user',
    resave : false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', router)


app.listen(port, (error)=>{

    if(error){
        console.log(error);
        
    }else{
        database()
        console.log("server is started");
        console.log(`http://localhost:${port}`);
        
    }

})