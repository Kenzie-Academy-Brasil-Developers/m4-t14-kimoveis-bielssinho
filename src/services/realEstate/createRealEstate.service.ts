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
    
    // const addressExistsWithNumber = await addressRepository.createQueryBuilder('address').
    // select('address').
    // where('address.street = :street', { street: addRealEstateData.street }).
    // andWhere('address.zipCode = :zipCode', { zipCode: addRealEstateData.zipCode }).    
    // andWhere('address.number = :number OR address.number IS NULL', { number: addRealEstateData.number }).    
    // andWhere('address.city = :city', { city: addRealEstateData.city }).    
    // andWhere('address.state = :state', { state: addRealEstateData.state }).
    // getOne()
    
    const addressExists = await addressRepository.findOne({
        where: {
            street:addRealEstateData.street,
            zipCode: addRealEstateData.zipCode,
            number: addRealEstateData.number!,
            city: addRealEstateData.city,
            state: addRealEstateData.state
        }
    })
    console.log(addressExists)
    if(addressExists){
        throw new AppError('Address already exists', 409)
    }

    const newAddress = addressRepository.create(addRealEstateData)

    await addressRepository.save(newAddress)

    const findCategory = await categoryRepository.findOneBy({
        id: realEstateData.categoryId!
    })
    if(!findCategory){
        throw new AppError('Category not found', 404)
    }

    const realEstateWithAddress = {
        ...realEstateData,
        address: newAddress,
        category: findCategory
    }

    const realEstate = realEstateRepository.create(realEstateWithAddress)
    
    await realEstateRepository.save(realEstate)
   
    return realEstate
}

export default createRealEstateService