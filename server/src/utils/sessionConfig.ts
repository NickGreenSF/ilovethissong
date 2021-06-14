import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import session from 'express-session'
import { COOKIE_NAME } from './constants'

const RedisStore = connectRedis(session)
export const redis = new Redis(process.env.REDIS_URL)

export const sessionConfig = {
  name: COOKIE_NAME, // what will show up in browser
  store: new RedisStore({
    client: redis, // telling express session we are using redis
    disableTouch: true, // Tells redis to keep session alive until we say otherwise
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    httpOnly: true, // cannot access cookie via frontend js
    secure: false, // only works with https
    sameSite: 'lax', // csrf
    domain: undefined,
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET as string,
  resave: false,
}
