const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true, "please provide an email"],
        unique: [true , "email already accessed"]
    
    }

    , 

    password:{
        type: String,
        required: [true, "please provide a password"],
        unique: false,

    }

    ,

    firstName:{
        type: String,
        required: [true, "please provide a first name"],
        unique: false,
    }

    ,

    lastName:{
        type: String,
        required: [true, "please provide a last name"],
        unique: false,
    }

    ,

    bulking:{
        type: Boolean,
        required: false,
        
    }

    ,

    currentWeight:{
        type: Number,
        required: false,
    }

    ,

    targetWeight:{
        type: Number,
        required: false,
    }
})

module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);