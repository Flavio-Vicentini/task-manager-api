import mongoose from 'mongoose'
import validator from 'validator'



const User = mongoose.model('User', {

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
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
    }
})

export default User;