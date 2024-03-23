import fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'
import {pmRegister} from "./metrics/default-metrics";

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

    // TODO: registerMetric
    app.get('/metrics', async (req, rpl) => {
        rpl.status(200).type(pmRegister.contentType).send(await pmRegister.metrics())
    })

    app.listen(fastifyConfig, (err, _) => {
        if (err) {
            console.error(err)
        }
    })

    return app
}
