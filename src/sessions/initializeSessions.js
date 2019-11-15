import session from 'express-session'
import redis from 'redis'
import redisStore from 'connect-redis'

const maxAge = 2629746000

export default function initializeSessions (app) {
  let store = {}
  if (process.env.NODE_ENV === 'production') {
    const RedisStore = redisStore(session)
    const client = redis.createClient()
    app.use(session({
      store: new RedisStore({
        client,
        host: process.env.SESSION_HOST,
        port: process.env.SESSION_PORT,
        password: process.env.SESSION_PASSWORD,
        user: process.env.SESSION_USER
      }),
      secret: process.env.COOKIE_SECRET,
      key: 'user_sid',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge }
    }))
  } else {
    store = null
    app.use(session({
      store,
      secret: process.env.COOKIE_SECRET,
      key: 'user_sid',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge }
    }))
  }
}
