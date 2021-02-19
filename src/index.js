import express from 'express'
import usersRouter from './routes/users.js'
import tasksRouter from './routes/tasks.js'
import './db/mongoose.js'


const app = express()
const port = process.env.PORT || 3000

app.use('/users',usersRouter)
app.use('/tasks',tasksRouter)



app.listen(port, () => {
    console.log('Server up on port ',port)
})