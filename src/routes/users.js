import express from 'express'
import User from '../models/user.js'
import Router from 'express'

const usersRouter = Router()

usersRouter.post('/', async (req,res)=>{
    const user = new User (req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    
})
usersRouter.get ('/', async (req,res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

usersRouter.get ('/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

usersRouter.patch('/:id', async(req,res) =>{
    try {
        const user = await User.findByIdAndUpdate (req.params.id, req.body, {new:true, runValidators:true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

usersRouter.delete(':id',async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


export default usersRouter;

