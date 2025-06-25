const userModel= require('../model/user.model');
const router = require('../routes');

module.exports.createUser =async ({
 fullname,email,password

})=>{
    if(!fullname || !email ||!password){
        throw new Error("all field required");
    }
    const user =userModel.create({
        fullname,
        email,
        password
    })
    return user;
}