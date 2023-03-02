import 'express-async-errors'
import express, { Application } from 'express'
import { handleErrors } from './errors'
import userRoutes from './routes/user.routes'
import loginRouter from './routes/login.routes'
import { categoryRouter } from './routes/category.routes'

const app: Application = express()
app.use(express.json())

app.use('/users', userRoutes)
app.use('/login', loginRouter)
app.use('/categories', categoryRouter)

app.use(handleErrors)

export default app