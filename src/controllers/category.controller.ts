import { Request, Response } from 'express'
import { ICategory, ICreateCategory } from '../interfaces/category.interfaces'
import createCategoryService from '../services/category/createCategory.service'
import readCategoryService from '../services/category/readCategory.service'

const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    
    const categoryData: ICreateCategory = req.body

    const newCategory = await createCategoryService(categoryData)
    
    return res.status(201).json(newCategory)

}

const readCategoryController = async (req: Request, res: Response): Promise<Response> => {

    const listCategory: ICategory[] = await readCategoryService()

    return res.status(200).json(listCategory)

}

export {
    createCategoryController,
    readCategoryController
}