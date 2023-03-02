import { getRounds, hashSync } from 'bcryptjs'
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad
} from 'typeorm'
import { Schedule } from './schedule.entity'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 45 })
    name: string

    @Column('varchar', { length: 45, unique: true })
    email: string

    @Column('boolean')
    admin: boolean

    @Column('varchar', { length: 120 })
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => Schedule, sched => sched.user)
    schedules: Schedule[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isEncrypt = getRounds(this.password)
        if(!isEncrypt){
            this.password = hashSync(this.password, 10)
        }
    }
    

}

export {
    User
}