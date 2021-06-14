import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  listing_id!: number

  @Column()
  title!: string

  @Column()
  artist!: string

  @Column({
    length: 3000,
  })
  description: string

  @CreateDateColumn()
  createdAt = new Date()

  @ManyToOne(() => User, (user) => user.listings, {})
  user!: User
}
