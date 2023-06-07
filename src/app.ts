import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandlelar'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('server running')
})

app.use(globalErrorHandler)

export default app
