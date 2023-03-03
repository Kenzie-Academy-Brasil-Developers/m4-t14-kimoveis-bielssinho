import { Request, Response } from 'express'
import createRealEstateService from '../services/realEstate/createRealEstate.service'

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    
    const realEstateData = req.body

    const newRealEstate = await createRealEstateService(realEstateData)
    
    return res.status(201).json(newRealEstate)
}

export {
    createRealEstateController
}