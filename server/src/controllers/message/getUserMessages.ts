import { Message } from '../../database/entities/Message'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const getUserMessages = async (req: Request, res: Response) => {
  if (!req.body || !req.query.userId) {
    res.status(400)
    res.send({
      messages: null,
      errors: 'incorrect parameters given',
    })
  }

  const messages = await getRepository(Message)
    .createQueryBuilder('message')
    .select([
      'message.message_id',
      'message.body',
      'message.sender',
      'message.receiver',
      'message.createdAt',
      'sender.user_id',
      'sender.username',
      'sender.isAdmin',
      'receiver.user_id',
      'receiver.username',
    ])
    .where('(message.sender.user_id = :uId) OR (message.receiver.user_id = :uId)')
    .setParameter('uId', req.query.userId)
    .orderBy('message.message_id', 'DESC')
    .leftJoin('message.sender', 'sender')
    .leftJoin('message.receiver', 'receiver')
    .getMany()

  if (!messages) {
    res.status(500)
    return res.send({
      messages: [],
      errors: [
        {
          message: 'error when retrieving messages.',
        },
      ],
    })
  }

  res.send({
    messages: messages,
    errors: [],
  })
}
