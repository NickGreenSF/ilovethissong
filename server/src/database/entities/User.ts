import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, OneToMany } from 'typeorm'
import { Listing } from './Listing'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number

  @Column()
  username!: string

  @Column()
  password!: string

  @Column({
    default: false,
  })
  isAdmin: boolean

  @Column({
    default: false,
  })
  banned: boolean

  @OneToMany(() => Listing, (listing) => listing.user, {})
  listings!: Listing[]
}
