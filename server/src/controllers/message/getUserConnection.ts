import { Message } from '../../database/entities/Message'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

// A 'connection' is the message history between two users.

export const getUserConnection = async (req: Request, res: Response) => {
  if (!req.body || !req.query.userId1 || !req.query.userId2) {
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
      'receiver.user_id',
    ])
    .where(
      '((message.sender.user_id = :uId1) AND (message.receiver.user_id = :uId2) OR (message.sender.user_id = :uId2) AND (message.receiver.user_id = :uId1))'
    )
    .setParameter('uId1', req.query.userId1)
    .setParameter('uId2', req.query.userId2)
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
