import { Request, Response } from 'express'
import { ICreateUser, IUserUpdate } from '../interfaces/users.interfaces'
import createUserService from '../services/users/createUser.service'
import { readUsersService } from '../services/users/readUsers.service'
import updateUserService from '../services/users/updateUser.service'

const createUserController = async (req: Request, res: Response): Promise<Response> => {

    const userData: ICreateUser = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const readUsersController = async (req: Request, res: Response): Promise<Response> => {

    const listUsers = await readUsersService()

    return res.status(200).json(listUsers)
}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    
    const updateUserData: IUserUpdate = req.body
    const userId: number = +req.params.id

    const newUser = await updateUserService(updateUserData, userId)
    
    return res.status(200).json(newUser)
}

export {
    createUserController,
    readUsersController,
    updateUserController
}