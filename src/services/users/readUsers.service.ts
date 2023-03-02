import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { IUser } from '../../interfaces/users.interfaces'
import { returnMultUsersSchema } from '../../schemas/users.schemas'


const readUsersService = async (isAdmin: boolean): Promise<IUser[]> => {

    if(!isAdmin){
        throw new AppError('Insufficient permission', 403)
    }

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const listUsers: Array<User> = await userRepository.find()

    const users = returnMultUsersSchema.parse(listUsers)

    return users
}

export {
    readUsersService
}