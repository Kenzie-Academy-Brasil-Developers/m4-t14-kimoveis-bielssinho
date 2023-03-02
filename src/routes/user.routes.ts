import { Router } from 'express'
import { createUserController, readUsersController, updateUserController } from '../controllers/users.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureTokensIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware'
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import isAdminOrNotMiddleware from '../middlewares/ensureIsAdminOrNot.middleware'
import { userCreateSchema, userUpdateSchema } from '../schemas/users.schemas'

const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSchema), createUserController)
userRoutes.get('', ensureTokensIsValidMiddleware, readUsersController)
userRoutes.patch('/:id', ensureDataIsValidMiddleware(userUpdateSchema), ensureTokensIsValidMiddleware, ensureUserExistsMiddleware, isAdminOrNotMiddleware, updateUserController)

export default userRoutes