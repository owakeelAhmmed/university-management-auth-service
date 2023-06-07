import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users/', UserRoutes)

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing')
// })

app.get('/', async (req: Request, res: Response) => {
  res.send('server running')
})

app.use(globalErrorHandler)

export default app
