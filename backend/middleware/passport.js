const passport = require('passport')
const LocalStartegy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const UserData = require('../models/userSchema')

// =============== LOCAL STATERGY ================= //

passport.use(
    new LocalStartegy({usernameField: 'email'}, async (email, password, done)=>{

        try {
            
            const user = await UserData.findOne({email})
            if(!user){
                return done(null, false, {message: 'user not found'})
            }

            const isValid = await bcrypt.compare(password, user.password)

            if(!isValid){
                return done(null, false, {message: 'password is invalid'})
            }

            return done(null, user)

        } catch (error) {
            return done(error.message)
        }

    })
)

// ================ SERAILIZER USER ================= //

passport.serializeUser((user, done)=> done(null, user._id))

// ================ DESERAILIZER USER ================= //

passport.deserializeUser( async (id, done)=> {

    try {
        
        const user = await UserData.findById(id)
        return done(null, user)

    } catch (error) {
        return done(error.message)
        
    }

})

// ================ USER AUTH ================= //

passport.userAuth = (req,res,next)=>{

    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.locals.user = req.user
        return next()
    }   

}

module.exports = passport