import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Task from './Task.js'


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('Email invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength:7
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }   
        }
    },
    tokens:[{
        token: {
            type: String,
            required:true
        }
    }],
    avatar:{
        type: Buffer
    }  
},
    {
        timestamps: true
    }
)

//Relation between tasks and users
userSchema.virtual('tasks', {
    ref: 'Task',
    localField:'_id',
    foreignField: 'owner'
})

//Delete the personal data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject;
}


//generate token for authentication
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


//Find user and return if the credentials are corrects
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if (!user){
        throw new Error ('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error ('Unable to login')
    }

    return user;
}


//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
//Delete user tasks before delete user
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({ owner:user._id})
    next()
})


const User = mongoose.model('User', userSchema)

export default User;