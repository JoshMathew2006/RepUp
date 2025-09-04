const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const SECRET = "key";
const jwt = require('jsonwebtoken');


const dbConnect = require('./db/dbConnect');
const User = require('./db/userModel');
const userModel = require('./db/userModel');

dbConnect();

app.use(cors());
app.use(express.json());

app.post("/register" , async (req,res) => {
    try {
        const {username, password, firstName, lastName} = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: username,
            password: hashedPassword,
            firstName,
            lastName
        })

        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error: "error creating user"});
    }
});

app.post('/login' ,  async(req,res) => {

  try{

    const {username , password} = req.body;
    
    const user = await User.findOne({email: username});
    
    if(!user)
    {
        return res.status(400).json({error: "user not found"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword)
    {
        return res.status(400).json({message: "incorrect password"});
    }

    const token = jwt.sign(

        { id: user._id, email: user.email },
        SECRET,
        { expiresIn: "2h" }

    );

    res.status(200).json({message: "login successful", token});
    
    }catch(err){
    console.error(err);
    res.status(500).json({error: "login failed"});
}


});

function auth(req, res , next){
    const authHeader = req.headers["authorization"];
    if(!authHeader) {
        return res.status(401).json({error: "no token provided"});
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({error: "invalid token format"});
    }

    try{
        const decoded = jwt.verify(token , SECRET);
        req.user = decoded;
        next();
    }catch(err){
        console.error("JWT error: " , err);
        return res.status(403).json({error: "invalid or expired token"});
    }
}


app.put("/updateUsername", auth, async(req,res) => {

    try{
        const {newUsername} = req.body;
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {email: newUsername},
            {new: true}
        )

        if(!updatedUser){
            return res.status(404).json({error: "user not found"});
        }

        res.json({
            message: "username updated sucessfully",
            user: {id: updatedUser._id, email: updatedUser.email}
        });
    }catch(err){
        console.error(err);
        res.status(500).json({error: "server error"});
    }

})

app.put("/updatePwd" , auth, async(req,res) => {

    try{
        const {newPwd} = req.body;
        const userId2 = req.user.id;
        const newHashedPassword = await bcrypt.hash(newPwd, 10);
        const updatedUser2 = await User.findByIdAndUpdate(
            userId2,
            {password: newHashedPassword},
            {new: true}
        )

        if(!updatedUser2)
        {
            return res.status(404).json({error: "user not found"});
        }
        res.json({
            message: "password updated sucessfully",
            user: {id: updatedUser2._id, email: updatedUser2.email}
        });

    }catch(err){
        console.error(err);
        res.status(500).json({error: "server error"});
    }
})

app.put("/setup", auth, async(req, res) => {

    try{

        const {bulking , current , target} = req.body;
        const userId3 = req.user.id;
        const updatedUser3 = await user.findByIdAndUpdate(
            userId3,
            
        )



    }


})
module.exports = app;

