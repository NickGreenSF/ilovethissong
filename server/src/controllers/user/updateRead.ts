import { Request, Response } from 'express'
import { User } from '../../database/entities/User'

export const updateRead = async (req: Request, res: Response) => {
  if (!req.body || !req.query.userId) {
    res.status(400)
    res.send({
      listings: null,
      errors: 'incorrect parameters given',
    })
  }

  // There's an argument disagreement here, but it all works.

  try {
    await User.update(
      { user_id: req.query.userId },
      {
        lastRead: new Date(),
      }
    )
  } catch (e) {
    res.status(500)
    console.log(e.message)
    return res.send({
      user: null,
      errors: [
        {
          field: 'all',
          message: 'error when updating read: error given = ' + e.message,
        },
      ],
    })
  }

  res.send({
    message: 'read updated successfully',
    errors: [],
  })
}
