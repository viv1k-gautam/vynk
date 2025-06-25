const mongoose= require('mongoose')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')

const userSchema =new mongoose.Schema({
    fullname:String,
    email:{
        type: String,
        required : true,
        unique: true,
        minlength:[5 ,'Email must be 5 characters'],
    },
    password:{
        type:String,
        require:true,
        select:false,
    },

socketId  :{
    type:String
},
})

userSchema.method.generateAuthToken = function(){
    const token =jwt.sign({ _id:this._id}, process.env.JWT_SECRET);
    return token;
}
userSchema.method.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.static.hashPassword =async function(password) {
    return await bcrypt.hash(password ,10);
}

const userModel =mongoose.model('user', userSchema);

module.exports=userModel;