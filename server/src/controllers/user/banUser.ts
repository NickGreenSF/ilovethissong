import { Response } from 'express'
import { User } from '../../database/entities/User'
import { getConnection } from 'typeorm'
import { CustomRequest } from '../../types/ExpressExtensions'

// WORKS

export const banUser = async (req: CustomRequest, res: Response) => {
  // typeorm connection
  const connection = getConnection()

  // make sure correct body data is present
  if (!req.body || !req.body.userId) {
    res.status(400)
    return res.send({
      success: false,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }
  const { userId } = req.body

  // search for the user in database
  const user: User = await User.findOne(userId)

  // user was not found
  if (!user) {
    res.status(400)
    return res.send({
      success: false,
      errors: [{ field: 'id', message: 'user does not exist' }],
    })
  }

  // ban user
  try {
    user.banned = true
    connection.manager.save(user)
  } catch (error) {
    res.status(500)
    return res.send({
      success: false,
      errors: [{ field: 'all', message: 'error deleting user' }],
    })
  }

  res.send({
    success: true,
    errors: [],
  })
}
