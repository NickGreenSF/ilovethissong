import { Response } from 'express'
import argon2 from 'argon2'
import { User } from '../../database/entities/User'
import { getConnection } from 'typeorm'
import { CustomRequest } from '../../types/ExpressExtensions'

// WORKING

export const registerUser = async (req: CustomRequest, res: Response) => {
  // typeorm connection
  const connection = getConnection()

  // make sure correct body data is present
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400)
    return res.send({
      user: null,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }
  const { username, password } = req.body

  // hash user password
  const hashedPassword = await argon2.hash(password)

  // create user in database
  let newUser: User
  try {
    newUser = new User()
    // newUser.email = email
    // newUser.banned = false
    // newUser.admin = false
    newUser.username = username
    newUser.password = hashedPassword // storing hashed password
    await connection.manager.save(newUser)
  } catch (e) {
    // user already exists
    if (e.message.includes('Duplicate')) {
      res.status(400)
      return res.send({
        user: null,
        errors: [
          {
            field: 'username',
            message: 'that user already exists',
          },
        ],
      })
    }
    // fallback error message
    res.status(500)
    return res.send({
      user: null,
      errors: [
        {
          field: 'all',
          message: 'error when creating new user: error given = ' + e.message,
        },
      ],
    })
  }

  // log in user via session
  if (req.session) {
    req.session.userId = newUser.user_id
  }

  res.send({
    message: 'user successfully created',
    user: { username: newUser.username },
    errors: [],
  })
}
