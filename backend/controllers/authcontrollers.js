const bcrypt = require('bcrypt')
const UserData = require('../models/userSchema')

// =============== SIGN UP PROCESS ================ //

exports.signUpProcess = async (req,res)=>{

    try{

        const {password, confirmPassword} = req.body

        if(password === confirmPassword) {

            hashedPassword = await bcrypt.hash(password, 10)
            await UserData.create({...req.body, password:hashedPassword})
            console.log("User Created Successfully");
            return res.json()

        }else {
            console.log("Password and confirm Password is not match");
        }

    }catch(error){
        console.log(error.message);

    }

}

// ================= LOGIN PROCESS ==================== //

exports.loginProcess = (req,res) =>{
    return res.json({user:req.user})
}

// ================ CHECK AUTH =================== //

exports.checkAuth = (req,res)=>{
    if(req.user){
        return res.json({user:req.user})
    }
}