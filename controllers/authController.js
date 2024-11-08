//Authentication logic (login, register)
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');



//Register Pastor  
exports.registerMainPastor = async (req,res)=>{
    try{
        const{email,password}=req.body;

        const existingUser=await User.findOne({role:'main_pastor'});
        if (existingUser){
            return res.status(400).json({message:"Main Pastor already exist."});
        }
    
//Hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt); 


//Create a new Main Pastor user
const newUser=new User({
    email,
    password:hashedPassword,
    role:'main_pastor'
});
await newUser.save();
        res.status(201).json({ message: "Main Pastor registered successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
};


//login functionality 

exports.login= async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await User.findOne({email});
//check matching email(if it exist)
        if (!user){
            return res.status(400).json({message:"Invalid credentials."});
        }

 //checking matching passowrd       

         const isMatch=await bcrypt.compare(password,user.password);
         if (!isMatch){
              return res.status(400).json({message:"Invalid credetntials."})
         }

//then generate jwt token  
const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } 
);  

// S Send response with the token
res.status(200).json({
    token,
    message: "Login successful.",
    user: {
        id: user._id,
        email: user.email,
        role: user.role
    }
});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};