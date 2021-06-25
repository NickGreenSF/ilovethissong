import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, OneToMany } from 'typeorm'
import { Listing } from './Listing'
import { Message } from './Message'

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

  @OneToMany(() => Message, (message) => message.sender, {})
  sentMessages!: Listing[]

  @OneToMany(() => Message, (message) => message.receiver, {})
  receivedMessages!: Listing[]
}
