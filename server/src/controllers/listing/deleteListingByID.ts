import { Listing } from '../../database/entities/Listing'
import { Request, Response } from 'express'

export const deleteListingByID = async (req: Request, res: Response) => {
  // make sure required body data is present
  console.log(req.body)
  if (!req.body || !req.query.listingId) {
    res.status(400)
    return res.send({
      listing: null,
      errors: [{ field: 'all', message: 'incorrect parameters given' }],
    })
  }

  let listing
  try {
    listing = await Listing.delete(parseInt(req.query.listingId as string))
  } catch (error) {
    res.status(500)
    return res.send({
      listing: null,
      errors: [
        {
          field: 'all',
          message: 'error when deleting listing.',
        },
      ],
    })
  }

  res.send({
    message: 'listing successfully deleted',
    errors: [],
  })
}
