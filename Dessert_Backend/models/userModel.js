// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); //bcrypt used to encrypt passwords

// const UserSchema = new mongoose.Schema({
//   name:{
//     type:String,
//   },
//   email:{
//     type:String,
//     unique:true,
//     required:[true,"Email is required"],
//   },
//   password:{
//     type:String,
//     required:[true,"Password is required"],
//   }
// });
// //Hash password sb4 saving user to db
// //pre method acts as middleware 
// UserSchema.pre("save",async function(next){
//   if(!this.isModified("password")){
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10); //10 is hash bytes
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// })

// const User = mongoose.model("user",UserSchema);
// module.exports=User;
// models/userModel.
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Default role
});

module.exports = mongoose.model('User', userSchema);

