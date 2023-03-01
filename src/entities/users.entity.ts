import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
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
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    @DeleteDateColumn()
    deletedAt: string

    @OneToMany(() => Schedule, sched => sched.user)
    schedules: Schedule[]

}

export {
    User
}