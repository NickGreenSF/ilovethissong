import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  message_id!: number

  @Column({
    length: 3000,
  })
  body: string

  @CreateDateColumn()
  createdAt = new Date()

  @ManyToOne(() => User, (user) => user.sentMessages, {})
  sender!: User

  @ManyToOne(() => User, (user) => user.receivedMessages, {})
  receiver!: User
}
