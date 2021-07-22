import { Response } from 'express'
import { User } from '../../database/entities/User'
import { CustomRequest } from '../../types/ExpressExtensions'

// WORKING

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  // console.log('get current user')
  //console.log(req.session)
  if (req.session) {
    //console.log(req.session)
    // check if user is logged in via session
    if (!req.session.userId) {
      return res.send({
        user: null,
        errors: ['no current user'],
      })
    }
  } else {
    res.status(500)
    return res.send({ user: null, errors: ['no session'] })
  }

  // get user from database
  let user: User
  try {
    user = await User.findOne(req.session.userId, {
      relations: ['receivedMessages'],
    })
  } catch (e) {
    res.status(500)
    return res.send({
      user: null,
      errors: [{ field: 'all', message: 'error getting user.' }],
    })
  }
  // user is logged in so return that users data
  // calculating the number of unread messages and returning that to the frontend
  let notif = 0
  if (user.receivedMessages && user.lastRead) {
    const rec = user.receivedMessages
    const lr = user.lastRead

    for (let i = 0; i < rec.length; i++) {
      if (rec[i].createdAt > lr) {
        notif += 1
      }
    }
  }

  // The compiler hates this, but it does what it's supposed to do, gotta move it elsewhere.
  // await User.save({
  //   user_id: user.user_id,
  //   lastRead: new Date(),
  // })

  res.send({
    user: {
      username: user.username,
      banned: user.banned,
      admin: user.isAdmin,
      id: user.user_id,
      notif: notif,
    },
    errors: [],
  })
}
