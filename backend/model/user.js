const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"]

    },
    email:{
        type:String,
        required:[true, "Please enter your name"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[4,"Password should be greater than 4 characters!"],
        select:false
    },
    phoneNumber:{
        type:Number,
       maxLength:[10, "don't exceed more than 10 digits"]
    },
    
 addresses: [
    {
        country: { type: String },   // ✅ Fixed typo
        city: { type: String },
        address1: { type: String },  // ✅ Fixed typo
        address2: { type: String },  // ✅ Fixed typo
        zipCode: { type: Number },
        addressType: { type: String },
    }
],
    role:{
        type:String,
        default:"user",
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    cart: [  // ✅ Correctly placed at the root
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity cannot be less than 1"],
                default: 1,
            },
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now(),

    },
    resetPasswordToken:String,
    resetPasswordTime:Date,
});

//hash password
// userSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//         next();
//     }
//     this.password=await bcrypt.hash(this.password,10)
// })

// //jsonwebtoken
// userSchema.methods.getJwtToken = function(){
//     return jwt.sign({id:this_id},process.env.JWT_SECRET_KEY,{
//         expiresIn:process.env.JWT_EXPIRES,
//     })
// }

// //compare password

// userSchema.methods.comparePassword=async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password)
// }

module.exports=mongoose.model('User', userSchema)
