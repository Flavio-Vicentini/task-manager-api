import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../../src/models/User'

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name : 'userOne',
    email: 'userone@test.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({_id: userOneId},process.env.JWT_SECRET)
    }]
}

const setupDataBase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

export {
    userOne,
    userOneId,
    setupDataBase
}
