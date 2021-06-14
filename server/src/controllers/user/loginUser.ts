import { Response } from 'express'
import argon2 from 'argon2'
import { User } from '../../database/entities/User'
import { CustomRequest } from '../../types/ExpressExtensions'

// WORKING

export const loginUser = async (req: CustomRequest, res: Response) => {
  // make sure correct body data is present
  console.log(req.body)
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400)
    return res.send({
      user: null,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }
  const { username, password } = req.body

  // search for the user in database
  let user: User
  try {
    user = await User.findOneOrFail({
      where: { username },
    })
  } catch (e) {
    if (e.message.includes('Could not find any entity')) {
      res.status(400)
      return res.send({
        user: null,
        errors: [{ field: 'username', message: 'There is no user by that name.' }],
      })
    }
    res.status(500)
    return res.send({
      user: null,
      errors: [{ field: 'username', message: 'There was an internal error with logging in.' }],
    })
  }

  // make sure password is corrent
  const validatedPassword = await argon2.verify(user.password, password)

  // incorrect password used
  if (!validatedPassword) {
    res.status(400)
    return res.send({
      user: null,
      errors: [{ field: 'password', message: 'Your password is incorrect.' }],
    })
  }

  // log in user via session
  if (req.session) {
    req.session.userId = user.user_id
  }

  //console.log(req.session)

  res.send({
    user: { username: user.username, id: user.user_id },
    errors: [],
  })
}
