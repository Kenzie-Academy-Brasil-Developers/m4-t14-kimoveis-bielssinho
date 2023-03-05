import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Address, Category, RealEstate } from '../../entities'
import { AppError } from '../../errors'
import { ICreateAddress, ICreateRealEstate } from '../../interfaces/realEstate.interfaces'



const createRealEstateService = async (realEstateData: any ): Promise<object> => {
    
    const addRealEstateData: ICreateAddress = realEstateData.address

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const addressExists = await addressRepository.createQueryBuilder('address').
    select('address').
    where('address.street = :street', { street: addRealEstateData.street }).
    andWhere('address.zipCode = :zipCode', { zipCode: addRealEstateData.zipCode }).    
    andWhere('address.number = :number', { number: addRealEstateData.number }).    
    andWhere('address.city = :city', { city: addRealEstateData.city }).    
    andWhere('address.state = :state', { state: addRealEstateData.state }).
    getOne()
 
    if(addressExists){
        throw new AppError('address already exists', 409)
    }

    const newAddress = addressRepository.create(addRealEstateData)

    await addressRepository.save(newAddress)

    if(realEstateData.category){
        const findCategory = await categoryRepository.findOneBy({
            id: realEstateData.category!
        })
        if(!findCategory){
            throw new AppError('Category not found', 404)
        }
    }
   
    const realEstateWithAddress = {
        ...realEstateData,
        address: newAddress,
        addressId: newAddress!.id
    }

    const realEstate = realEstateRepository.create(realEstateWithAddress)
    
    await realEstateRepository.save(realEstate)
   
    return realEstate
}

export default createRealEstateService