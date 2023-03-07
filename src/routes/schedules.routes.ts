import { Router } from 'express'
import { createSchedulesController } from '../controllers/schedules.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureTokensIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { createSchedulesSchema } from '../schemas/schedules.schemas'

const schedulesRouter: Router = Router()

schedulesRouter.post('', ensureTokensIsValidMiddleware, ensureDataIsValidMiddleware(createSchedulesSchema), createSchedulesController)

export default schedulesRouter
