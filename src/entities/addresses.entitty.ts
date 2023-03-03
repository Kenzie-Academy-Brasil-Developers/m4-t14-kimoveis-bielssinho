import { 
    AfterLoad,
    Column,
    Entity, 
    PrimaryGeneratedColumn 
} from 'typeorm'


@Entity('addresses')
class Address {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 45 })
    street: string

    @Column('varchar', { length: 8 })
    zipCode: string

    @Column('varchar', { length: 6, nullable: true })
    number: string | null

    @Column('varchar', { length: 20 })
    city: string

    @Column('varchar', { length: 2 })
    state: string 

}

export {
    Address
}