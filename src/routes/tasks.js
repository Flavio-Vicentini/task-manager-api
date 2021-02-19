import express from 'express'
import Task from '../models/task.js'
import Router from 'express'

const tasksRouter = Router()


tasksRouter.post('/', async (req,res)=>{
    const task = new Task (req.body)

    try {
        await task.save()
        res.send(task)
    }catch (e) {
        res.status(400).send(e.message)
    }
})


tasksRouter.get ('/',async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

tasksRouter.get ('/:id', async (req,res) => {
    const _id = req.params.id
 
    try {
        const task = await Task.findById(_id)
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

tasksRouter.patch('/:id', async(req,res) =>{
    try {
        const task = await Task.findByIdAndUpdate (req.params.id, req.body, {new:true, runValidators:true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

tasksRouter.delete('/:id',async(req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


export default tasksRouter;