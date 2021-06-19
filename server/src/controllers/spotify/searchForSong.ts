import { Request, Response } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'

export const searchForSong = async (req: Request, res: Response) => {
  if (!req.body || !req.query.searchTerm) {
    res.status(400)
    return res.send({
      song: null,
      errors: [{ message: 'incorrect parameters given' }],
    })
  }
  const spot = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
  })
  spot.clientCredentialsGrant().then(
    function (data) {
      spot.setAccessToken(data.body.access_token)
      spot.searchTracks(req.query.searchTerm).then(
        function (data) {
          res.send({ message: 'search successfully made', song: data.body.tracks })
        },
        function (error) {
          res.status(500)
          res.send({ message: 'problem with search', error: error, song: null })
        }
      )
    },
    function (err) {
      res.status(500)
      res.send({ message: null, errors: [err] })
    }
  )
}
