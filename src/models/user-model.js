const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:[true,"Email is mandatory"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },

    bio:{
        type:String,
        default:null
    },
    lisks:{
        type:Array,
        default:[]
    },

    isDeleted:{
        type:Boolean,
        default:false
    },
    fcmToken:{
        type:String,
        default:''
    },
    token:{
        type:String,
        default:null
    },
    deviceType:{
        type:String,
        default:null
    },
    validOtp:{
      type:Boolean,
      default:false
    }



})


// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  try {
    // Check if the password has been modified or if this is a new user
    if (!this.isModified('password')) {
      return next(); // If password is not modified, move to the next middleware
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plain text password with the hashed password
    this.password = hashedPassword;

    next(); // Move to the next middleware
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
})



// Define a method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};


userSchema.methods.generateAuthToken=async function(){
    const payload={
        userID:this._id,
        email:this.email
    }
  
       // Generate JWT token with the payload and a secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
  return token;

}





const UserModel=mongoose.model('User',userSchema)

module.exports=UserModel