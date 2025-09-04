const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect(){
    mongoose.connect(process.env.DB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log('successfuly connected to mongoDbAtlas');

    }).catch((error) =>{
        console.log('unable to connect to mongo db');
        console.error(error);
    })
}

module.exports = dbConnect;