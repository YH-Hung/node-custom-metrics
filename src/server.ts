import fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'

const app: FastifyInstance = fastify({
    logger: {
        transport: {
            target: 'pino-pretty'
        },
        level: 'debug'
    }
})

export default function startFastify(config: AppConfig): FastifyInstance {
    const fastifyConfig: FastifyListenOptions = {
        port: config.port,
        host: config.host
    }

    app.get('/hc', async (request, reply) => reply.status(200).send({ msg: 'healthy' }))

    app.listen(fastifyConfig, (err, _) => {
        if (err) {
            console.error(err)
        }
    })

    return app
}
