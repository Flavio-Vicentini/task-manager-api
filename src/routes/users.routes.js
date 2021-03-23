import User from '../models/User.js'
import Router from 'express'
import auth from '../middleware/auth.js'
import multer from 'multer'
import sharp from 'sharp'
import {sendWelcomeEmail,sendCancelationEmail} from '../emails/account.js'

const usersRouter = Router()

//Create a user
usersRouter.post('/', async (req,res)=>{
    const user = new User (req.body)

    try {
        sendWelcomeEmail(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
    
})

//User login
usersRouter.post ('/login', async (req,res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//User logout
usersRouter.post('/logout',auth,async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()    
    }
})

//User logout of all clients
usersRouter.post('/logoutAll',auth,async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()    
    }
})

//List profile user
usersRouter.get ('/me',auth,async (req,res) => {
    res.send(req.user)
})

//Update user data
usersRouter.patch('/me', auth, async(req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }


    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Delete user
usersRouter.delete('/me',auth, async(req,res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email,req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//Upload user Avatar
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file, callback){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return callback(new Error('Please upload an image file'))
        }
        callback(null,true)

    }
})
usersRouter.post('/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next) => {
    res.status(400).send({error: error.message})
})

//Delete the user avatar
usersRouter.delete('/me/avatar', auth, async (req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

//Send the user avatar for client
usersRouter.get('/:id/avatar', async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)

        if(!user | !user.avatar){
            throw new Error ()
        }

        res.set('Content-Type', '/image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

export default usersRouter;

