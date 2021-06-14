// load either dev or prod env file
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// 3rd party imports
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import session, { SessionOptions } from 'express-session'
// Not doing file upload yet and maybe not at all. I think multer doesn't do anything with that in mind.
// import fileUpload from 'express-fileupload'
//import multer from 'multer'

// my imports
import listingRouter from './routes/listing'
import userRouter from './routes/user'
import { createNewConnection } from './database/connectTypeorm'
import { sessionConfig } from './utils/sessionConfig'

const main = async () => {
  const app = express()
  const PORT = process.env.PORT || 8080

  // initial config
  app.use(express.static(path.join(__dirname, '../../client/build')))

  // CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  )

  //app.use(fileUpload())

  // ~ required middlewares
  // parse application/json
  app.use(bodyParser.json({ limit: 1000000 }))
  app.use(bodyParser.urlencoded({ extended: true }))

  app.set('trust proxy', 1)

  // parse formData
  //const upload = multer()
  //app.use(upload.array('images', 5))

  // ~ create connection to DB
  createNewConnection()

  // Session
  app.use(session(sessionConfig as SessionOptions))

  // ~ ROUTES
  app.use('/api/listing', listingRouter)
  app.use('/api/user', userRouter)

  // all other routes, serve frontend from client folder in prod
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res) => {
      res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'build', 'index.html'))
    })
  }

  // ~ LAUNCH
  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT} 🚀`)
  })
}

main().catch((err) => {
  console.error(err)
})
