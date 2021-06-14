import { Response } from 'express'
import { CustomRequest } from '../../types/ExpressExtensions'
import { COOKIE_NAME } from '../../utils/constants'

// WORKING

export const logoutUser = async (req: CustomRequest, res: Response) => {
  if (req.session) {
    const response = await req.session.destroy()
    if (!response) {
      console.error('There was an error logging out')
      return res.send(false)
    }
    // clear the frontend cookie
    res.clearCookie(COOKIE_NAME)
    return res.send(true)
  }
}
