const mongoose = require('mongoose');

const excSchema = new mongoose.Schema({

    muscleGroup:{

        type: String,
        required: [true, "muscleGroup not found"],
    }

    ,

    reps:{

        type: Number,
        required: [true, "please enter your reps"],


    }

    ,

    sets:{

        type: number,
        required: [true, "please enter your sets"],

    }

    ,

    notes:{

        type: String,
        required: false,
    
    }

    ,

    date:{
        type: Date,
        default: Date.now,

    }




})



