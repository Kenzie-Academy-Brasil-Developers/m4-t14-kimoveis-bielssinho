import { z } from 'zod'
import { createAddressSchema, createRealEstateSchema, returnAdrressSchema, returnRealEstateSchema } from '../schemas/realEstate.schema'

type ICreateRealEstate = z.infer<typeof createRealEstateSchema>
type IRealEstate = z.infer<typeof returnRealEstateSchema>
type ICreateAddress = z.infer<typeof  createAddressSchema>
type IAddress = z.infer<typeof returnAdrressSchema>

export {
    ICreateRealEstate,
    IRealEstate,
    ICreateAddress
}