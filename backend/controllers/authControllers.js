
const User = require('../models/user');
const RoomCodeModel = require('../models/roomCode');

const {hashedPassword} = require('../helpers/auth');
const {comparePassword} = require('../helpers/auth');
const {get} = require('mongoose')
const jwt = require('jsonwebtoken');
const {generateRoomCode} =require('../utils/codeGenerator')




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
          res.cookie('token', token,{
              httpOnly:true,
              secure:true,
              sameSite:"None",
              maxAge:24*60*60*1000}
                    ).json(user)
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
const logoutUser = async (req, res) => {
// try{
//   const token =req.cookies.token;
//   if(!token)
//     return res.status(400).json({message:'no found token'});

//   const decoded =jwt.verify(token,process.env.JWT_SECRET);
//   const userId =decoded.id;

// await RoomCodeModel.deleteMany({owner:userId});

//   res.clearCookie("token")
//   return res.status(200).json({message:"logout successful"})
// }catch(err){
//   console.error(err);
//   return res.status(500).json({message:"server error"})
// }


  res.clearCookie('token',{
     httpOnly: true,
  secure: true,
  sameSite: "None"
} ); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
};

//room code
const roomCodeget = async (req, res) => {
  try{
    //user id token
   const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
      const { name, url } = req.body;

      if (!name || !url) {
      return res.status(400).json({ error: "Party name and video URL are required" });
    }


    let code;
    let exists = true;

    while (exists) {
      code = generateRoomCode();


      // res.json({success:true,code});

      const existingCode = await RoomCodeModel.findOne({code});
      if (!existingCode) {
        exists = false;
      } 
    }
    await RoomCodeModel.create({
      name,
      url,
      code,
      owner:userId
    });
   
    
res.json({success:true,code,roomCode:code});

      // res.json({ roomCode: code });

  } catch (error) {
    console.error("Error generating room code:", error);
    res.status(500).json({ error: "Failed to generate room code" });
  
  }
};


// In authController.js
const exitRoom = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await RoomCodeModel.deleteMany({ owner: userId });
    return res.status(200).json({ message: "Room deleted and exited" });
  } catch (error) {
    console.error("Exit room error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


//check room

const checkRoomCode =async(req,res) =>{
  try{
    const{roomCode} =req.body;

    if(!roomCode){
      return res.status(400).json({error:"room code is req"});

    }
    const room =await RoomCodeModel.findOne({code:roomCode});

    if(!room){
      return res.json({exists:false});

    }
      // 🔽 Extract videoId from URL
    const url = new URL(room.url);
    let videoId = null;
    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.slice(1);
    } else if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v');
    }

    return res.json({
      exists:true,
      room:{
       videoId,  
      }});
  }
  catch(error){
    console.error("check room code error",error);
    return res.status(500).json({error:'server error'})
  }
}


module.exports = {
  test,
  registerUser,
  loginUser ,
  getProfile,
  logoutUser,
  roomCodeget,
  exitRoom,
  checkRoomCode
};
