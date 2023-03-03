import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { IMultRealEstate } from '../../interfaces/realEstate.interfaces'



const readRealEstateService = async (): Promise<RealEstate[]> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const listRealEstate: Array<RealEstate> = await realEstateRepository.find()
    
    return listRealEstate

}

export default readRealEstateService