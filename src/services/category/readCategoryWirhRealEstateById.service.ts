import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { AppError } from '../../errors'


const readCategoryWithRealEstateByIdService = async (categoryId: number) => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory = await categoryRepository.findOneBy({
        id: categoryId
    })

    if(!findCategory){
        throw new AppError('Category not fond', 404)
    }

    const categoryWithRealEstate = categoryRepository.createQueryBuilder('category').
    select(['category', 'real_estate', 'address']).
    innerJoin('category.categories', 'real_estate').
    innerJoin('real_estate.address', 'address').
    where('category.id = :id', { id: categoryId }).
    andWhere('real_estate.category = :id', { id: categoryId }).
    getOne()

    console.log(categoryWithRealEstate)

    return categoryWithRealEstate
}

export default readCategoryWithRealEstateByIdService