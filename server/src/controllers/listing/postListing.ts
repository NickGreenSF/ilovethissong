import { Request, Response } from 'express'
import { Listing } from '../../database/entities/Listing'
import { User } from '../../database/entities/User'
import { getConnection } from 'typeorm'

export const postListing = async (req: Request, res: Response) => {
  const connection = getConnection()

  if (
    !req.body ||
    !req.body.title ||
    !req.body.artist ||
    !req.body.userId ||
    !req.body.description
  ) {
    res.status(400)
    return res.send({
      listing: null,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }

  let newListing: Listing
  let user: User

  const userId = req.body.userId

  try {
    user = await User.findOne(userId)
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
    newListing = new Listing()
    newListing.title = req.body.title
    newListing.artist = req.body.artist
    newListing.description = req.body.description
    newListing.user = user
    await connection.manager.save(newListing)
  } catch (e) {
    res.status(500)
    return res.send({
      errors: [
        {
          field: 'all',
          message: 'error when creating new listing: error given = ' + e.message,
        },
      ],
    })
  }

  res.send({
    message: 'listing successfully created',
    listing: { id: newListing.listing_id },
    errors: [],
  })
}
