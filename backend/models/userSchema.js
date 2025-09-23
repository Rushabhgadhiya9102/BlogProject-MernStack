const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({

    userName :{    
        type:String, 
        require:true
    },

    email :{    
        type:String, 
        require:true
    },

    password :{    
        type:String, 
        require:true
    },

    bio :{    
        type:String, 
    },

    profileImage :{    
        type:String, 
    },

    coverImage:{
        type:String
    }

},{timestamp: true})

const UserData = mongoose.model('UserData', userSchema)
module.exports = UserData