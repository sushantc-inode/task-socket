import Fastify from 'fastify';
import {LiveServer} from "./realtime-server";

const fastify = Fastify({logger: true});

fastify.register(LiveServer)

fastify.listen({port: 3000, host: '0.0.0.0'}, async (err, address) => {
    if (err) {
        console.log(err);
        console.error(err);
        process.exit(1);
    }
    console.log(`Listening on ${address}`);
})
