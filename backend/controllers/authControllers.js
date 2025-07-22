
const User = require('../models/user');

const {hashedPassword} = require('../helpers/auth');
const {comparePassword} = require('../helpers/auth');
const {get} = require('mongoose')
const jwt = require('jsonwebtoken');



const test = (req, res) => {
    res.send("Hello from auth controller");
}

//register endpoint
const registerUser = async (req, res) => {

try{
  const {name, email, password} = req.body;

  //check karo ki name diya  hai ya nahi
  if(!name) {
    return res.json({
      error: "Username is required" 

    })

};

  //check karo ki email diya hai ya nahi`
  const exist =await User.findOne({email});
  if(exist) {
    return res.json({
      error: "User already exists"
    })


  }
  //check karo ki password diya hai ya nahi
  if(!password || password.length < 6) {
    return res.json({
      error: "Password is required and should be at least 6 characters long"
    })
  } ;
  //hash karo password ko
  const hashed = await hashedPassword(password);
  //create user
  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return res.json(user)

} catch (error) {
   
};

}

//login endpoint
const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    //check kro ki user exist krta hai ya nahi
    const user = await User.findOne({email});
    if(!user){
      return res.json({
        error: "User does not exist"
      })
    }
    //check karo ki password match krta hai ya nahi
    const match = await comparePassword(password, user.password);
    if(match){
      jwt.sign({email: user.email, id: user._id, name:user.name},process.env.JWT_SECRET, {},(err,token)=>{
        if(err)
          throw err;
          res.cookie('token', token).json(user)
        })
        }
        if(!match){
          return res.json({
            error: "password does not match"
          })  
        }
    
      }catch (error) {
        console.log("Login failed:", error);
      }

      }
      const getProfile = async (req, res) => {
        const {token}=req.cookies;
        if(token){
          jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err)throw err;
            res.json(user);
          })
        }else{
          res.json(null)
        }
      }

    //logout endpoint
const logoutUser = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  test,
  registerUser,
  loginUser ,
  getProfile,
  logoutUser
};
