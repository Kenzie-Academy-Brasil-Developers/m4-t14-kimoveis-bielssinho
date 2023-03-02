import { Router } from 'express'
import { createCategoryController, readCategoryController } from '../controllers/category.controller'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import isAdminMiddleware from '../middlewares/ensureIsAdmin.middleware'
import ensureTokensIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import { createCategorySchema } from '../schemas/category.schemas'

const categoryRouter: Router = Router()

categoryRouter.post('', ensureDataIsValidMiddleware(createCategorySchema), ensureTokensIsValidMiddleware, isAdminMiddleware, createCategoryController)
categoryRouter.get('', readCategoryController)

export {
    categoryRouter
}