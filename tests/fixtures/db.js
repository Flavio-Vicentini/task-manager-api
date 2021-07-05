import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../../src/models/User'
import Task from '../../src/models/Task'

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

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name : 'userTwo',
    email: 'usertwo@test.com',
    password: '12345678',
    tokens: [{
        token: jwt.sign({_id: userTwoId},process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task One',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Two',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Three',
    completed: true,
    owner: userTwo._id
}

const setupDataBase = async () => {
    await User.deleteMany()
    await Task.deleteMany()

    await new User(userOne).save()
    await new User(userTwo).save()

    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

export {
    userOne,
    userOneId,
    setupDataBase,
    taskOne,
    userTwo
}
