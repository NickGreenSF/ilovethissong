import { Request, Response } from 'express'
import { Message } from '../../database/entities/Message'
import { User } from '../../database/entities/User'
import { getConnection } from 'typeorm'

export const postMessage = async (req: Request, res: Response) => {
  const connection = getConnection()

  if (!req.body || !req.body.senderId || !req.body.receiverId || !req.body.messageBody) {
    res.status(400)
    return res.send({
      Message: null,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }

  let newMessage: Message
  let sender: User
  let receiver: User

  const senderId = req.body.senderId
  const receiverId = req.body.receiverId

  try {
    sender = await User.findOne(senderId)
  } catch (e) {
    res.status(500)
    return res.send({
      message: null,
      errors: [
        {
          field: 'user',
          message: 'error finding user making this',
        },
      ],
    })
  }

  try {
    receiver = await User.findOne(receiverId)
  } catch (e) {
    res.status(500)
    return res.send({
      message: null,
      errors: [
        {
          field: 'user',
          message: 'error finding user getting this',
        },
      ],
    })
  }

  try {
    newMessage = new Message()
    newMessage.body = req.body.messageBody
    newMessage.sender = sender
    newMessage.receiver = receiver
    await connection.manager.save(newMessage)
  } catch (e) {
    res.status(500)
    return res.send({
      errors: [
        {
          field: 'all',
          message: 'error when creating new Message: error given = ' + e.message,
        },
      ],
    })
  }

  res.send({
    message: 'Message successfully created',
    Message: { id: newMessage.message_id },
    errors: [],
  })
}
