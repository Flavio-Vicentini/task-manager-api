import express from 'express'
import Task from '../models/Task.js'
import Router from 'express'
import auth from '../middleware/auth.js'

const tasksRouter = Router()

//Create a task
tasksRouter.post('/', auth, async (req,res)=>{
    const task = new Task ({
        owner: req.user._id,
        ...req.body
    })

    try {
        await task.save()
        res.send(task)
    }catch (e) {
        res.status(400).send(e.message)
    }
})

//List all tasks from user
tasksRouter.get ('/',auth, async (req,res) => {
    const match = {}
    const sort = {}
    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//List task by id
tasksRouter.get ('/:id', auth, async (req,res) => {
    const _id = req.params.id
    const owner = req.user._id
 
    try {
        const task = await Task.findOne({_id, owner})
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

//Update the task
tasksRouter.patch('/:id',auth, async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try {
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Delete task by id
tasksRouter.delete('/:id',auth, async(req,res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


export default tasksRouter;