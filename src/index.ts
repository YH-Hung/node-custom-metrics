import * as dotenv from 'dotenv'
import startFastify from './server'

dotenv.config()
const port = parseInt(process.env.FASTIFY_PORT || '8888')
const host = process.env.FASTIFY_HOST || '0.0.0.0'

const app = startFastify({ port, host })
