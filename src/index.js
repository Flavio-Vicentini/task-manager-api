import express from 'express'
import usersRouter from './routes/users.routes.js'
import tasksRouter from './routes/tasks.routes.js'
import './db/mongoose.js'


const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/users',usersRouter)
app.use('/tasks',tasksRouter)




app.listen(port, () => {
    console.log('Server up on port ',port)
})


